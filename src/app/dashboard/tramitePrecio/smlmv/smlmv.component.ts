import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import { Parametro } from './parametro.modelo';
import { ParametroService } from '../../../services/parametro.service';
import { LoginService } from '../../../services/login.service';
import swal from 'sweetalert2';
import { forEach } from '@angular/router/src/utils/collection';
declare var $: any;

@Component({
  selector: 'app-new-smlmv',
  templateUrl: './smlmv.component.html'
})
export class NewSmlmvComponent implements OnInit {
@Output() ready = new EventEmitter<any>();
@Input() tramitePrecios:any = null;
public parametro: Parametro;
public errorMessage;
public respuesta;
public table:any; 
public valorConcepto:number = 0; 
public calcularForm = false; 
public conceptoForm = false; 
public tablaConceptos = false; 
public array: string[];
public tramitesPrecios:any[]= [];
public conceptos:any[]= [];
public concepto ={
    "nombre":null,
    "valor":null, 
  };

constructor(
  private _ParametroService: ParametroService,
  private _loginService: LoginService,
  ){}

  ngOnInit() {
    this.parametro = new Parametro(null,null,null,null,null);
    
  }
  iniciarTabla(){
    $('#dataTables-example').DataTable({
      responsive: true,
      pageLength: 8,
      sPaginationType: 'full_numbers',
      oLanguage: {
           oPaginate: {
           sFirst: '<<',
           sPrevious: '<',
           sNext: '>',
           sLast: '>>'
        }
      }
   });
   this.table = $('#dataTables-example').DataTable();
  }
  onCancelar(){
    this.ready.emit(true);
  }
  onEnviar(){
    this.parametro.tipo='SMLMV';
    let token = this._loginService.getToken();
      let datos = {
          'parametro': this.parametro,
          'listaPrecios': this.tramitesPrecios,
          'conceptos': this.conceptos
      };
		this._ParametroService.register(datos,token).subscribe(
			response => {
        this.respuesta = response;
        console.log(this.respuesta);
        if(this.respuesta.status == 'success'){
          this.ready.emit(true);
          swal({
            title: 'Perfecto!',
            text: 'El registro se ha registrado con exito',
            type: 'success',
            confirmButtonText: 'Aceptar'
          })
        }else{
          swal({
            title: 'Error!',
            text: 'El parametro '+  +' ya se encuentra registrado',
            type: 'error',
            confirmButtonText: 'Aceptar'
          })
        }
			error => {
					this.errorMessage = <any>error;
					if(this.errorMessage != null){
						console.log(this.errorMessage);
						alert("Error en la petición");
					}
				}

		}); 
  }

  calcular(){
    this.tramitesPrecios = [];
    this.valorConcepto=0;
    
    this.conceptos.forEach(concepto => {
      this.valorConcepto = this.valorConcepto + parseInt(concepto.valor);
    });
    if (this.table) {
      this.table.destroy();
    }
    
    this.tramitePrecios.forEach(tramitePrecio => {
      let valor = ((parseInt(this.parametro.valor) / 30) * tramitePrecio.smldv * parseFloat(this.parametro.porcentaje) + this.valorConcepto ).toFixed(2);
     
      if (tramitePrecio.anio == this.parametro.anio) {
        if (tramitePrecio.clase) {
          this.array = [
            tramitePrecio.anio,
            tramitePrecio.clase.nombre,
            tramitePrecio.tramite.nombre,
            tramitePrecio.smldv,
            valor,
            tramitePrecio.modulo.nombre,
            tramitePrecio.id,
          ]
        }else{
          this.array = [
            tramitePrecio.anio,
            null,
            tramitePrecio.tramite.nombre,
            tramitePrecio.smldv,
            valor,
            tramitePrecio.modulo.nombre,
            tramitePrecio.id,
          ]
        }
        this.tramitesPrecios.push(this.array);
      }
    });
    this.calcularForm = true
    let timeoutId = setTimeout(() => {  
      this.iniciarTabla();
    }, 100);
  }
  newConcepto(){
    this.conceptoForm = true;
  }
  cancelarConcepto(){
    this.conceptoForm = false;
  }

  guardarConcepto(){
    this.conceptoForm = false;
    this.conceptos.push(
      {
      'nombre':this.concepto.nombre,
      'valor':this.concepto.valor,
      }
    );
    this.concepto.nombre = null;
    this.concepto.valor = null;
    this.tablaConceptos = true;
    console.log(this.conceptos);
  }
  
  deleteConcepto(concepto){
    this.conceptos =  this.conceptos.filter(h => h !== concepto);

    if (this.conceptos.length === 0) {
        this.tablaConceptos = false;
    }
  }

}
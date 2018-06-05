import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import { ParametroService } from '../../../services/parametro.service';
import { LoginService } from '../../../services/login.service';
import {ConceptoParametroService} from '../../../services/conceptoParametro.service';
import {ConceptoParametroTramiteService} from '../../../services/conceptoParameTrotramite.service';
import swal from 'sweetalert2';
import { forEach } from '@angular/router/src/utils/collection';
import {TramitePrecioService} from '../../../services/tramitePrecio.service';
declare var $: any;

@Component({
  selector: 'app-new-calculo',
  templateUrl: './calculo.component.html'
})
export class CalculoComponent implements OnInit {
@Output() ready = new EventEmitter<any>();
@Input() tramitePrecios:any = null;
public errorMessage;
public respuesta;
public table:any; 
public conceptoSelected:any; 
public valorConcepto:number = 0; 
public calcularForm = false; 
public conceptoForm = false; 
public tablaConceptos = false; 
public listado = false; 
public array: string[];
public tramitesPrecios:any[]= [];
public conceptoParametroTramites:any[]= [];
public conceptos:any;

  itemStringsRight: any[] = [];  

constructor(
  private _ParametroService: ParametroService,
  private _loginService: LoginService,
  private _TramitePrecioService: TramitePrecioService,
  private _ConceptoParametroService: ConceptoParametroService,
  private _ConceptoParametroTramiteService: ConceptoParametroTramiteService,
  ){}

  

  ngOnInit() {

    this._ConceptoParametroTramiteService.getConceptoParametroTramite().subscribe(
      response => {
        this.conceptoParametroTramites = response.data;
        let timeoutId = setTimeout(() => {  
          this.iniciarTabla();
        }, 100);
      }, 
      error => {
        this.errorMessage = <any>error;

        if(this.errorMessage != null){
          console.log(this.errorMessage);
          alert("Error en la petición");
        }
      }
    );


    this._ConceptoParametroService.getConceptoParametroSelect().subscribe(
      response => {
        this.conceptos = response;
      }, 
      error => {
        this.errorMessage = <any>error;

        if(this.errorMessage != null){
          console.log(this.errorMessage);
          alert("Error en la petición");
        }
      }
    );

    this._TramitePrecioService.getTramitePrecio().subscribe(
      response => {
        this.tramitePrecios = response.data;
        this.tramitePrecios.forEach(tramitePrecio => {
        let array = {
          'anio':tramitePrecio.anio,
          'nombre':tramitePrecio.nombre,
          'valor':tramitePrecio.valor,
          'valorNuevo':tramitePrecio.valor,
        }  
        this.tramitesPrecios.push(array);
        });
        this.listado = true;
      }, 
      error => {
        this.errorMessage = <any>error;

        if(this.errorMessage != null){
          console.log(this.errorMessage);
          alert("Error en la petición");
        }
      }
    );
    
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
    let token = this._loginService.getToken();

    console.log(this.tramitesPrecios);
    //   let datos = {
    //       'trmites': this.itemStringsRight,
    //       'concepto': this.conceptoSelected
    //   };
		// this._ConceptoParametroTramiteService.register(datos,token).subscribe(
		// 	response => {
    //     this.respuesta = response;
    //     if(this.respuesta.status == 'success'){
    //       this.table.destroy();
    //       this.ngOnInit();
    //       swal({
    //         title: 'Perfecto!',
    //         text: 'El registro se ha registrado con exito',
    //         type: 'success',
    //         confirmButtonText: 'Aceptar'
    //       })
    //     }else{
    //       swal({
    //         title: 'Error!',
    //         text: 'El parametro '+  +' ya se encuentra registrado',
    //         type: 'error',
    //         confirmButtonText: 'Aceptar'
    //       })
    //     }
		// 	error => {
		// 			this.errorMessage = <any>error;
		// 			if(this.errorMessage != null){
		// 				console.log(this.errorMessage);
		// 				alert("Error en la petición");
		// 			}
		// 		}

		// }); 
  }
  newConcepto(){
    this.conceptoForm = true;
  }
  cancelarConcepto(){
    this.conceptoForm = false;
  }

  delete(id:any){

    swal({
      title: '¿Estás seguro?',
      text: "¡Se eliminara este registro!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#15d4be',
      cancelButtonColor: '#ff6262',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        let token = this._loginService.getToken();
        this._ConceptoParametroTramiteService.deleteConceptoParametro(token,id).subscribe(
            response => {
                swal({
                      title: 'Eliminado!',
                      text:'Registro eliminado correctamente.',
                      type:'success',
                      confirmButtonColor: '#15d4be',
                    })
                  this.table.destroy();
                  this.respuesta= response;
                  this.ngOnInit();
              }, 
            error => {
              this.errorMessage = <any>error;

              if(this.errorMessage != null){
                console.log(this.errorMessage);
                alert("Error en la petición");
              }
            }
          );
        
      }
    })
  }

}
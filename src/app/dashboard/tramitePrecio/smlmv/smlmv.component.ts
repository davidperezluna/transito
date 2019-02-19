import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import { Parametro } from './parametro.modelo';
import { ParametroService } from '../../../services/parametro.service';
import { LoginService } from '../../../services/login.service';
import {ConceptoParametroService} from '../../../services/conceptoParametro.service';
import {ConceptoParametroTramiteService} from '../../../services/conceptoParameTrotramite.service';
import swal from 'sweetalert2';
import { forEach } from '@angular/router/src/utils/collection';
import {TramitePrecioService} from '../../../services/tramitePrecio.service';
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
public conceptoSelected:any; 
public tramitesSelected:any; 
public tramitesPrecio:any; 
public valorConcepto:number = 0; 
public calcularForm = false; 
public conceptoForm = false; 
public tablaConceptos = false; 
public listado = false; 
public array: string[];
public tramitesPrecios:any[]= [];
public conceptoParametroTramites:any[]= [];
public conceptos:any;


constructor(
  private _loginService: LoginService,
  private _TramitePrecioService: TramitePrecioService,
  private _ConceptoParametroService: ConceptoParametroService,
  private _ConceptoParametroTramiteService: ConceptoParametroTramiteService,
  ){}

  

  ngOnInit() {
    this.parametro = new Parametro(null,null,null,null,null);

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
      
      this._TramitePrecioService.getTramitePrecioSelect().subscribe(
        response => {
        this.tramitesPrecio = response;
        console.log(this.tramitesPrecio);
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
          sFirst: '<i class="fa fa-step-backward"></i>',
          sPrevious: '<i class="fa fa-chevron-left"></i>',
          sNext: '<i class="fa fa-chevron-right"></i>',
          sLast: '<i class="fa fa-step-forward"></i>'
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
      let datos = { 
          'trmites': this.tramitesSelected,  
          'concepto': this.conceptoSelected
      }; 
		this._ConceptoParametroTramiteService.register(datos,token).subscribe(
			response => {
        this.respuesta = response;
        if(this.respuesta.status == 'success'){
          this.table.destroy();
          this.ngOnInit();
          swal({  
            title: 'Perfecto!', 
            text: 'Registro exitoso!',
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
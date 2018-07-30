import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {RegistroMaquinariaService} from '../../services/registroMaquinaria.service';
import {LoginService} from '../../services/login.service';
// import {Vehiculo} from './vehiculo.modelo';
import { Reporte } from './reporte.modelo';
import { TramiteComponent } from './tramite/tramite.component';
declare var $: any;
import swal from 'sweetalert2';

@Component({
  selector: 'app-index',
  templateUrl: './reporte.component.html'
})
export class ReporteComponent implements OnInit {
  public errorMessage;
	public id;
	public respuesta;
  public vehiculos;
  public registrosMaquinaria;
  public formIndex = true;
  public tramite = false;
  public infraccion= false;
  public retefuente= false;
  public table:any; 
  public Reporte: Reporte;

  public tipoReportes =[
    {'value':"tramite",'label':"Tramite"},{'value':"multa",'label':"Infraccion"},{'value':"retefuente",'label':"Retefuente"}
  ]

  constructor(
		private _RegistroMaquinariaService: RegistroMaquinariaService,
		private _loginService: LoginService,
	
		
		){}
  ngOnInit() {
    swal({
      title: 'Cargando Tabla!',
      text: 'Solo tardara unos segundos por favor espere.',
      timer: 1500,
      onOpen: () => {
        swal.showLoading()
      }
    }).then((result) => {
      if (
        // Read more about handling dismissals
        result.dismiss === swal.DismissReason.timer
      ) {
      }
    })
    // this.tramite=false;
    // this.formNew=false;    
    // this.formNew=false;    
		this._RegistroMaquinariaService.index().subscribe(
				response => {
          this.registrosMaquinaria = response.data;
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
  }
  iniciarTabla(){
  //   $('#dataTables-example').DataTable({
  //     responsive: true,
  //     pageLength: 8,
  //     sPaginationType: 'full_numbers',
  //     oLanguage: {
  //          oPaginate: {
  //          sFirst: '<<',
  //          sPrevious: '<',
  //          sNext: '>',
  //          sLast: '>>'
  //       }
  //     }
  //  });
  //  this.table = $('#dataTables-example').DataTable();
  }
  onNew(){
    this.formIndex = false;
    // this.formNew = true;
    this.table.destroy();
  }
  ready(isCreado:any){
      if(isCreado) {
        // this.formNew = false;
        this.formIndex = true;
        this.ngOnInit();
      }
  }

  editVehiculo(registroMaquinaria:any){
   
  }

  deleteRegistroMaquinaria(id:any){

  //   swal({
  //     title: '¿Estás seguro?',
  //     text: "¡Se eliminara este registro!",
  //     type: 'warning',
  //     showCancelButton: true,
  //     confirmButtonColor: '#15d4be',
  //     cancelButtonColor: '#ff6262',
  //     confirmButtonText: 'Confirmar',
  //     cancelButtonText: 'Cancelar'
  //   }).then((result) => {
  //     if (result.value) {
  //       let token = this._loginService.getToken();
  //       this._RegistroMaquinariaService.deleteRegistroMaquinaria(token,id).subscribe(
  //           response => {
  //               swal({
  //                     title: 'Eliminado!',
  //                     text:'Registro eliminado correctamente.',
  //                     type:'success',
  //                     confirmButtonColor: '#15d4be',
  //                   })
  //                 this.table.destroy();
  //                 this.respuesta= response;
  //                 this.ngOnInit();
  //             }, 
  //           error => {
  //             this.errorMessage = <any>error;

  //             if(this.errorMessage != null){
  //               console.log(this.errorMessage);
  //               alert("Error en la petición");
  //             }
  //           }
  //         );
  //     }
  //   })
  }

}
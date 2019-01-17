import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MsvCaracterizacionService } from '../../services/msvCaracterizacion.service';
import {LoginService} from '../../services/login.service';
import { MsvCaracterizacion } from "./msvCaracterizacion.modelo";
import swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-index',
  templateUrl: './msvCaracterizacion.component.html'
})
export class MsvCaracterizacionComponent implements OnInit {
  public errorMessage;
	public id;
	public msvCaracterizaciones: any;
	public formNew = false;
	public formEdit = false;
  public formIndex = true;
  public table:any; 
  public msvCaracterizacion: MsvCaracterizacion;

  constructor(
    private _CaracterizacionService: MsvCaracterizacionService,
		private _LoginService: LoginService,
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
    this._CaracterizacionService.getCaracterizacion().subscribe(
				response => {
          this.msvCaracterizaciones = response.data;
          console.log(response);
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
  
  onNew() {
    this.formNew = true;
    this.formIndex = false;
    if (this.table) {
      this.table.destroy();
    }
  }

  ready(isCreado:any){
    if(isCreado) {
      this.formNew = false;
      this.formEdit = false;
      this.formIndex = true;
      this.ngOnInit();
    }
  }
  deletemsvCaracterizaciones(id:any){
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
        let token = this._LoginService.getToken();
        this._CaracterizacionService.deleteCaracterizacion(token,id).subscribe(
            response => {
                swal({
                      title: 'Eliminado!',
                      text:'Registro eliminado correctamente.',
                      type:'success',
                      confirmButtonColor: '#15d4be',
                    })
                  this.table.destroy();
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

  editmsvCaracterizacion(msvCaracterizacion:any){
    this.msvCaracterizacion = msvCaracterizacion;
    this.formEdit = true;
    this.formIndex = false;
  }
}
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SvCaracterizacion } from './svCaracterizacion.modelo';

import { SvCaracterizacionService } from '../../../../services/svCaracterizacion.service';

import {LoginService} from '../../../../services/login.service';

import swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-index',
  templateUrl: './svCaracterizacion.component.html'
})
export class SvCaracterizacionComponent implements OnInit {
  public errorMessage;
	public id;
  
  public table:any; 
  
  public caracterizaciones: any;
  public caracterizacion: SvCaracterizacion;
  
	public formNew = false;
	public formEdit = false;
  public formIndex = true;

  constructor(
    private _CaracterizacionService: SvCaracterizacionService,
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
          this.caracterizaciones = response.data;
          let timeoutId = setTimeout(() => {  
            this.onInitTable();
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

  onInitTable(){
    this.table = $('#dataTables-example').DataTable({
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

  onDelete(id:any){
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
                      title: response.title,
                      text: response.message,
                      type: response.status,
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

  onEdit(caracterizacion:any){
    this.caracterizacion = caracterizacion;
    this.formEdit = true;
    this.formIndex = false;
  }
}
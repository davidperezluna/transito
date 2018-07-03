import { Component, OnInit, Input } from '@angular/core';
import { MparqGruaService } from '../../services/mparqGrua.service';
import {LoginService} from '../../services/login.service';
import { MparqGrua } from './mparqGrua.modelo';
import swal from 'sweetalert2';
import { Router } from "@angular/router";
declare var $: any;

@Component({
  selector: 'app-index',
  templateUrl: './mparqGrua.component.html'
})
export class MparqGruaComponent implements OnInit {
  public errorMessage;
	public id;
	public respuesta;
	public gruas;
	public formNew = false;
	public formEdit = false;
	public formShow = false;
  public formIndex = true;
  public table:any; 
  public grua: MparqGrua;

  constructor(
    private _GruaService: MparqGruaService,
    private _loginService: LoginService,
    private router: Router,
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
    this._GruaService.index().subscribe(
				response => {
          this.gruas = response.data;
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

  onNew(){
    this.formIndex = false;
    this.formShow = false;
    this.formEdit = false;
    this.formNew = true;
    this.table.destroy();
  }

  onCiudadanos(grua:any){
    this.grua = grua;
    this.formIndex = false;
    this.formEdit = false;
    this.formNew = false;
    this.formShow = true;
    this.table.destroy();
  } 

  ready(isCreado:any){
    if(isCreado) {
      this.formNew = false;
      this.formEdit = false;
      this.formShow = false;
      this.formIndex = true;
      this.ngOnInit();
    }
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
        this._GruaService.delete(token,id).subscribe(
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

  edit(grua:any){
    this.grua = grua;
    this.formEdit = true;
    this.formIndex = false;
  }
}
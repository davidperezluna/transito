import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserCfgMenuService } from '../../../../services/userCfgMenu.service';
import { LoginService } from '../../../../services/login.service';
import { UserCfgMenu } from './userCfgMenu.modelo';
import swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-index',
  templateUrl: './UserCfgMenu.component.html'
})
export class UserCfgMenuComponent implements OnInit {
  public errorMessage;
	public id;

  public menus: any = null;
  
	public formNew = false;
	public formEdit = false;
  public formIndex = true;

  public table:any; 
  public menu: UserCfgMenu;

  constructor(
    private _UserCfgMenuService: UserCfgMenuService,
		private _LsoginService: LoginService,
    ){}
    
  ngOnInit() {    
    swal({
      title: 'Cargando Tabla!',
      text: 'Solo tardara unos segundos por favor espere.',
      onOpen: () => {
        swal.showLoading()
      }
    });

    this._UserCfgMenuService.index().subscribe(
      response => {         
        this.menus = response.data;

        let timeoutId = setTimeout(() => {  
          this.onInitTable();
        }, 100);
        swal.close();
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
    if (this.table) {
      this.table.destroy();
    }
    
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
  
  onNew(){
    this.formNew = true;
    this.formIndex = false;
    this.table.destroy();
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
        let token = this._LsoginService.getToken();
        this._UserCfgMenuService.delete({ 'id': id }, token).subscribe(
          response => {
            if (response.code == 200) {
              swal({
                title: response.title,
                text: response.message,
                type: response.status,
                confirmButtonText: 'Aceptar'
              });

              this.ngOnInit();
            }else{
              swal({
                title: response.title,
                text: response.message,
                type: response.status,
                confirmButtonText: 'Aceptar'
              });
            }
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

  onEdit(menu:any){
    this.menu = menu;
    this.formEdit = true;
    this.formIndex = false;
  }
}
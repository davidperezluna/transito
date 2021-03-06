import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserUsuarioMenuService } from '../../../../services/userUsuarioMenu.service';
import { LoginService } from '../../../../services/login.service';
import swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-index',
  templateUrl: './UserUsuarioMenu.component.html'
})
export class UserUsuarioMenuComponent implements OnInit {
  public errorMessage;
	public id;
  public activo;
  public calassActivo;
  public txtActivo;

  public usuarioMenus: any = null;
  public numeroIdentificacion: any = null;
  public usuario: any = null;
  
	public formNew = false;
	public formEdit = false;
  public formIndex = false;
  public formDelete = false;
	public formSearch = true;

  public table:any = null;
  public usuarioMenu: any;

  constructor(
    private _UserUsuarioMenuService: UserUsuarioMenuService,
		private _loginService: LoginService,
    ){}
    
  ngOnInit() {
    swal.close();
  }

  onSearch() {
    swal({
      title: 'Cargando Tabla!',
      text: 'Solo tardara unos segundos por favor espere.',
      onOpen: () => {
        swal.showLoading()
      }
    });

    let token = this._loginService.getToken();

    this._UserUsuarioMenuService.searchMenus({ 'identificacion': this.numeroIdentificacion }, token).subscribe(
      response => {
        if (response.code == 200) {
          this.activo = response.data.activo;
          if (this.activo) {
            this.calassActivo = 'btn-warning';
            this.txtActivo = 'Inhabilitar';
          } else {
            this.calassActivo = 'btn-success';
            this.txtActivo = 'Habilitar';
          }

          this.usuarioMenus = response.data.usuarioMenus;
          this.formIndex = true;
          
          swal({
            title: response.title,
            text: response.message,
            type: response.status,
            confirmButtonText: 'Aceptar'
          });

          let timeoutId = setTimeout(() => {
            this.onInitTable();
          }, 100);
        }else{
          this.usuarioMenus = null;
          this.formIndex = false;
          
          swal({
            title: response.title,
            text: response.message,
            type: response.status,
            confirmButtonText: 'Aceptar'
          });
        }
        this.usuario = response.data.usuario;
      },
      error => {
        this.errorMessage = <any>error;

        if (this.errorMessage != null) {
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
    this.formDelete = false;
  }

  onDelete(){
    this.formNew = false;
    this.formIndex = false;
    this.formDelete = true;
  }

  

  onDeleteUsuarioInhabilitar(){
    swal({
      title: '¿Estás seguro?',
      text: "¡Se inhabilitara el usuario!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#15d4be',
      cancelButtonColor: '#ff6262',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        swal({
          title: 'Cargando Tabla!',
          text: 'Solo tardara unos segundos por favor espere.',
          onOpen: () => {
            swal.showLoading()
          }
        });
        let token = this._loginService.getToken();
        this._UserUsuarioMenuService.deleteUsuarioInhabilitar({ 'identificacion': this.numeroIdentificacion }, token).subscribe(
          response => {
            swal.close();
            if (response.code == 200) {
              this.onSearch();
              swal({
                title: 'Perfecto!',
                text: response.message,
                type: 'success',
                confirmButtonText: 'Aceptar'
              });
            }else{
              swal({
                title: 'Atención!',
                text: response.message,
                type: 'warning',
                confirmButtonText: 'Aceptar'
              });
            }
          },
          error => {
            this.errorMessage = <any>error;
    
            if (this.errorMessage != null) {
              console.log(this.errorMessage);
              alert("Error en la petición");
            }
          }
        );
      }
    })
  }


  ready(isCreado:any){
    if(isCreado) {
      this.formNew = false;
      this.formEdit = false;
      this.formIndex = true;
      this.ngOnInit();
    }
  }

  onEdit(usuarioMenu:any){
    this.usuarioMenu = usuarioMenu;
    this.formEdit = true;
    this.formIndex = false;
  }
}
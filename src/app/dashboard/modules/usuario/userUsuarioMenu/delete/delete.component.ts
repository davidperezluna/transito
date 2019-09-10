import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserUsuarioMenu } from '../userUsuarioMenu.modelo';
import { UserCfgMenuService } from '../../../../../services/userCfgMenu.service';
import { UserUsuarioMenuService } from '../../../../../services/userUsuarioMenu.service';
import { LoginService } from '../../../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-delete-userusuariomenu',
  templateUrl: './delete.component.html'
})
export class DeleteComponent implements OnInit {
  @Output() ready = new EventEmitter<any>();
  @Input() usuario: any = null;

  public usuarioMenu: UserUsuarioMenu;
  public errorMessage;

  public menus: any = null;

constructor(
  private _MenuService: UserCfgMenuService,
  private _UserUsuarioMenuService: UserUsuarioMenuService,
  private _LoginService: LoginService,
		private _loginService: LoginService,
  ){}

  ngOnInit() {
    this.usuarioMenu = new UserUsuarioMenu(null, null, null);
    console.log(this.usuario);

    let token = this._LoginService.getToken();

    this._MenuService.selectRegistered({ 'idUsuario': this.usuario.id }, token).subscribe(
      response => {
        this.menus = response;
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
  
  onCancelar(){
    this.ready.emit(true);
  }
  
  onEnviar(){
    let token = this._LoginService.getToken();

    this.usuarioMenu.idUsuario = this.usuario.id;
    
		this._UserUsuarioMenuService.delete(this.usuarioMenu,token).subscribe(
			response => {
        if(response.code == 200){
          swal({
            title: 'Perfecto!',
            text: response.message,
            type: 'success',
            confirmButtonText: 'Aceptar'
          });

          this.ready.emit(true);
        }else{
          swal({
            title: 'Error!',
            text: response.message,
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

  onDeleteAll(){
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
        this._UserUsuarioMenuService.deleteAll({ 'identificacion': this.usuario.ciudadano.identificacion }, token).subscribe(
          response => {
            if (response.code == 200) {
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

}
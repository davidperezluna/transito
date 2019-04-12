import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserUsuarioMenu } from '../userUsuarioMenu.modelo';
import { UserCfgMenuService } from '../../../services/userCfgMenu.service';
import { UserUsuarioMenuService } from '../../../services/userUsuarioMenu.service';
import { LoginService } from '../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
  @Output() ready = new EventEmitter<any>();
  @Input() usuario: any = null;

  public usuarioMenu: UserUsuarioMenu;
  public errorMessage;

  public menus: any = null;


constructor(
  private _MenuService: UserCfgMenuService,
  private _UserUsuarioMenuService: UserUsuarioMenuService,
  private _LoginService: LoginService,
  ){}

  ngOnInit() {
    this.usuarioMenu = new UserUsuarioMenu(null, null, null);

    let token = this._LoginService.getToken();

    this._MenuService.selectAvailables({ 'idUsuario': this.usuario.id }, token).subscribe(
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
    
		this._UserUsuarioMenuService.register(this.usuarioMenu,token).subscribe(
			response => {
        if(response.status == 'success'){
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

}
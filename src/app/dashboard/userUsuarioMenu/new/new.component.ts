import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserUsuarioMenu } from '../userUsuarioMenu.modelo';
import { UserCfgRoleService } from '../../../services/userCfgRole.service';
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
  public parents: any = null;
  public roles: any = null;
  public menus: any = null;


constructor(
  private _UserCfgRoleService: UserCfgRoleService,
  private _UserCfgMenuService: UserCfgMenuService,
  private _UserUsuarioMenuService: UserUsuarioMenuService,
  private _LoginService: LoginService,
  ){}

  ngOnInit() {
    this.usuarioMenu = new UserUsuarioMenu(null, null, null);

    this._UserCfgMenuService.select().subscribe(
      response => {
        this.parents = response;
      },
      error => {
        this.errorMessage = <any>error;

        if (this.errorMessage != null) {
          console.log(this.errorMessage);
          alert("Error en la petición");
        }
      }
    );

    this._UserCfgRoleService.select().subscribe(
      response => {
        this.roles = response;
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

  onChangedRole(e) {
    if (e) {
      swal({
        title: 'Cargando menus!',
        text: 'Solo tardara unos segundos por favor espere.',
        onOpen: () => {
          swal.showLoading();
        }
      });

      let token = this._LoginService.getToken();

      this._UserCfgMenuService.selectByRole({ 'idRole': e }, token).subscribe(
        response => {
          if (response) {
            this.parents = response;
          }

          swal.close();
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
  }

  onChangedParent(e) {
    if (e) {
      swal({
        title: 'Cargando submenus!',
        text: 'Solo tardara unos segundos por favor espere.',
        onOpen: () => {
          swal.showLoading();
        }
      });

      let token = this._LoginService.getToken();

      this._UserCfgMenuService.selectByParent({ 'idParent': e, 'idUsuario': this.usuario.id }, token).subscribe(
        response => {
          if (response) {
            this.menus = response;
          }

          swal.close();
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
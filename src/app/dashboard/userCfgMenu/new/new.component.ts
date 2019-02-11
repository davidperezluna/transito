import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import { UserCfgMenu } from '../userCfgMenu.modelo';
import { UserCfgMenuService } from '../../../services/userCfgMenu.service';
import { UserCfgRoleService } from '../../../services/userCfgRole.service';
import { LoginService } from '../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
@Output() ready = new EventEmitter<any>();
public menu: UserCfgMenu;
public errorMessage;
public menus: any = null;
public roles: any = null;

constructor(
  private _UserCfgMenuService: UserCfgMenuService,
  private _UserCfgRoleService: UserCfgRoleService,
  private _loginService: LoginService,
  ){}

  ngOnInit() {
    this.menu = new UserCfgMenu(null, null, null, null, null, null);

    this._UserCfgMenuService.select().subscribe(
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
  
  onEnviar(){
    let token = this._loginService.getToken();
    
		this._UserCfgMenuService.register(this.menu,token).subscribe(
			response => {
        if(response.status == 'success'){
          this.ready.emit(true);
          swal({
            title: 'Perfecto!',
            text: response.message,
            type: 'success',
            confirmButtonText: 'Aceptar'
          })
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
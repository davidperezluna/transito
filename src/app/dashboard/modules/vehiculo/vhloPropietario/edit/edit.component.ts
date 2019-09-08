import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import { UserCfgMenuService } from '../../../../../services/userCfgMenu.service';
import { UserCfgRoleService } from '../../../../../services/userCfgRole.service';
import { LoginService } from '../../../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html'
})
export class EditComponent implements OnInit{
  @Output() ready = new EventEmitter<any>();
  @Input() menu:any = null;
  public errorMessage;
  public menus: any = null;
  public roles: any = null;

constructor(
  private _UserCfgMenuService: UserCfgMenuService,
  private _UserCfgRoleService: UserCfgRoleService,
  private _loginService: LoginService,
  ){  }

  ngOnInit(){  
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

  onCancelar(){ this.ready.emit(true); }

  onEnviar(){
    let token = this._loginService.getToken();
		this._UserCfgMenuService.edit(this.menu,token).subscribe(
			response => {
        if(response.code == 200){
          this.ready.emit(true);
          this._UserCfgMenuService.cartData.emit(this.menus);  
          swal({
            title: 'Perfecto!',
            text: response.message,
            type: 'success',
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
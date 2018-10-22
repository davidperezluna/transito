import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import { UserCfgRole } from '../userCfgRole.modelo';
import { UserCfgRoleService } from '../../../services/userCfgRole.service';
import { UserCfgMenuService } from '../../../services/userCfgMenu.service';
import { LoginService } from '../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
@Output() ready = new EventEmitter<any>();
public role: UserCfgRole;
public errorMessage;

  public menus: any = null;
  public menuArray: any = [];

constructor(
  private _UserCfgRoleService: UserCfgRoleService,
  private _UserCfgMenuService: UserCfgMenuService,
  private _loginService: LoginService,
  ){}

  ngOnInit() {
    this.role = new UserCfgRole(null, null, null);

    swal({
      title: 'Cargando Tabla!',
      text: 'Solo tardara unos segundos por favor espere.',
      onOpen: () => {
        swal.showLoading();
      }
    });

    let token = this._loginService.getToken();

    this._UserCfgMenuService.list({ 'type': 'create_menu' }, token).subscribe(
      response => {
        this.menus = response.data;
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
  
  onCancelar(){
    this.ready.emit(true);
  }

  onChanged(id: string, e: any) {
    if (e.target.checked) {
      this.menuArray.push(id);
    } else {
      let index = this.menuArray.indexOf(id);
      this.menuArray.splice(index, 1);
    }

    this.role.menus = this.menuArray;
  }
  
  onEnviar(){
    let token = this._loginService.getToken();
    
		this._UserCfgRoleService.register(this.role,token).subscribe(
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
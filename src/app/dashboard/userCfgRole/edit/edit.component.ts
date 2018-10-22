import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import { UserCfgRoleService } from '../../../services/userCfgRole.service';
import { UserCfgMenuService } from '../../../services/userCfgMenu.service';
import { LoginService } from '../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html'
})

export class EditComponent implements OnInit{
@Output() ready = new EventEmitter<any>();
@Input() role:any = null;
  public errorMessage;

  public formReady = false;

  public menus: any = null;
  public menuArray: any = [];

  public nodes: any = [];
  public options = {};

 

constructor(
  private _UserCfgRoleService: UserCfgRoleService,
  private _UserCfgMenuService: UserCfgMenuService,
  private _loginService: LoginService,
  ){  }

  ngOnInit(){
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

  onChanged(id: string, e: any) {
    if (e.target.checked) {
      this.menuArray.push(id);
    } else {
      let index = this.menuArray.indexOf(id);
      this.menuArray.splice(index, 1);
    }

    this.role.menus = this.menuArray;
  }

  onCancelar(){ this.ready.emit(true); }

  onEnviar(){
    let token = this._loginService.getToken();
		this._UserCfgRoleService.edit(this.role,token).subscribe(
			response => {
        if(response.status == 'success'){
          this.ready.emit(true);
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
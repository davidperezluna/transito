import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import { UserCfgRoleService } from '../../../../../services/userCfgRole.service';
import { UserCfgMenuService } from '../../../../../services/userCfgMenu.service';
import { LoginService } from '../../../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html'
})

export class EditComponent implements OnInit{
  @Output() ready = new EventEmitter<any>();
  @Input() usuarioMenu:any = null;
  public errorMessage;
 

constructor(
  private _UserCfgRoleService: UserCfgRoleService,
  private _UserCfgMenuService: UserCfgMenuService,
  private _loginService: LoginService,
  ){ 
    
  }

  ngOnInit(){  }

  onCancelar(){ this.ready.emit(true); }

  onEnviar(){
    let token = this._loginService.getToken();
		this._UserCfgRoleService.edit(this.usuarioMenu,token).subscribe(
			response => {
        if(response.status == 'success'){
          swal({
            title: 'Perfecto!',
            text: response.message,
            type: 'success',
            confirmButtonText: 'Aceptar'
          });

          this.ready.emit(true);
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
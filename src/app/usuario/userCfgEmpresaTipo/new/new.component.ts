import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { UserCfgEmpresaTipo } from '../userCfgEmpresaTipo.modelo';
import { UserCfgEmpresaTipoService } from '../../../services/userCfgEmpresaTipo.service';
import { LoginService } from '../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
  @Output() ready = new EventEmitter<any>();

  public tipo: UserCfgEmpresaTipo;
  public errorMessage;

constructor(
  private _TipoService: UserCfgEmpresaTipoService,
  private _LoginService: LoginService,
  ){}

  ngOnInit() {
    this.tipo = new UserCfgEmpresaTipo(null, null);
  }

  onCancelar(){
    this.ready.emit(true);
  }
  
  onEnviar(){
    let token = this._LoginService.getToken();
    
		this._TipoService.register(this.tipo, token).subscribe(
			response => {
        if(response.status == 'success'){
          this.ready.emit(true);

          swal({
            title: 'Perfecto!',
            text: response.message,
            type: 'success',
            confirmButtonText: 'Aceptar'
          });
        }else{
          swal({
            title: 'Error!',
            text: response.message,
            type: 'error',
            confirmButtonText: 'Aceptar'
          });
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
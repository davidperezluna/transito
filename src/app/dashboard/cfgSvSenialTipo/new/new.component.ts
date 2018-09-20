import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { CfgSvSenialTipo } from '../cfgSvSenialTipo.modelo';
import { CfgSvSenialTipoService } from '../../../services/cfgSvSenialTipo.service';
import { LoginService } from '../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
@Output() ready = new EventEmitter<any>();
public estado: CfgSvSenialTipo;
public errorMessage;
public respuesta;

constructor(
  private _TipoService: CfgSvSenialTipoService,
  private _loginService: LoginService,
  ){}

  ngOnInit() {
    this.estado = new CfgSvSenialTipo(null, null);
  }

  onCancelar(){
    this.ready.emit(true);
  }
  
  onEnviar(){
    let token = this._loginService.getToken();
    
		this._TipoService.register(this.estado,token).subscribe(
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
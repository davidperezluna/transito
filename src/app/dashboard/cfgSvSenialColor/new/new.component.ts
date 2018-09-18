import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { CfgSvSenialColor } from '../cfgSvSenialColor.modelo';
import { CfgSvSenialColorService } from '../../../services/cfgSvSenialColor.service';
import { LoginService } from '../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
@Output() ready = new EventEmitter<any>();
public color: CfgSvSenialColor;
public errorMessage;
public respuesta;

constructor(
  private _ColorService: CfgSvSenialColorService,
  private _loginService: LoginService,
  ){}

  ngOnInit() {
    this.color = new CfgSvSenialColor(null, null);
  }

  onCancelar(){
    this.ready.emit(true);
  }
  
  onEnviar(){
    let token = this._loginService.getToken();
    
		this._ColorService.register(this.color,token).subscribe(
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
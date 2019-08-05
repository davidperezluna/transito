import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { SvCfgSenialEstado } from '../svCfgSenialEstado.modelo';
import { SvCfgSenialEstadoService } from '../../../../../services/svCfgSenialEstado.service';
import { LoginService } from '../../../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
@Output() ready = new EventEmitter<any>();
public estado: SvCfgSenialEstado;
public errorMessage;

constructor(
  private _EstadoService: SvCfgSenialEstadoService,
  private _loginService: LoginService,
  ){}

  ngOnInit() {
    this.estado = new SvCfgSenialEstado(null, null);
  }

  onCancelar(){
    this.ready.emit(true);
  }
  
  onEnviar(){
    let token = this._loginService.getToken();
    
		this._EstadoService.register(this.estado,token).subscribe(
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
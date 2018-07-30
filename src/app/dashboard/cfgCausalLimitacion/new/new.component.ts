import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import { CfgCausalLimitacion } from '../cfgCausalLimitacion.modelo';
import { CfgCausalLimitacionService } from '../../../services/cfgCausalLimitacion.service';
import {LoginService} from '../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
@Output() ready = new EventEmitter<any>();
  public cfgCausalLimitacion: CfgCausalLimitacion;
public errorMessage;
public respuesta;

constructor(
  private _CfgCausalLimitacionService: CfgCausalLimitacionService,
  private _loginService: LoginService,
  ){}

  ngOnInit() {
    this.cfgCausalLimitacion = new CfgCausalLimitacion(null,null);


  }
  onCancelar(){
    this.ready.emit(true);
  }
  onEnviar(){
    let token = this._loginService.getToken();

    this._CfgCausalLimitacionService.register(this.cfgCausalLimitacion,token).subscribe(
			response => {
        this.respuesta = response;
        console.log(this.respuesta);
        if(this.respuesta.status == 'success'){
          this.ready.emit(true);
          swal({
            title: 'Perfecto!',
            text: 'Registro exitoso!',
            type: 'success',
            confirmButtonText: 'Aceptar'
          })
        }else{
          swal({
            title: 'Error!',
            text: 'El causal de limitacion ' + this.cfgCausalLimitacion.nombre +' ya se encuentra registrado',
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
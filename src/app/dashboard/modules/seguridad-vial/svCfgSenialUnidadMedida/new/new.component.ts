import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { SvCfgSenialUnidadMedida } from '../svCfgSenialUnidadMedida.modelo';
import { SvCfgSenialUnidadMedidaService } from '../../../../../services/svCfgSenialUnidadMedida.service';
import { LoginService } from '../../../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-new-svcfgsenialunidadmedida',
  templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
@Output() ready = new EventEmitter<any>();
public unidadMedida: SvCfgSenialUnidadMedida;
public errorMessage;
public respuesta;

constructor(
  private _EstadoService: SvCfgSenialUnidadMedidaService,
  private _loginService: LoginService,
  ){}

  ngOnInit() {
    this.unidadMedida = new SvCfgSenialUnidadMedida(null, null);
  }

  onCancelar(){
    this.ready.emit(true);
  }
  
  onEnviar(){
    let token = this._loginService.getToken();
    
		this._EstadoService.register(this.unidadMedida,token).subscribe(
			response => {
        if(response.code == 200){
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
      }
    );
  }

}
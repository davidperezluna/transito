import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SvCfgSenialEstadoService } from '../../../../../services/svCfgSenialEstado.service';
import { LoginService } from '../../../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-edit-svcfgsenialestado',
  templateUrl: './edit.component.html'
})
export class EditComponent implements OnInit{
@Output() ready = new EventEmitter<any>();
@Input() estado:any = null;
public errorMessage;

public formReady = false;

constructor(
  private _SenialEstadoService: SvCfgSenialEstadoService,
  private _loginService: LoginService,
  ){}

  ngOnInit(){ console.log(this.estado);
   }

  onCancelar(){ this.ready.emit(true); }

  onEnviar(){
    let token = this._loginService.getToken();
		this._SenialEstadoService.edit(this.estado,token).subscribe(
			response => {
        if(response.code == 200){
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
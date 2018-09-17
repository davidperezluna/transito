import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CfgSvUnidadMedidaService } from '../../../services/cfgSvUnidadMedida.service';
import { LoginService } from '../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html'
})
export class EditComponent implements OnInit{
@Output() ready = new EventEmitter<any>();
@Input() medida:any = null;
public errorMessage;
public respuesta;
public formReady = false;

constructor(
  private _UnidadMedidaService: CfgSvUnidadMedidaService,
  private _loginService: LoginService,
  ){}

  ngOnInit(){ console.log(this.medida);
   }

  onCancelar(){ this.ready.emit(true); }

  onEnviar(){
    let token = this._loginService.getToken();
		this._UnidadMedidaService.edit(this.medida,token).subscribe(
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
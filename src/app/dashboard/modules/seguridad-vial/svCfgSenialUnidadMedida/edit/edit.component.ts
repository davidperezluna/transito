import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SvCfgSenialUnidadMedidaService } from '../../../../../services/svCfgSenialUnidadMedida.service';
import { LoginService } from '../../../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-edit-svcfgsenialunidadmedida',
  templateUrl: './edit.component.html'
})
export class EditComponent implements OnInit{
@Output() ready = new EventEmitter<any>();
@Input() unidadMedida:any = null;
public errorMessage;
public formReady = false;

constructor(
  private _UnidadMedidaService: SvCfgSenialUnidadMedidaService,
  private _loginService: LoginService,
  ){}

  ngOnInit(){ }

  onCancelar(){ this.ready.emit(true); }

  onEnviar(){
    let token = this._loginService.getToken();
		this._UnidadMedidaService.edit(this.unidadMedida,token).subscribe(
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
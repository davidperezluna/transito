import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import { VhloCfgLimitacionTipoProceso } from '../vhloCfgLimitacionTipoProceso.modelo';
import { VhloCfgLimitacionTipoProcesoService } from '../../../../../services/vhloCfgLimitacionTipoProceso.service';
import {LoginService} from '../../../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-new-vhlocfglimitaciontipoproceso',
  templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
@Output() ready = new EventEmitter<any>();
  public tipoProceso: VhloCfgLimitacionTipoProceso;
public errorMessage;
public respuesta;

constructor(
  private _TipoProcesoService: VhloCfgLimitacionTipoProcesoService,
  private _loginService: LoginService,
  ){}

  ngOnInit() {
    this.tipoProceso = new VhloCfgLimitacionTipoProceso(null,null);
  }

  onCancelar(){
    this.ready.emit(true);
  }

  onEnviar(){
    let token = this._loginService.getToken();

    this._TipoProcesoService.register(this.tipoProceso,token).subscribe(
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
            text: 'El tipo de proceso ' + this.tipoProceso.nombre +' ya se encuentra registrado',
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
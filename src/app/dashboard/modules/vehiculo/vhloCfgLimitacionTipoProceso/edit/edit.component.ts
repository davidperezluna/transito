import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import { VhloCfgLimitacionTipoProcesoService } from '../../../../../services/vhloCfgLimitacionTipoProceso.service';
import {LoginService} from '../../../../../services/login.service';
import swal from 'sweetalert2';


@Component({
  selector: 'app-edit-vhlocfglimitaciontipoproceso',
  templateUrl: './edit.component.html'
})
export class EditComponent {
@Output() ready = new EventEmitter<any>();
  @Input() tipoProceso:any = null;
public errorMessage;

constructor(
  private _CfgTipoProcesoService: VhloCfgLimitacionTipoProcesoService,
  private _LoginService: LoginService,
  ){
  }

  ngOnInit() {}

  onCancelar(){
    this.ready.emit(true);
  }

  onEnviar(){
    let token = this._LoginService.getToken();

    this._CfgTipoProcesoService.edit(this.tipoProceso,token).subscribe(
			response => {
        if(response.code == 200){
          this.ready.emit(true);
          swal({
            title: response.title,
            text: response.message,
            type: response.status,
            confirmButtonText: 'Aceptar'
          });
        } else {
          swal({
            title: response.title,
            text: response.message,
            type: response.status,
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
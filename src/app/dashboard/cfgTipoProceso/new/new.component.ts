import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import { CfgTipoProceso } from '../cfgTipoProceso.modelo';
import { CfgTipoProcesoService } from '../../../services/cfgTipoProceso.service';
import {LoginService} from '../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
@Output() ready = new EventEmitter<any>();
  public cfgTipoProceso: CfgTipoProceso;
public errorMessage;
public respuesta;

constructor(
  private _CfgTipoProcesoService: CfgTipoProcesoService,
  private _loginService: LoginService,
  ){}

  ngOnInit() {
    this.cfgTipoProceso = new CfgTipoProceso(null,null);


  }
  onCancelar(){
    this.ready.emit(true);
  }
  onEnviar(){
    let token = this._loginService.getToken();

    this._CfgTipoProcesoService.register(this.cfgTipoProceso,token).subscribe(
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
            text: 'El tipo de proceso ' + this.cfgTipoProceso.nombre +' ya se encuentra registrado',
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
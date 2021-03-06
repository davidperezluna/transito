import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import { VhloCfgTransportePasajero } from '../vhloCfgTransportePasajero.modelo';
import { VhloCfgTransportePasajeroService } from '../../../../../services/vhloCfgTransportePasajero.service';
import { LoginService } from '../../../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-new-vhlocfgtransportepasajero',
  templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
@Output() ready = new EventEmitter<any>();
public transportePasajero: VhloCfgTransportePasajero;
public errorMessage;
public respuesta;

constructor(
  private _TransportePasajeroService: VhloCfgTransportePasajeroService,
  private _loginService: LoginService,
  ){}

  ngOnInit() {
    this.transportePasajero = new VhloCfgTransportePasajero(null, null, null);
  }
  
  onCancelar(){
    this.ready.emit(true);
  }
  
  onEnviar(){
    let token = this._loginService.getToken();
    
		this._TransportePasajeroService.register(this.transportePasajero,token).subscribe(
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

		}); 
  }

}
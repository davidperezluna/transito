import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import { VhloCfgTransporteEspecial } from '../vhloCfgTransporteEspecial.modelo';
import { VhloCfgTransportePasajeroService } from '../../../../../services/vhloCfgTransportePasajero.service';
import { VhloCfgTransporteEspecialService } from '../../../../../services/vhloCfgTransporteEspecial.service';
import { LoginService } from '../../../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-new-vhlocfgtransporteespecial',
  templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
@Output() ready = new EventEmitter<any>();
public transporteEspecial: VhloCfgTransporteEspecial;
public errorMessage;

public transportesPasajero;

constructor(
  private _TransporteEspecialService: VhloCfgTransporteEspecialService,
  private _TransportePasajeroService: VhloCfgTransportePasajeroService,
  private _loginService: LoginService,
  ){}

  ngOnInit() {
    this.transporteEspecial = new VhloCfgTransporteEspecial(null, null, null);

    this._TransportePasajeroService.select().subscribe(
      response => {
        this.transportesPasajero = response;

      },
      error => {
        this.errorMessage = <any>error;

        if (this.errorMessage != null) {
          console.log(this.errorMessage);
          alert("Error en la petición");
        }
      }
    ); 
  }
  
  onCancelar(){
    this.ready.emit(true);
  }
  
  onEnviar(){
    let token = this._loginService.getToken();
    
		this._TransporteEspecialService.register(this.transporteEspecial,token).subscribe(
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
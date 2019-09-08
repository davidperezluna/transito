import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import { VhloCfgTransportePasajeroService } from '../../../../../services/vhloCfgTransportePasajero.service';
import { VhloCfgTransporteEspecialService } from '../../../../../services/vhloCfgTransporteEspecial.service';
import { LoginService } from '../../../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html'
})
export class EditComponent implements OnInit{
@Output() ready = new EventEmitter<any>();
@Input() transporteEspecial:any = null;
public errorMessage;
public formReady = false;

public transportesPasajero;

constructor(
  private _TransporteEspecialService: VhloCfgTransporteEspecialService,
  private _TransportePasajeroService: VhloCfgTransportePasajeroService,
  private _loginService: LoginService,
  ){}

  ngOnInit(){ 
    this._TransportePasajeroService.select().subscribe(
      response => {
        this.transportesPasajero = response;
        setTimeout(() => {
          this.transporteEspecial.transportePasajero = [this.transporteEspecial.transportePasajero.id];
        });
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

  onCancelar(){ this.ready.emit(true); }

  onEnviar(){
    let token = this._loginService.getToken();
    
		this._TransporteEspecialService.edit(this.transporteEspecial,token).subscribe(
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
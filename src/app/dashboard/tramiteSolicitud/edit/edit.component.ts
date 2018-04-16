import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import { TramiteSolicitud } from '../tramiteSolicitud.modelo';
import { TramiteSolicitudService } from '../../../services/tramiteSolicitud.service';
import { TramiteFacturaService } from '../../../services/tramiteFactura.service';
import { VehiculoService } from '../../../services/vehiculo.service';
import { LoginService } from '../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html'
})
export class EditComponent implements OnInit{
@Output() ready = new EventEmitter<any>();
@Input() tramiteSolicitud: any = null;
  public errorMessage;
  public respuesta;
  public formReady = false;
  public tramitesFactura: any;
  public vehiculos: any;
  public tramiteFacturaSelected: any;
  public vehiculoSelected: any;

constructor(
  private _tramiteSolicitudService: TramiteSolicitudService,
  private _loginService: LoginService,
  private _tramiteFacturaService: TramiteFacturaService,
  private _vehiculoService: VehiculoService,
  ){}

  ngOnInit(){ console.log(this.tramiteSolicitud);
    this._tramiteFacturaService.getTramiteFacturaSelect().subscribe(
      response => {
        this.tramitesFactura = response;
      },
      error => {
        this.errorMessage = <any>error;

        if (this.errorMessage != null) {
          console.log(this.errorMessage);
          alert('Error en la petición');
        }
      }
    );

    this._vehiculoService.getVehiculoSelect().subscribe(
      response => {
        this.vehiculos = response;
      },
      error => {
        this.errorMessage = <any>error;
        if (this.errorMessage != null) {
          console.log(this.errorMessage);
          alert('Error en la petición');
        }
      }
    );
  }

  onCancelar(){ this.ready.emit(true); }

  onEnviar(){
    let token = this._loginService.getToken();
		this._tramiteSolicitudService.editTramiteSolicitud(this.tramiteSolicitud,token).subscribe(
			response => {
        this.respuesta = response;
        console.log(this.respuesta);
        if(this.respuesta.status == 'success'){
          this.ready.emit(true);
          swal({
            title: 'Pefecto!',
            text: 'El registro se ha modificado con exito',
            type: 'success',
            confirmButtonText: 'Aceptar'
          })
        }
			error => {
					this.errorMessage = <any>error;
					if(this.errorMessage != null){
						console.log(this.errorMessage);
						alert('Error en la petición');
					}
				}
		});
  }

}
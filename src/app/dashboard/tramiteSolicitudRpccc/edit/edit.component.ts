import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import { TramiteSolicitudRncService } from '../../../services/tramiteSolicitudRnc.service';
import { TramiteFacturaService } from '../../../services/tramiteFactura.service';
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
  public tramiteFacturaSelected: any;

constructor(
  private _tramiteSolicitudRncService: TramiteSolicitudRncService,
  private _loginService: LoginService,
  private _tramiteFacturaService: TramiteFacturaService,
  ){}

  ngOnInit(){ console.log(this.tramiteSolicitud);
    // this._tramiteFacturaService.getTramiteFacturaSelect().subscribe(
    //   response => {
    //     this.tramitesFactura = response;
    //   },
    //   error => {
    //     this.errorMessage = <any>error;

    //     if (this.errorMessage != null) {
    //       console.log(this.errorMessage);
    //       alert('Error en la petición');
    //     }
    //   }
    // );
  }

  onCancelar(){ this.ready.emit(true); }

  onEnviar(){
    let token = this._loginService.getToken();
		this._tramiteSolicitudRncService.edit(this.tramiteSolicitud,token).subscribe(
			response => {
        this.respuesta = response;
        console.log(this.respuesta);
        if(this.respuesta.status == 'success'){
          this.ready.emit(true);
          swal({
            title: 'Perfecto!',
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
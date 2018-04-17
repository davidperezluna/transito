import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import { TramiteSolicitud } from '../tramiteSolicitud.modelo';
import { TramiteSolicitudService } from '../../../services/tramiteSolicitud.service';
import { TramiteFacturaService } from '../../../services/tramiteFactura.service';
import { FacturaService } from '../../../services/factura.service';
import { LoginService } from '../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
  @Output() ready = new EventEmitter<any>();
  public tramiteSolicitud: TramiteSolicitud;
  public errorMessage;
  public respuesta;
  public tramitesFactura: any;
  public tramiteFacturaSelected: any;
  public numeroFactura: any;
  public factura: any;
  public isPagada = false;

constructor(
  private _TramiteSolicitudService: TramiteSolicitudService,
  private _loginService: LoginService,
  private _tramiteFacturaService: TramiteFacturaService,
  private _facturaService: FacturaService,
){}

  ngOnInit() {
    this.tramiteSolicitud = new TramiteSolicitud(null, null, null, null, null);
    this.numeroFactura = {
      'numeroFactura': this.numeroFactura,
    };
    
  }
  onCancelar(){
    this.ready.emit(true);
  }
  onEnviar(){
    console.log(this.tramiteFacturaSelected);
    let token = this._loginService.getToken();
    this.tramiteSolicitud.tramiteFacturaId = this.tramiteFacturaSelected;

    console.log(this.tramiteSolicitud);
		this._TramiteSolicitudService.register(this.tramiteSolicitud, token).subscribe(
			response => {
        this.respuesta = response;
        console.log(this.respuesta);
        if(this.respuesta.status == 'success'){
          this.ready.emit(true);
          swal({
            title: 'Pefecto!',
            text: 'El registro se ha registrado con exito',
            type: 'success',
            confirmButtonText: 'Aceptar'
          })
        }else{
          swal({
            title: 'Error!',
            text: 'El tramiteSolicitud '+  +' ya se encuentra registrada',
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

  onKeyValidateFactura() {
    swal({
      title: 'Buscando Factura!',
      text: 'Solo tardara unos segundos por favor espere.',
      timer: 2500,
      onOpen: () => {
        swal.showLoading();
      }
    }).then((result) => {
      if (
        // Read more about handling dismissals
        result.dismiss === swal.DismissReason.timer
      ) {
      }
    });

    let token = this._loginService.getToken();
        this._facturaService.showFacturaByNumero(token, this.numeroFactura).subscribe(
        response => {
          if (response.status == 'success') {
            this.factura = response.data;
            if (this.factura.estado) {
              this.isPagada = true;
              this._tramiteFacturaService.getTramiteFacturaSelect(this.numeroFactura.numeroFactura).subscribe(
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
            }
          } else {
            this.factura = false;
          }
          console.log(this.factura);
          error => {
            this.errorMessage = <any>error;
            if (this.errorMessage != null) {
              console.log(this.errorMessage);
              alert("Error en la petición");
            }
          }
        });
  }

  readyTramite(datos:any){
    this.tramiteSolicitud.tramiteFacturaId = this.tramiteFacturaSelected;
    this.tramiteSolicitud.datos=datos;
    console.log(this.tramiteSolicitud);
    let token = this._loginService.getToken();
    this._TramiteSolicitudService.register(this.tramiteSolicitud, token).subscribe(
      response => {
        this.respuesta = response;
        console.log(this.respuesta);
        if (this.respuesta.status == 'success') {
          this.ready.emit(true);
          swal({
            title: 'Pefecto!',
            text: 'El registro se ha registrado con exito',
            type: 'success',
            confirmButtonText: 'Aceptar'
          })
        } else {
          swal({
            title: 'Error!',
            text: 'El tramiteSolicitud ' + +' ya se encuentra registrada',
            type: 'error',
            confirmButtonText: 'Aceptar'
          })
        }
        error => {
          this.errorMessage = <any>error;
          if (this.errorMessage != null) {
            console.log(this.errorMessage);
            alert("Error en la petición");
          }
        }

      }); 
  }

}
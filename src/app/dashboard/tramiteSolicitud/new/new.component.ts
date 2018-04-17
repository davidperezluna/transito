import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import { TramiteSolicitud } from '../tramiteSolicitud.modelo';
import { TramiteSolicitudService } from '../../../services/tramiteSolicitud.service';
import { TramiteFacturaService } from '../../../services/tramiteFactura.service';
import { FacturaService } from '../../../services/factura.service';
import { LoginService } from '../../../services/login.service';
import swal from 'sweetalert2';
import { Factura } from 'app/dashboard/factura/factura.modelo';

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
  public tramiteSelected: any;
  public mensaje = '';
  public isError = false;

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
              this.isError = false;
              this._tramiteFacturaService.getTramiteFacturaSelect(this.factura.numero).subscribe(
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
            }else{
              this.factura = false;
              this.isError = true;
              this.mensaje = 'La factura no se encuentra pagada';
            }
          } else {
            this.factura = false;
            this.mensaje = 'Factura no se encuentra registrada en la base de datos';
            this.isError = true;
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
  changedTramiteFactura(e){
    let token = this._loginService.getToken();
    this._tramiteFacturaService.showTramiteFactura(token,e).subscribe(
      response => {
        this.respuesta = response;
        this.tramiteSelected = this.respuesta.data.id;
        console.log(this.respuesta.data.id);
        
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
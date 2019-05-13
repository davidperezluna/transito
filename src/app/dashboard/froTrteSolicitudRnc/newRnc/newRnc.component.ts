import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FroTrteSolicitudRnc } from '../froTrteSolicitudRnc.modelo';
import { FroTrteSolicitudService } from '../../../services/froTrteSolicitud.service';
import { FroFacTramiteService } from '../../../services/froFacTramite.service';
import { FroFacturaService } from '../../../services/froFactura.service';
import { UserCiudadanoService } from '../../../services/userCiudadano.service';
import { LoginService } from '../../../services/login.service';
import { environment } from 'environments/environment';
import { forEach } from '@angular/router/src/utils/collection';
import swal from 'sweetalert2';

@Component({
  selector: 'app-new',
  templateUrl: './newRnc.component.html'
})
export class NewRncComponent implements OnInit {
  @Output() ready = new EventEmitter<any>();
  public tramiteSolicitud: FroTrteSolicitudRnc;
  public errorMessage;

  public apiUrl = environment.apiUrl + 'financiero/frotrtesolicitud';
  
  public numeroFactura: any = null;
  public identificacion: any = null;

  public factura: any = null;
  public solicitante: any = null;

  public tramitesFactura: any = null;
  public tramiteFactura: any = null;
  public tramiteFacturaSelected: any;
  public tramiteSelected: any;
  public tramites='';

  public tramite = false;
  public requiereSustrato = false;
  public requiereRunt = false;
  public tramitesRealizados: any = [];
  public documentacionPendiente: any = [];

constructor(
  private _SolicitudService: FroTrteSolicitudService,
  private _TramiteFacturaService: FroFacTramiteService,
  private _FacturaService: FroFacturaService,
  private _CiudadanoService: UserCiudadanoService,
  private _LoginService: LoginService,
){}

  ngOnInit() {
    this.tramiteSolicitud = new FroTrteSolicitudRnc(null, null, null, null, null, null);
  }

  onCancelar(){
    this.ready.emit(true);
  }

  onSearchFactura(){
    swal({
      title: 'Consultando factura!',
      text: 'Solo tardara unos segundos por favor espere.',
      onOpen: () => {
        swal.showLoading()
      }
    });

    if (!this.numeroFactura) {
      swal({
        title: 'Error!',
        text: 'Debe digitar un número de factura.',
        type: 'error',
        confirmButtonText: 'Aceptar'
      });
    }else {
      let token = this._LoginService.getToken();

      this._FacturaService.searchByNumero({ 'numeroFactura': this.numeroFactura }, token).subscribe(
        response => {
          if (response.code == 200) {
            this.factura = response.data;

            this._TramiteFacturaService.searchTramitesByFactura({ 'idFactura': this.factura.id }, token).subscribe(
              response => {
                if (response.code == 200) {
                  this.tramitesFactura = response.data.tramitesFactura;
                  this.requiereSustrato = response.data.sustrato;
                  this.requiereRunt = response.data.numeroRunt;

                  swal.close();
                } else {
                  this.tramitesFactura = null;

                  swal({
                    title: 'Error!',
                    text: response.message,
                    type: 'error',
                    confirmButtonText: 'Aceptar'
                  });
                }
                error => {
                  this.errorMessage = <any>error;
                  if (this.errorMessage != null) {
                    console.log(this.errorMessage);
                    alert("Error en la petición");
                  }
                }
              }
            );
          } else {
            this.factura = null;
            this.tramitesFactura = null;
            this.requiereSustrato = false;
            this.requiereRunt = false;

            swal({
              title: 'Error!',
              text: response.message,
              type: 'error',
              confirmButtonText: 'Aceptar'
            });
          }
          error => {
            this.errorMessage = <any>error;
            if (this.errorMessage != null) {
              console.log(this.errorMessage);
              alert("Error en la petición");
            }
          }
        }
      );
    }
  }

  onSearchCiudadano() {
    swal({
      title: 'Buscando ciudadano!',
      text: 'Solo tardara unos segundos por favor espere.',
      onOpen: () => {
        swal.showLoading()
      }
    });

    if (!this.identificacion) {
      swal({
        title: 'Error!',
        text: 'El número de identificación no puede estar vacio.',
        type: 'error',
        confirmButtonText: 'Aceptar'
      });
    }else{
      let token = this._LoginService.getToken();

      let datos = {
        'identificacion': this.identificacion,
        'idTipoIdentificacion': 1,
      }

      this._CiudadanoService.searchByIdentificacion(datos, token).subscribe(
        response => {
          if (response.code == 200) {
            if (response.data.ciudadano) {
              this.solicitante = response.data.ciudadano;
              this.tramiteSolicitud.idSolicitante = this.solicitante.id;

              swal({
                title: 'Perfecto!',
                text: response.message,
                type: 'success',
                confirmButtonText: 'Aceptar'
              });
            }
          } else {
            this.solicitante = null;
            this.tramiteSolicitud.idSolicitante = null;

            swal({
              title: 'Error!',
              text: response.message,
              type: 'error',
              confirmButtonText: 'Aceptar'
            });
          }
          error => {
            this.errorMessage = <any>error;
            if (this.errorMessage != null) {
              console.log(this.errorMessage);
              alert('Error en la petición');
            }
          }
        }
      );
    }
  }

  onChangedTramiteFactura(idTramiteFactura) {
    swal({
      title: 'Cargando trámite!',
      text: 'Solo tardará unos segundos, por favor espere.',
      onOpen: () => {
        swal.showLoading()
      }
    });

    if (idTramiteFactura) {
      let token = this._LoginService.getToken();

      this._TramiteFacturaService.show({ 'id': idTramiteFactura }, token).subscribe(
        response => {
          if (response.code == 200) {
            this.tramiteFactura = response.data;

            swal.close();
          } else {
            this.tramiteFactura = null;

            swal({
              title: 'Error!',
              text: response.message,
              type: 'error',
              confirmButtonText: 'Aceptar'
            });
          }
          error => {
            this.errorMessage = <any>error;
            if (this.errorMessage != null) {
              console.log(this.errorMessage);
              alert("Error en la petición");
            }
          }
        }
      );
    }
  }

  onEnviar(){
    let token = this._LoginService.getToken();

    this.tramiteSolicitud.tramitesRealizados = this.tramitesRealizados;
    this.tramiteSolicitud.documentacionPendiente = this.documentacionPendiente;

    this._SolicitudService.register(this.tramiteSolicitud, token).subscribe(
			response => {
        if(response.code == 200){
          this.factura = response.data.factura;
          
          swal({
            title: 'Perfecto!',
            text: response.message,
            type: 'success',
            confirmButtonText: 'Aceptar'
          });
        }else if(response.code == 401){
          this.factura = response.data.factura;
          
          swal({
            title: 'Atención!',
            text: response.message,
            type: 'warning',
            confirmButtonText: 'Aceptar'
          });
        }else{
          swal({
            title: 'Error!',
            text: response.message,
            type: 'error',
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
      }
    );

		/*this._SolicitudService.register(this.tramiteSolicitud, token).subscribe(
			response => {
        if(response.code == 200){
          swal({
            title: 'Perfecto!',
            text: response.message,
            type: 'success',
            confirmButtonText: 'Aceptar'
          });

          this.onChangedTramiteFactura(response.data.tramiteFactura.id);
        }else if(response.code == 401){
          this.tramiteFactura = response.data;

          swal({
            title: 'Atención!',
            text: response.message,
            type: 'warning',
            confirmButtonText: 'Aceptar'
          });
        }else{
          swal({
            title: 'Error!',
            text: response.message,
            type: 'error',
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
		});*/
  }
  
  onReadyTramite(datos:any){    
    if (datos.documentacion) {
      this.tramitesRealizados.push(
        {
          'foraneas': datos.foraneas,
          'resumen': datos.resumen,
          'idTramiteFactura': datos.idTramiteFactura,
        }
      );
    }else{
      this.documentacionPendiente.push(
        {
          'documentacion': datos.documentacion,
          'observacion': datos.observacion,
          'idTramiteFactura': datos.idTramiteFactura,
        }
      );
    }
    
    swal({
      title: 'Perfecto!',
      text: 'Trámite realizado con exito.',
      type: 'success',
      confirmButtonText: 'Aceptar'
    });

    this.onChangedTramiteFactura(datos.idTramiteFactura);

    /*let token = this._LoginService.getToken();

    this._TramiteFacturaService.show({ 'id': datos.idTramiteFactura }, token).subscribe(
      response => {
        if (response.code == 200) {
          let tramiteFactura = { 'value': response.data.id, 'label': response.data.precio.nombre };

          this.tramitesFactura = this.tramitesFactura.filter(h => h !== tramiteFactura);
          this.tramiteSolicitud.idTramiteFactura = null;
        } else {
          swal({
            title: 'Error!',
            text: response.message,
            type: 'error',
            confirmButtonText: 'Aceptar'
          });
        }
        error => {
          this.errorMessage = <any>error;
          if (this.errorMessage != null) {
            console.log(this.errorMessage);
            alert("Error en la petición");
          }
        }
      }
    );*/

    /*this.tramiteSolicitud.datos = datos;

    let token = this._LoginService.getToken();

    this._SolicitudService.register(this.tramiteSolicitud, token).subscribe(
      response => {
        if (response.code == 200) {
          swal({
            title: 'Perfecto!',
            text: response.message,
            type: 'success',
            confirmButtonText: 'Aceptar'
          });
        } else {
          swal({
            title: 'Error!',
            text: response.message,
            type: 'error',
            confirmButtonText: 'Aceptar'
          });
        }
        error => {
          this.errorMessage = <any>error;
          if (this.errorMessage != null) {
            console.log(this.errorMessage);
            alert("Error en la petición");
          }
        }
      }
    );
    */
  }

  cancelarTramite(){
    this.tramiteSelected = false;
  }

  finalizarSolicitud(){
    let token = this._LoginService.getToken();

    this.tramitesFactura.forEach(tramiteFactura => {
      this.tramites = this.tramites + tramiteFactura.tramitePrecio.nombre + '<br>' 
    });

    var html = 'Se va a enviar la siguiente solicitud:<br>'+
              'Factura: <b>'+this.factura.numero+'</b><br>'+
              'Solicitante: <b>'+this.solicitante.identificacion+'</b><hr>'+
              'Tramites:<br>'+
              this.tramites  
    swal({
      title: 'Resumen',
      type: 'warning',
      html:html,
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText:
        '<i class="fa fa-thumbs-up"></i> Aceptar!',
      confirmButtonAriaLabel: 'Thumbs up, great!',
      cancelButtonText:
      '<i class="fa fa-thumbs-down"></i> Cancelar',
      cancelButtonAriaLabel: 'Thumbs down',
    }).then((result) => {
      if (result.value) {
        this.factura.estado = 'FINALIZADA';

        this._FacturaService.edit(this.factura,token).subscribe(
          response => {
            error => {
              this.errorMessage = <any>error;
              if (this.errorMessage != null) {
                console.log(this.errorMessage);
                alert("Error en la petición");
              }
            }
          });
        } else if (
        // Read more about handling dismissals
        result.dismiss === swal.DismissReason.cancel
      ) {

      }
    });     
  }

}
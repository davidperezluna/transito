import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FroTrteSolicitud } from '../froTrteSolicitud.modelo';
import { FroTrteSolicitudService } from '../../../services/froTrteSolicitud.service';
import { FroFacTramiteService } from '../../../services/froFacTramite.service';
import { FroFacturaService } from '../../../services/froFactura.service';
import { UserCiudadanoService } from '../../../services/userCiudadano.service';
import { PnalFuncionarioService } from '../../../services/pnalFuncionario.service';
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
  public tramiteSolicitud: FroTrteSolicitud;
  public errorMessage;

  public apiUrl = environment.apiUrl + 'financiero/frotrtesolicitud';
  
  public numeroFactura: any = null;
  public identificacion: any = null;

  public funcionario: any = null;
  public factura: any = null;
  public solicitante: any = null;

  public tramitesFactura: any = null;
  public tramiteFactura: any = null;
  public idTramiteFactura: any = null;
  public tramites='';
  
  public tramite = false;
  public requiereSustrato = false;
  public requiereRunt = false;
  public tramitesRealizados: any = [];
  public documentacionPendiente: any = [];
  
  public formNewCiudadano: any = false;

constructor(
  private _SolicitudService: FroTrteSolicitudService,
  private _TramiteFacturaService: FroFacTramiteService,
  private _FacturaService: FroFacturaService,
  private _CiudadanoService: UserCiudadanoService,
  private _FuncionarioService: PnalFuncionarioService,
  private _LoginService: LoginService,
){}

  ngOnInit() {
    swal({
      title: 'Cargando información!',
      text: 'Solo tardará unos segundos, por favor espere.',
      onOpen: () => {
        swal.showLoading()
      }
    });

    this.tramiteSolicitud = new FroTrteSolicitud(null, null, null, null, null, null, null, null, null, null);

    let token = this._LoginService.getToken();

    let identity = this._LoginService.getIdentity();

    this._FuncionarioService.searchLogin({ 'identificacion': identity.identificacion }, token).subscribe(
      response => {
        if (response.status == 'success') {
          this.funcionario = response.data; 
          this.tramiteSolicitud.idFuncionario = this.funcionario.id;
          
          swal.close();
        } else {
          this.funcionario = null;

          swal({
              title: 'Error!',
              text: 'Usted no tiene permisos para realizar tramites',
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
            this.factura = response.data;
            this.tramiteSolicitud.idFactura = null;
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

  onComplete() {
    let token = this._LoginService.getToken();

    this._FacturaService.complete({ 'id': this.factura.id }, token).subscribe(
			response => {
        if(response.code == 200){
          this.factura = response.data;

          swal({
            title: response.title,
            text: response.message,
            type: response.status,
            confirmButtonText: 'Aceptar'
          });
        }else{
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
      }
    );
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
              this.tramiteSolicitud.idCiudadano = this.solicitante.id;

              swal({
                title: 'Perfecto!',
                text: response.message,
                type: 'success',
                confirmButtonText: 'Aceptar'
              });
            }
          } else {
            this.solicitante = null;
            this.tramiteSolicitud.idCiudadano = null;

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
  }

  onReadyInsumo(datos:any){    
    this.tramiteSolicitud.insumoEntregado = datos;

    swal({
      title: 'Perfecto!',
      text: 'Sustrato asignado con exito.',
      type: 'success',
      confirmButtonText: 'Aceptar'
    });
  }

  onEnviar(){
    let token = this._LoginService.getToken();

    this.tramiteSolicitud.tramitesRealizados = this.tramitesRealizados;
    this.tramiteSolicitud.documentacionPendiente = this.documentacionPendiente;
    this.tramiteSolicitud.idFactura = this.factura.id;

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
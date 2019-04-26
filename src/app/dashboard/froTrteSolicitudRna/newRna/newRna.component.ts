import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { FroTrteSolicitudRna } from '../froTrteSolicitudRna.modelo';
import { FroTrteSolicitudService } from '../../../services/froTrteSolicitud.service';
import { FroFacTramiteService } from '../../../services/froFacTramite.service';
import { FroFacturaService } from '../../../services/froFactura.service';
import { UserCiudadanoService } from '../../../services/userCiudadano.service';
import { VhloAcreedorService } from '../../../services/vhloAcreedor.service';
import { VhloPropietarioService } from '../../../services/vhloPropietario.service';
import { VhloVehiculoService } from '../../../services/vhloVehiculo.service';
import { LoginService } from '../../../services/login.service';
import { environment } from 'environments/environment';
import swal from 'sweetalert2';


@Component({
  selector: 'app-new',
  templateUrl: './newRna.component.html'
})
export class NewRnaComponent implements OnInit {
  @Output() ready = new EventEmitter<any>();
  public tramiteSolicitud: FroTrteSolicitudRna;
  public errorMessage;

  public apiUrl = environment.apiUrl + 'financiero/frotrtesolicitud';

  public numeroFactura: any;

  public factura: any = null;
  public vehiculo: any = null;
  public propietarios: any = null;
  public acreedores: any = null;
  public ciudadano: any = false;

  public vehiculoFiltro: any;

  public tramitesFactura: any = null;
  public tramiteFactura: any = null;
  public tramiteSelected: any = null;
  public facturas: any;

  public confirmarSolicitante = false;
  public requiereSustrato = false;
  public requiereRunt = false;

  public tramites:any;
  public certificadoTradicion = false;
  public fromApoderado = false;
  public identificacionApoderado = false;
  public apoderado: any = null;
  public placa: any = null;

  public tramitesRealizados: any = [];

  constructor(
    private _TramiteSolicitudService: FroTrteSolicitudService,
    private _TramiteFacturaService: FroFacTramiteService,
    private _FacturaService: FroFacturaService,
    private _CiudadanoService: UserCiudadanoService,
    private _AcreedorService: VhloAcreedorService,
    private _PropietarioService: VhloPropietarioService,
    private _VehiculoService: VhloVehiculoService,
    private _LoginService: LoginService,
  ) { }

  ngOnInit() {
    this.tramiteSolicitud = new FroTrteSolicitudRna(null, null, null, null, null, null, null);
  }

  onCancelar() {
    this.ready.emit(true);
  }

  onSearchVehiculo() {
    swal({
      title: 'Buscando vehiculo!',
      text: 'Solo tardara unos segundos por favor espere.',
      onOpen: () => {
        swal.showLoading()
      }
    });

    let token = this._LoginService.getToken();

    this._VehiculoService.searchByPlaca({'numero': this.placa }, token).subscribe(
      response => {
        if (response.code == 200) {
          let vehiculo = response.data;

          this._AcreedorService.searchByVehiculo({ 'idVehiculo': vehiculo.id }, token).subscribe(
            response => {
              if (response.code == 200) {
                swal({
                  title: 'Vehiculo con prenda',
                  text: "¿Esta seguro que desea continuar?",
                  type: 'warning',
                  showCancelButton: true,
                  confirmButtonColor: '#15d4be',
                  cancelButtonColor: '#ff6262',
                  confirmButtonText: 'Confirmar',
                  cancelButtonText: 'Cancelar'
                }).then((result) => {
                  if (result.value) {
                    this.vehiculo = vehiculo;
                    this.tramiteSolicitud.idVehiculo = this.vehiculo.id;

                    this.onSearchPropietarios();
                  }else{
                    this.vehiculo = null;
                    this.tramiteSolicitud.idVehiculo = null;
                  }
                });
              } else {
                this.vehiculo = vehiculo;
                this.tramiteSolicitud.idVehiculo = this.vehiculo.id;

                this.onSearchPropietarios();
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
          this.vehiculo = null;
          this.tramiteSolicitud.idVehiculo = null;

          swal({
            title: 'Atención!',
            text: response.message,
            type: 'warning',
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

  onSearchPropietarios(){
    swal({
      title: 'Buscando propietarios!',
      text: 'Solo tardara unos segundos por favor espere.',
      onOpen: () => {
        swal.showLoading()
      }
    });

    let token = this._LoginService.getToken();

    this._PropietarioService.searchByVehiculo({ 'idVehiculo': this.vehiculo.id }, token).subscribe(
      response => {
        if (response.code == 200) {
          this.propietarios = response.data;

          swal({
            title: 'Perfecto!',
            text: response.message,
            type: 'success',
            confirmButtonText: 'Aceptar'
          });
        } else {
          this.propietarios = null;

          swal({
            title: 'Atención!',
            text: response.message,
            type: 'warning',
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

  onSearchFactura() {
    swal({
      title: 'Buscando Factura!',
      text: 'Solo tardará unos segundos, por favor espere.',
      onOpen: () => {
        swal.showLoading()
      }
    });

    if (this.numeroFactura) {
      let token = this._LoginService.getToken();

      this._FacturaService.searchByNumero({ 'numeroFactura': this.numeroFactura }, token).subscribe(
        response => {
          if (response.code == 200) {
            this.factura = response.data;

            this._TramiteFacturaService.searchTramitesByFactura({ 'idFactura': this.factura.id, 'idVehiculo': this.vehiculo.id }, token).subscribe(
              response => {
                if (response.code == 200) {
                  this.tramitesFactura = response.data.tramitesFactura;
                  this.requiereSustrato = response.data.sustrato;
                  this.requiereRunt = response.data.numeroRunt;

                  if (response.data.propietarios) {
                    this.propietarios = response.data.propietarios;
                  } else {
                    this.propietarios = null;
                  }                 

                  swal.close();
                } else {
                  this.tramitesFactura = null;
                  this.propietarios = null
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
          } else {
            this.factura = null;
            this.tramitesFactura = null;
            this.propietarios = null;
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
    }else{
      swal({
        title: 'Error!',
        text: 'Debe digitar un número de factura.',
        type: 'error',
        confirmButtonText: 'Aceptar'
      });
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

  onEnviar() {
    let token = this._LoginService.getToken();

    this.tramiteSolicitud.tramitesRealizados = this.tramitesRealizados;

    this._TramiteSolicitudService.register(this.tramiteSolicitud, token).subscribe(
			response => {
        if(response.code == 200){
          this.factura = response.data.factura;
          this.certificadoTradicion = response.data.certificadoTradicion;

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

  readyTramite(datos:any){
    this.tramitesRealizados.push(
      {
        'documentacion': datos.documentacion,
        'observacion': datos.observacion,
        'foraneas': datos.foraneas,
        'resumen': datos.resumen,
        'idTramiteFactura': datos.idTramiteFactura,
      }
    );

    let token = this._LoginService.getToken();

    this._TramiteFacturaService.show({ 'id': datos.idTramiteFactura }, token).subscribe(
      response => {
        if (response.code == 200) {
          let tramiteFactura = { 'value': response.data.id, 'label': response.data.precio.nombre };
          this.tramitesFactura = this.tramitesFactura.filter(h => h !== tramiteFactura);
          console.log(this.tramitesFactura);
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
    );

    swal({
      title: 'Perfecto!',
      text: 'Trámite realizado con exito.',
      type: 'success',
      confirmButtonText: 'Aceptar'
    });
  }

  /*readyTramite(datos: any) {
    this.tramiteSolicitud.datos = datos;
    this.tramiteSolicitud.idVehiculo = this.vehiculo.id;

    if (this.apoderado) {
      this.tramiteSolicitud.idSolicitante = this.apoderado.id;
    }

    let token = this._LoginService.getToken();

    this._TramiteSolicitudService.register(this.tramiteSolicitud, token).subscribe(
      response => {
        if (response.status == 'success') {
          swal({
            title: 'Perfecto!',
            text: 'Registro exitoso!',
            type: 'success',
            confirmButtonText: 'Aceptar'
          });

          this.onChangedTramiteFactura(response.data.tramiteFactura.id);
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
      });
  }*/

  cancelarTramite() {
    this.tramiteSelected = null;
  }

  finalizarSolicitud() {

    let token = this._LoginService.getToken();
    this.tramites = '';
    this.tramitesFactura.forEach(tramiteFactura => {
      this.tramites = this.tramites + tramiteFactura.tramitePrecio.nombre + '<br>'
    });

    var html = 'Se va a enviar la siguiente solicitud:<br>' +
      'Factura: <b>' + this.factura.numero + '</b><br>' +
      'Vehiculo: <b>' + this.vehiculo.placa.numero + '</b><br>' +
      'Solicitante: <b>' + this.ciudadano.usuario.identificacion + '</b><hr>' +
      'Tramites:<br>' +
      this.tramites
    swal({
      title: 'Resumen',
      type: 'warning',
      html: html,
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
        this.factura.estado = 'Finalizada';
        this.factura.idSolicitante = this.tramiteSolicitud.idSolicitante;  
        this.factura.idApoderado = this.apoderado.id;  
        console.log(this.factura);
        this.factura.sedeOperativaId = this.factura.sedeOperativa.id; 

        this._FacturaService.edit(this.factura, token).subscribe(
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
    })
  }

  onFormApoderado() {
    this.fromApoderado = true;
    // if (this.apoderado) {
    //   this.tramiteSolicitud.solicitanteId = this.apoderado.id;
    // }
  }

  onAddApoderado() {
    this.fromApoderado = false;
    if (this.apoderado) {
      swal({
        title: 'Perfecto!',
        text: 'Apoderado agregado',
        type: 'success',
        confirmButtonText: 'Aceptar'
      });

      this.tramiteSolicitud.idSolicitante = this.apoderado.id;
    }
  }

  onSearchApoderado() {
    swal({
      title: 'Buscando apoderado!',
      text: 'Solo tardara unos segundos por favor espere.',
      onOpen: () => {
        swal.showLoading()
      }
    });

    let token = this._LoginService.getToken();

    let datos = {
      'identificacion': this.identificacionApoderado,
      'idTipoIdentificacion': 1,
    }

    this._CiudadanoService.searchByIdentificacion(datos, token).subscribe(
      response => {
        if (response.code == 200) {
          if (response.data.ciudadano) {
            this.apoderado = response.data.ciudadano;

            swal({
              title: 'Perfecto!',
              text: response.message,
              type: 'success',
              confirmButtonText: 'Aceptar'
            });
          }
        } else {
          this.apoderado = null;

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
      });
  }

  onCloseApoderado() {
    this.fromApoderado = false;
    this.apoderado = null;
  }

  onConfirmarSolicitante() {
    swal({
      title: '¿Estás seguro?',
      text: "¡Si confirma el solicitante ya no podrá editarlo!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#15d4be',
      cancelButtonColor: '#ff6262',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.confirmarSolicitante = true;
      }
    })
  }
 
}
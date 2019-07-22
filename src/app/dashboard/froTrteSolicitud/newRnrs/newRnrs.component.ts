import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { FroTrteSolicitud } from '../froTrteSolicitud.modelo';
import { FroTrteSolicitudService } from '../../../services/froTrteSolicitud.service';
import { FroFacTramiteService } from '../../../services/froFacTramite.service';
import { FroFacturaService } from '../../../services/froFactura.service';
import { UserCiudadanoService } from '../../../services/userCiudadano.service';
import { VhloRestriccionService } from '../../../services/vhloRestriccion.service';
import { VhloPropietarioService } from '../../../services/vhloPropietario.service';
import { PnalFuncionarioService } from '../../../services/pnalFuncionario.service';
import { VhloVehiculoService } from '../../../services/vhloVehiculo.service';
import { LoginService } from '../../../services/login.service';
import { environment } from 'environments/environment';
import swal from 'sweetalert2';

@Component({
  selector: 'app-new-rnrs',
  templateUrl: './newRnrs.component.html'
})

export class NewRnrsComponent implements OnInit {
  @Output() ready = new EventEmitter<any>();
  public tramiteSolicitud: FroTrteSolicitud;
  public errorMessage;

  public apiUrl = environment.apiUrl + 'financiero/frotrtesolicitud';

  public numeroFactura: any;

  public factura: any = null;
  public vehiculo: any = null;
  public propietarios: any = null;
  public acreedores: any = null;
  public ciudadano: any = false;
  public funcionario: any = null;

  public vehiculoFiltro: any;

  public tramitesFactura: any = null;
  public tramiteFactura: any = null;
  public idTramiteFactura: any = null;

  public confirmarSolicitante = false;
  
  public tramites:any;
  public tramiteMatriculaInicial:any = null;
  public certificadoTradicion = false;
  public identificacionApoderado: any = null;
  public identificacionCiudadano: any = null;
  public apoderado: any = null;
  public placa: any = null;
  
  public requiereSustrato = false;
  public requiereRunt = false;
  public tramitesRealizados: any = [];
  public documentacionPendiente: any = [];
  public ciudadanos: any = [];
  public restricciones: any = null;
  
  public formApoderado = false;
  public formNewCiudadano: any = false;
  
  constructor(
    private _TramiteSolicitudService: FroTrteSolicitudService,
    private _TramiteFacturaService: FroFacTramiteService,
    private _FacturaService: FroFacturaService,
    private _CiudadanoService: UserCiudadanoService,
    private _RestriccionService: VhloRestriccionService,
    private _PropietarioService: VhloPropietarioService,
    private _VehiculoService: VhloVehiculoService,
    private _FuncionarioService: PnalFuncionarioService,
    private _LoginService: LoginService,
  ) { }

  ngOnInit() {
    swal({
      title: 'Cargando información!',
      text: 'Solo tardará unos segundos, por favor espere.',
      onOpen: () => {
        swal.showLoading()
      }
    });

    this.tramiteSolicitud = new FroTrteSolicitud(null, null, null, null, null, null, null, null, null, null, null, null, null, null);

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

    //Validar si se requiere validaciones sobre el vehiculo en particular
    /* this._TramiteSolicitudService.validations(this.datos, token).subscribe(
      response => {
        if (response.code == 200) {
          
        }else{
          swal({
            title: 'Error!',
            text: response.message,
            type: 'error',
            confirmButtonText: 'Aceptar'
          });
        }
      },
      error => {
          this.errorMessage = <any>error;

          if (this.errorMessage != null) {
              console.log(this.errorMessage);
              alert('Error en la petición');
          }
      }
    );*/

    this._VehiculoService.searchByPlaca({'numero': this.placa }, token).subscribe(
      response => {
        if (response.code == 200) {
          this.vehiculo = response.data;
          this.tramiteSolicitud.idVehiculo = this.vehiculo.id;

          this._RestriccionService.searchByVehiculo({ 'idVehiculo': this.vehiculo.id }, token).subscribe(
            response => {
              if (response.code == 200) {
                this.restricciones = response.data;

                swal({
                  title: 'Vehiculo con '+response.message,
                  text: "¿Esta seguro que desea continuar?",
                  type: 'warning',
                  showCancelButton: true,
                  confirmButtonColor: '#15d4be',
                  cancelButtonColor: '#ff6262',
                  confirmButtonText: 'Confirmar',
                  cancelButtonText: 'Cancelar'
                }).then((result) => {
                  if (result.value) {
                    this.onSearchTramites();
                  }else{
                    this.vehiculo = null;
                    this.tramiteSolicitud.idVehiculo = null;
                  }
                });
              } else if(response.code == 401){                
                this.onSearchTramites();
              }else{
                this.restricciones = null;

                swal({
                  title: response.title,
                  text: response.message,
                  type: response.status,
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
        } else{
          this.vehiculo = null;
          this.tramiteSolicitud.idVehiculo = null;

          swal({
            title: response.title,
            text: response.message,
            type: response.status,
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

  onSearchTramites(){
    swal({
      title: 'Cargando tramites!',
      text: 'Solo tardara unos segundos por favor espere.',
      onOpen: () => {
        swal.showLoading()
      }
    });

    let token = this._LoginService.getToken();

    this._TramiteFacturaService.searchTramitesByFactura({ 'idFactura': this.factura.id, 'idVehiculo': this.vehiculo.id }, token).subscribe(
      response => {
        if (response.code == 200) {
          this.tramitesFactura = response.data.tramitesFactura;
          this.requiereSustrato = response.data.sustrato;
          this.requiereRunt = response.data.numeroRunt;

          if (response.data.propietarios) {
            this.propietarios = response.data.propietarios;
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
            this.tramiteSolicitud.idFactura = this.factura.id;

            swal.close();
          } else {
            if (response.data) {
              this.factura = response.data;
            }
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

  onComplete() {
    swal({
      title: 'Activando Factura!',
      text: 'Solo tardará unos segundos, por favor espere.',
      onOpen: () => {
        swal.showLoading()
      }
    });
    
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

  onEnviar() {
    swal({
      title: 'Guardando información!',
      text: 'Solo tardará unos segundos, por favor espere.',
      onOpen: () => {
        swal.showLoading()
      }
    });

    let token = this._LoginService.getToken();

    this.tramiteSolicitud.tramitesRealizados = this.tramitesRealizados;
    this.tramiteSolicitud.documentacionPendiente = this.documentacionPendiente;
    this.tramiteSolicitud.idFactura = this.factura.id;

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

  /*finalizarSolicitud() {
    let token = this._LoginService.getToken();
    this.tramites = '';
    this.tramitesFactura.forEach(tramiteFactura => {
      this.tramites = this.tramites + tramiteFactura.tramitePrecio.nombre + '<br>'
    });

    var html = 'Se va a enviar la siguiente solicitud:<br>' +
      'Factura: <b>' + this.factura.numero + '</b><br>' +
      'Vehiculo: <b>' + this.vehiculo.placa.numero + '</b><br>' +
      'Solicitante(s): <b>' + this.ciudadanos + '</b><hr>' +
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
        this.factura.estado = 'FINALIZADA';
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
  }*/

  onFormApoderado() {
    this.formApoderado = true;
  }

  onAddApoderado() {
    this.formApoderado = false;
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
      }
    );
  }

  onCloseApoderado() {
    this.formApoderado = false;
    this.apoderado = null;
  }

  onSearchCiudadano() {
    swal({
      title: 'Buscando apoderado!',
      text: 'Solo tardara unos segundos por favor espere.',
      onOpen: () => {
        swal.showLoading()
      }
    });

    let token = this._LoginService.getToken();

    let datos = {
      'identificacion': this.identificacionCiudadano,
      'idTipoIdentificacion': 1,
    }

    this._CiudadanoService.searchByIdentificacion(datos, token).subscribe(
      response => {
        if (response.code == 200) {
          if (response.data.ciudadano) {
            this.ciudadanos.push(response.data.ciudadano);

            swal({
              title: 'Perfecto!',
              text: response.message,
              type: 'success',
              confirmButtonText: 'Aceptar'
            });
          }
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
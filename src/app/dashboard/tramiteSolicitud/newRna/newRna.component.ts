import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { TramiteSolicitud } from '../tramiteSolicitud.modelo';
import { Vehiculo } from '../../vehiculo/vehiculo.modelo';
import { TramiteSolicitudService } from '../../../services/tramiteSolicitud.service';
import { TramiteFacturaService } from '../../../services/tramiteFactura.service';
import { CiudadanoVehiculoService } from '../../../services/ciudadanoVehiculo.service';
import { UserCiudadanoService } from '../../../services/userCiudadano.service';
import { FacturaService } from '../../../services/factura.service';
import { LoginService } from '../../../services/login.service';
import { VehiculoService } from '../../../services/vehiculo.service';
import swal from 'sweetalert2';


@Component({
  selector: 'app-new',
  templateUrl: './newRna.component.html'
})
export class NewRnaComponent implements OnInit {
  @Output() ready = new EventEmitter<any>();
  public tramiteSolicitud: TramiteSolicitud;
  public vehiculo: Vehiculo;
  public errorMessage;
  public tramitesFactura: any = null;
  public tramiteFacturaSelected: any;
  public facturaSelected: any;
  public facturas: any;
  public factura: any;
  public isPagada = false;
  public tramiteSelected: any;
  public mensaje = '';
  public isError = false;
  public ciudadanosVehiculo = false;
  public searchByIdentificacion = false;
  public isEmpresa = false;
  public ciudadano: any = false;
  public vehiculoSuccess = false;
  public tipoError = 200;
  public error = false;
  public confirmarSolicitante = false;
  public msj = '';
  public tramites = '';
  public tramitePreasignacion = false;
  public tramiteMatriculaInicial = false;
  public tramite = false;
  public sustrato = false;
  public isTramites: boolean = true;
  public isMatricula: boolean = false;
  public frmApoderado = false;
  public identificacionApoderado = false;
  public apoderado: any = null;

  public importacion: any = 'No';
  public cantidadSustrato = 1;
  public moduloId = 1;
  public resumen = {}; public datos = {
    'moduloId': null,
    'idFactura': null,
    'vehiculoId': null,
  };
  constructor(
    private _TramiteSolicitudService: TramiteSolicitudService,
    private _loginService: LoginService,
    private _tramiteFacturaService: TramiteFacturaService,
    private _facturaService: FacturaService,
    private _ciudadanoVehiculoService: CiudadanoVehiculoService,
    private _CiudadanoService: UserCiudadanoService,
    private _VehiculoService: VehiculoService,
  ) { }

  ngOnInit() {
    this.vehiculo = new Vehiculo(null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
    this.tramiteSolicitud = new TramiteSolicitud(null, null, null, null, null, null, null, null, null);
    /* swal({
      title: '¿El vehiculo va a hacer un tramite de Importación Temporal?',
      type: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        this.importacion = 'Si';
      } else if (result.dismiss === swal.DismissReason.cancel) {
        this.importacion = 'No';
      }
    }) */

  }
  onCancelar() {
    this.ready.emit(true);
  }
  onEnviar() {
    let token = this._loginService.getToken();

    this.tramiteSolicitud.tramiteFacturaId = this.tramiteFacturaSelected;

    this._TramiteSolicitudService.register(this.tramiteSolicitud, token).subscribe(
      response => {
        if (response.status == 'success') {
          this.ready.emit(true);
          swal({
            title: 'Perfecto!',
            text: 'Registro exitoso!',
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

  onSearchFactura(id) {
    swal({
      title: 'Buscando Factura!',
      text: 'Solo tardará unos segundos, por favor espere.',
      onOpen: () => {
        swal.showLoading()
      }
    });
    if (id) {
      this.datos.idFactura = id;
      this.datos.moduloId = this.moduloId;
      this.datos.vehiculoId = this.vehiculo.id;

      this._tramiteFacturaService.getTramiteShowFactura(this.datos).subscribe(
        response => {

          this.isMatricula = false;
          let active = true;
          let token = this._loginService.getToken();

          this.tramitesFactura = response;
          this.tramitesFactura.forEach(tramiteFactura => {
            if (tramiteFactura.realizado == 0) {
              active = false;
            } else {
              //consultar tramite solicitud con el id de tramite factura
              //hacer un push array para extraer todas las solicitudes en estado realizado
            }

            if (tramiteFactura.tramitePrecio.tramite.sustrato) {
              this.sustrato = true;
            }

            if (tramiteFactura.tramitePrecio.tramite.formulario == 'rna-matriculainicial') {
              this.isMatricula = true;
            } else {
              this.isMatricula = false;
            }
            console.log(tramiteFactura.tramitePrecio.tramite.formulario);
          });

          if (active) {
            this.isTramites = false;
          }

          swal.close();
          if (this.tramiteSolicitud.solicitanteId) {
            this._ciudadanoVehiculoService.showCiudadanoVehiculo(token, this.tramiteSolicitud.solicitanteId).subscribe(
              responseCiudadano => {
                if (responseCiudadano.status == 'success') {
                  this.ciudadano = responseCiudadano.data.ciudadano;
                  this.factura = response[0].factura;
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
            if (this.isMatricula) {
              this.factura = response[0].factura;
            } /* else {
              if (this.importacion == "Si") {
                this.factura = response[0].factura;
              } */
            else {
              this.factura = false;
              
              swal({
                title: 'Error!',
                text: 'Seleccionar solicitante',
                type: 'error',
                confirmButtonText: 'Aceptar'
              });
            }
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

  onKeyValidateVehiculo() {
    this.msj = '';
    this.mensaje = '';
    swal({
      title: 'Buscando Vehiculo!',
      text: 'Solo tardará unos segundos, por favor espere.',
      onOpen: () => {
        swal.showLoading()
      }
    }).then((result) => {
      if (
        // Read more about handling dismissals
        result.dismiss === swal.DismissReason.timer
      ) {
      }
    })
    let token = this._loginService.getToken();

    this._VehiculoService.showVehiculoRna(this.tramiteSolicitud.vehiculoId, token).subscribe(
      response => {
        console.log(response);
        if (response.status == 'success') {
          this.searchByIdentificacion = true
          this.ciudadanosVehiculo = response.propietarios;
          this.vehiculo = response.vehiculo;
          this.vehiculoSuccess = true;
          this.isMatricula = true;
          this.msj = 'vehiculo encontrado';
          this.error = false;
          this.isError = false;
          swal.close();
        } else {
          this.vehiculoSuccess = false;
          this.msj = 'vehiculo no encontrado encontrado';
          this.error = true;
          this.isError = true;
          swal.close();
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

  // this._ciudadanoVehiculoService.showCiudadanoVehiculoId(token,this.tramiteSolicitud.vehiculoId).subscribe(
  //   response => {
  //     this.ciudadanosVehiculo = response.data;
  //     if (response.status == 'error' ) { 
  //       this.searchByIdentificacion = false;
  //       if(response.code == 401){
  //         this.vehiculoSuccess=false;
  //         this.msj= response.msj;
  //         this.isError = true;
  //         this.error = true;
  //         this.tipoError = response.code; 
  //         swal.close();
  //       }else{
  //         this.vehiculo = response.data;
  //         this.vehiculoSuccess=true;
  //         this.isMatricula = true;
  //         this.msj ='vehiculo encontrado';
  //         this.error = false;
  //         this.isError = false;
  //         swal.close();
  //       }
  //     }else{
  //       swal.close();
  //       this.vehiculo = response.data[0].vehiculo;
  //       // se busca las faturas si el vehiculo fue encontrado
  //       this.vehiculoSuccess = true;
  //             this.msj ='vehiculo encontrado';
  //             this.error = false;
  //             this.isError = false;
  //             swal.close();
  //             response.data.forEach(element => {
  //               if (element.ciudadano) {
  //                 this.searchByIdentificacion = true;
  //               }
  //               if(element.empresa){
  //                 this.isEmpresa = true;
  //               }
  //             });
  //           }
  //         error => { 
  //             this.errorMessage = <any>error;
  //             if(this.errorMessage != null){
  //               console.log(this.errorMessage);
  //               alert("Error en la petición"); 
  //             }
  //           }
  //       });
  //     }

  readyTramite(datos: any) {

    this.tramiteSolicitud.datos = datos;
    this.tramiteSolicitud.vehiculoId = this.vehiculo.id;
    if (this.apoderado) {
      this.tramiteSolicitud.ciudadanoId = this.apoderado.id;
    }

    let token = this._loginService.getToken();
    this._TramiteSolicitudService.register(this.tramiteSolicitud, token).subscribe(
      response => {
        if (response.status == 'success') {
          swal({
            title: 'Perfecto!',
            text: 'Registro exitoso!',
            type: 'success',
            confirmButtonText: 'Aceptar'
          })
          this.error = false;
        } else {
          swal({
            title: 'Error!',
            text: 'El tramiteSolicitud ' + +' ya se encuentra registrado',
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

  cancelarTramite() {
    this.tramiteSelected = false;
    this.error = false;
  }

  finalizarSolicitud() {

    let token = this._loginService.getToken();
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
        this.factura.idSolicitante = this.tramiteSolicitud.solicitanteId;  
        this.factura.idApoderado = this.apoderado.id;  
        console.log(this.factura);
        this.factura.sedeOperativaId = this.factura.sedeOperativa.id; 
        this._facturaService.editFactura(this.factura, token).subscribe(
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

  agregarApoderado() {
    this.frmApoderado = true;
    // if (this.apoderado) {
    //   this.tramiteSolicitud.solicitanteId = this.apoderado.id;
    // }
  }

  btnNewApoderado() {
    this.frmApoderado = false;
    // if (this.apoderado) {
    //   this.tramiteSolicitud.solicitanteId = this.apoderado.id;
    // }
  }

  onSearchApoderado() {
    let token = this._loginService.getToken();

    let identificacion = {
      'numeroIdentificacion': this.identificacionApoderado,
    };

    this._CiudadanoService.searchByIdentificacion(identificacion, token).subscribe(
      response => {
        if (response.status == 'success') {
          this.apoderado = response.data;
        } else {
          this.apoderado = null;
          swal({
              title: 'Error!',
              text: 'No se ha registrado un apoderado.',
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
    this.frmApoderado = false;
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
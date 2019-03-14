import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { FroTrteSolicitudRna } from '../froTrteSolicitudRna.modelo';
import { Vehiculo } from '../../vehiculo/vehiculo.modelo';
import { FroTrteSolicitudService } from '../../../services/froTrteSolicitud.service';
import { FroFacTramiteService } from '../../../services/froFacTramite.service';
import { FroFacturaService } from '../../../services/froFactura.service';
import { UserCiudadanoService } from '../../../services/userCiudadano.service';
import { VhloPropietarioService } from '../../../services/vhloPropietario.service';
import { VhloVehiculoService } from '../../../services/vhloVehiculo.service';
import { LoginService } from '../../../services/login.service';
import swal from 'sweetalert2';


@Component({
  selector: 'app-new',
  templateUrl: './newRna.component.html'
})
export class NewRnaComponent implements OnInit {
  @Output() ready = new EventEmitter<any>();
  public tramiteSolicitud: FroTrteSolicitudRna;
  //public vehiculo: Vehiculo;
  public errorMessage;

  public numeroFactura: any;

  public factura: any = null;
  public vehiculo: any = null;
  public propietarios: any = null;
  public ciudadano: any = false;

  public vehiculoFiltro: any;

  public tramitesFactura: any = null;
  public tramiteFacturaSelected: any = null;
  public facturas: any;
  public tramiteSelected: any = null;

  public isEmpresa = false;
  public confirmarSolicitante = false;
  public sustrato = false;

  public tramites = '';
  public tramitePreasignacion = false;
  public tramiteMatriculaInicial = false;
  public tramite = false;
  public isTramites: boolean = true;
  public isMatricula: boolean = false;
  public frmApoderado = false;
  public identificacionApoderado = false;
  public apoderado: any = null;
  public importacion: any = 'No';
  public cantidadSustrato = 1;
  public moduloId = 1;


  constructor(
    private _TramiteSolicitudService: FroTrteSolicitudService,
    private _TramiteFacturaService: FroFacTramiteService,
    private _FacturaService: FroFacturaService,
    private _CiudadanoService: UserCiudadanoService,
    private _PropietarioService: VhloPropietarioService,
    private _VehiculoService: VhloVehiculoService,
    private _LoginService: LoginService,
  ) { }

  ngOnInit() {
    this.tramiteSolicitud = new FroTrteSolicitudRna(null, true, null, null, null, null, null, null, null);
    //this.vehiculo = new Vehiculo(null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
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

  onSearchVehiculo() {
    swal({
      title: 'Buscando vehiculo!',
      text: 'Solo tardara unos segundos por favor espere.',
      onOpen: () => {
        swal.showLoading()
      }
    });

    let token = this._LoginService.getToken();

    this._VehiculoService.searchByFilter({ 'filtro': this.vehiculoFiltro }, token).subscribe(
      response => {
        if (response.code == 200) {
          this.vehiculo = response.data;
          this.tramiteSolicitud.idVehiculo = this.vehiculo.id;

          this._PropietarioService.searchByVehiculo({ 'idVehiculo': this.vehiculo.id }, token).subscribe(
            response => {
              if (response.code == 200) {
                this.propietarios = response.data;
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

    /*this._VehiculoService.showVehiculoRna(this.tramiteSolicitud.idVehiculo, token).subscribe(
      response => {
        console.log(response);
        if (response.status == 'success') {
          this.vehiculo = response.vehiculo;
          this.searchByIdentificacion = true
          this.ciudadanosVehiculo = response.propietarios;
          this.isMatricula = true;
          
          swal.close();
        } else {
          this.vehiculo = null;

          swal({
            title: 'Error!',
            text: response.message,
            type: 'error',
            confirmButtonText: 'Aceptar'
          });
          
          swal.close();
        }
        error => {
          this.errorMessage = <any>error;
          if (this.errorMessage != null) {
            console.log(this.errorMessage);
            alert("Error en la petición");
          }
        }
      });*/
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
                  this.sustrato = response.data.sustrato;

                  if (response.data.propietarios) {
                    this.propietarios = response.data.propietarios;
                  } else {
                    this.propietarios = null;
                  }                 

                  swal.close();
                } else {
                  this.tramitesFactura = null;
                  this.propietarios = null

                  swal({
                    title: 'Error!',
                    text: response.message,
                    type: 'error',
                    confirmButtonText: 'Aceptar'
                  });
                }

                /*this.isMatricula = false;
                let active = true;
                let token = this._LoginService.getToken();
      
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
                
                if (this.tramiteSolicitud.idSolicitante) {
      
                  this._PropietarioService.searchByCiudadano({ 'idCiudadano': this.tramiteSolicitud.idSolicitante }, token).subscribe(
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
                    } 
                  else {
                    this.factura = false;
                    
                    swal({
                      title: 'Error!',
                      text: 'Seleccionar solicitante',
                      type: 'error',
                      confirmButtonText: 'Aceptar'
                    });
                  }
                }*/
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
            this.sustrato = false;

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

  onChangedTramiteFactura(tramiteFactura) {
    console.log(tramiteFactura);
    
    if (tramiteFactura) {
      this.tramiteFacturaSelected = tramiteFactura;
      
    }
  }

  onEnviar() {
    let token = this._LoginService.getToken();

    this.tramiteSolicitud.idTramiteFactura = this.tramiteFacturaSelected;

    this._TramiteSolicitudService.register(this.tramiteSolicitud, token).subscribe(
      response => {
        if (response.status == 'success') {
          this.ready.emit(true);

          swal({
            title: 'Perfecto!',
            text: 'Registro exitoso!',
            type: 'success',
            confirmButtonText: 'Aceptar'
          });
        } else {
          swal({
            title: 'Error!',
            text: 'El tramiteSolicitud ' + +' ya se encuentra registrada',
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

  // this._PropietarioService.showCiudadanoVehiculoId(token,this.tramiteSolicitud.vehiculoId).subscribe(
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
    this.tramiteSolicitud.idVehiculo = this.vehiculo.id;
    if (this.apoderado) {
      this.tramiteSolicitud.idCiudadano = this.apoderado.id;
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
        } else {
          swal({
            title: 'Error!',
            text: 'El tramiteSolicitud ' + +' ya se encuentra registrado',
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

  onAddApoderado() {
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
    let token = this._LoginService.getToken();

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
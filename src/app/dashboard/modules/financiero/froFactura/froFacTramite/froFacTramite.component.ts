import { Component, OnInit, AfterViewInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FroFacTramite } from './froFacTramite.modelo';
import { FroFacturaService } from '../../../../../services/froFactura.service';
import { FroTrtePrecioService } from '../../../../../services/froTrtePrecio.service';
import { FroFacTramiteService } from '../../../../../services/froFacTramite.service';
import { FroTrteSolicitudService } from '../../../../../services/froTrteSolicitud.service';
import { PnalFuncionarioService } from '../../../../../services/pnalFuncionario.service';
import { CfgModuloService } from '../../../../../services/cfgModulo.service';
import { UserCfgTipoIdentificacionService } from '../../../../../services/userCfgTipoIdentificacion.service';
import { UserCiudadanoService } from '../../../../../services/userCiudadano.service';
import { VhloPropietarioService } from '../../../../../services/vhloPropietario.service';
import { VhloVehiculoService } from '../../../../../services/vhloVehiculo.service';
import { VhloValorService } from '../../../../../services/vholCfgValor.service';
import { LoginService } from '../../../../../services/login.service';
import { environment } from 'environments/environment'
import swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-index',
  templateUrl: './froFacTramite.component.html',
  providers: [DatePipe]
})

export class FroFacTramiteComponent implements OnInit, AfterViewInit {
  public errorMessage;
  public factura: FroFacTramite;

  public organismosTransito: any;
  public modulos: any;
  public tiposIdentificacion: any;
  public tramitesPrecio: any = null;

  public funcionario: any = null;
  public modulo: any = null;
  public ciudadano: any = null;
  public empresa: any = null;
  public vehiculo: any = null;
  public propietarios: any = [];
  public valorRetefuente: any = 0;
  public tramitesValor:any=[]; 

  public tipoIdentificacionSelected: any = null;
  public identificacion: any;
  public vehiculoFiltro: any;
  public tramitePrecioSelected: any = null;
  public tramitePrecio: any = null;
  public tramitesPrecioArray: any = []; 
  public municipio: any = null;
  public fechaCreacion: any = null;
  public fechaVencimiento: any = null;
  public facturaNumero: any = null;
  public date: any = new Date();
  
  public formIndex: any;
  public formNew: any;
  public formSearch: any;
  public formNewCiudadano: any;

  public table: any = null;
  public idVehiculoValor: any = null;
  public valorVehiculo: any = null;
  
  public tramite = false;
  public idTramite: any = null;

  public propietariosVehiculoRetefuente:any=[]; 
  public valorRetefuenteUnitario:any = 0;

  public apiUrl = environment.apiUrl;

  constructor(
    private _FuncionarioService: PnalFuncionarioService,
    private _FacturaService: FroFacturaService,
    private _ModuloService: CfgModuloService,
    private _TipoIdentificacionService: UserCfgTipoIdentificacionService,
    private _CiudadanoService: UserCiudadanoService,
    private _PropietarioService: VhloPropietarioService,
    private _VehiculoService: VhloVehiculoService,
    private _TramitePrecioService: FroTrtePrecioService,
    private _FroTrteSolicitudService: FroTrteSolicitudService,
    private _VhloValorService: VhloValorService,
    private _FroTrtePrecioService: FroTrtePrecioService,
    private _LoginService: LoginService,
  ){}
    
  ngOnInit() {
    this.factura = new FroFacTramite(null, 0, null, null, null, null, null, null, null, null);

    this.onInitForms();

    swal({
      title: 'Cargando Datos!',
      text: 'Solo tardara unos segundos por favor espere.',
      onOpen: () => {
        swal.showLoading()
      }
    });

    let token = this._LoginService.getToken();

    let identity = this._LoginService.getIdentity();

    this._FuncionarioService.searchLogin({ 'identificacion': identity.identificacion }, token).subscribe(
      response => {
        if (response.code == 200) {
          this.funcionario = response.data;
          this.factura.idOrganismoTransito = this.funcionario.organismoTransito.id;

          this._ModuloService.select().subscribe(
            response => {
              this.modulos = response;
            },
            error => {
              this.errorMessage = <any>error;
      
              if (this.errorMessage != null) {
                console.log(this.errorMessage);
                alert("Error en la petición");
              }
            }
          );
      
          this._TipoIdentificacionService.select().subscribe(
            response => {
              this.tiposIdentificacion = response;
            },
            error => {
              this.errorMessage = <any>error;
      
              if (this.errorMessage != null) {
                console.log(this.errorMessage);
                alert('Error en la petición');
              }
            }
          );

          this.formNew = true;
        } else {
          swal({
            title: 'Error!',
            text: 'Su usuario no tiene autorización para realizar facturación!',
            type: 'error',
            confirmButtonText: 'Aceptar'
          });

          this.formNew = false;
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

  ngAfterViewInit(){
    swal.close();
  }

  onInitForms(){
    this.formIndex = false;
    this.formSearch = false;
    this.formNewCiudadano = false;
  }

  ready(isCreado:any){
    if(isCreado) {
      this.ngOnInit();
    }
  }

  onChangedModulo(e) {
    if(e){
      swal({
        title: 'Cargando trámites disponibles!',
        text: 'Solo tardara unos segundos por favor espere.',
        onOpen: () => {
          swal.showLoading()
        }
      });
  
      if (e) {
        let token = this._LoginService.getToken();
  
        this._ModuloService.show({ 'id': this.factura.idModulo }, token).subscribe(
          response => {
            this.modulo = response.data;
  
            swal.close();
          },
          error => {
            this.errorMessage = <any>error;
  
            if (this.errorMessage != null) {
              console.log(this.errorMessage);
              alert("Error en la petición");
            }
          }
        );
      }
    }
  }

  onInitTable() {
    if (this.table) {
      this.table.destroy();
    }

    this.table = $('#dataTables-example').DataTable({
      responsive: true,
      pageLength: 8,
      sPaginationType: 'full_numbers',
      oLanguage: {
        oPaginate: {
          sFirst: '<i class="fa fa-step-backward"></i>',
          sPrevious: '<i class="fa fa-chevron-left"></i>',
          sNext: '<i class="fa fa-chevron-right"></i>',
          sLast: '<i class="fa fa-step-forward"></i>'
        }
      }
    });
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
        text: 'El número de identificación no puede estar vacia.',
        type: 'error',
        confirmButtonText: 'Aceptar'
      });
    }else{
      let token = this._LoginService.getToken();
  
      let datos = {
        'idTipoIdentificacion': this.tipoIdentificacionSelected,
        'identificacion': this.identificacion,
      }
  
      this._CiudadanoService.searchByIdentificacion(datos, token).subscribe(
        response => {
          if (response.code == 200) {
            if (response.data.ciudadano) {
              this.ciudadano = response.data.ciudadano;
              this.factura.idCiudadano = this.ciudadano.id;

              if (this.factura.idModulo == 1) {
                this.onLoadTramites();
              }

              swal({
                title: 'Perfecto!',
                text: response.message,
                type: 'success',
                confirmButtonText: 'Aceptar'
              });
            }else{
              this.ciudadano = null;
              this.factura.idCiudadano = null;
              this.formNewCiudadano = true;

              swal({
                title: 'Error!',
                text: response.message,
                type: 'error',
                confirmButtonText: 'Aceptar'
              });
            }
          } else {
            this.ciudadano = null;
            this.factura.idCiudadano = null;
            this.formNewCiudadano = true;
  
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

  onSearchVehiculo() {
    swal({
      title: 'Buscando vehiculo!',
      text: 'Solo tardara unos segundos por favor espere.',
      onOpen: () => {
        swal.showLoading()
      }
    });
    let token = this._LoginService.getToken();

    if (this.modulo.id == 6) {
      this._VehiculoService.searchByPlaca({ 'numero': this.vehiculoFiltro }, token).subscribe(
        response => {
          if (response.code == 200) {
            this.vehiculo = response.data;
            this.onLoadTramites();

            this.factura.idVehiculo = this.vehiculo.id;

            swal.close();
            } else {
              this.vehiculo = null;
              this.factura.idVehiculo = null;
    
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
        this._VehiculoService.searchByPlaca({ 'numero': this.vehiculoFiltro }, token).subscribe(
          response => {
            if (response.code == 200) {
              this.vehiculo = response.data;
              this.factura.idVehiculo = this.vehiculo.id;
              
              this.onLoadTramites();
    
              this._PropietarioService.searchByVehiculo({ 'idVehiculo':this.vehiculo.id }, token).subscribe(
                response => {
                  if (response.code == 200) {
                    this.propietarios = response.data;
                                    
                    swal.close();
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
              this.factura.idVehiculo = null;
    
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
  }

  onLoadTramites(){
    let token = this._LoginService.getToken();

    let datos: any;

    if (this.vehiculo && this.factura.idModulo != 1) {
      datos = { 
        'idModulo': this.factura.idModulo, 
        'idTipoVehiculo': this.vehiculo.placa.tipoVehiculo.id 
      }
    }else{
      datos = { 
        'idModulo': this.factura.idModulo
      }
    }

    this._TramitePrecioService.selectByModulo(datos, token).subscribe(
      response => {
        this.tramitesPrecio = response.data;
        
        if (response.code == 400) {
          swal({
            title: response.title,
            text: response.message,
            type: response.status,
            confirmButtonText: 'Aceptar'
          });
        }
      },
      error => {
        this.errorMessage = <any>error;

        if (this.errorMessage != null) {
          console.log(this.errorMessage);
          alert("Error en la petición");
        }
      }
    );
  }

  onAddTramite() {
    swal({
      title: 'Agregando trámite!',
      text: 'Solo tardara unos segundos por favor espere.',
      onOpen: () => {
        swal.showLoading()
      }
    });

    let token = this._LoginService.getToken();

    this._TramitePrecioService.show({ 'id': this.tramitePrecioSelected }, token).subscribe(
      response => {
        if (response.code == 200) {
          this.tramitePrecio = response.data;
          if (this.modulo.abreviatura == 'RNC') {
              this.onCreateArray();
          } else if (this.modulo.abreviatura == 'RNA' || this.modulo.abreviatura == 'RNET' || this.modulo.abreviatura == 'RNMA' || this.modulo.abreviatura == 'RNRS') {
            //Valida si el tramite seleccionado requiere calcular retefuente
            if (this.tramitePrecio.tramite.id == 2 && this.propietarios) {
              if (this.tramitesPrecioArray.length < 1) { 
                
                let datos = {
                  'linea': this.vehiculo.linea.id,
                  'marca': this.vehiculo.linea.marca.id,
                  'clase': this.vehiculo.clase.id,
                  'modelo': this.vehiculo.modelo,
                  'cilindraje': this.vehiculo.cilindraje
                }

                this._VhloValorService.getValorVehiculoVehiculo(datos, token).subscribe(
                  response => {
                    if (response.code == 200) {
                      this.valorRetefuente = parseInt(response.data.valor) * 0.01;
                      this.valorRetefuenteUnitario = this.valorRetefuente / this.propietarios.length;
                      this.idVehiculoValor = response.data.id;
                    } else {
                      this.valorRetefuente = 0;
                      this.idVehiculoValor = null;

                      swal({
                        title: response.title,
                        text: response.message,
                        type: response.status,
                        confirmButtonText: 'Aceptar'
                      });
                    }
                  },
                  error => {
                    this.errorMessage = <any>error;
                    if (this.errorMessage != null) {
                      console.log(this.errorMessage);
                      alert("Error en la petición");
                    }
                  }
                );
              } else {
                swal({
                  title: 'Error!',
                  text: 'Solo puede facturar el tramite traspaso.',
                  type: 'error',
                  confirmButtonText: 'Aceptar'
                });
              }          
            }else{
              swal({
                title: 'Error!',
                text: 'Este tramite no se puede facturar por que el vehículo no tiene propietarios registrados.',
                type: 'warning',
                confirmButtonText: 'Aceptar'
              });
            }
            
            //Agrega el trámite seleccionado al arreglo
            this.onCreateArray();
          }
        } else {
          this.tramitePrecio = null;

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
          alert("Error en la petición");
        }
      }
    );

  }

  onSeller(e: any, propietarioVehiculo:any){
    if (e.target.checked) {
      this.propietariosVehiculoRetefuente.push(propietarioVehiculo);
    }else{
      this.propietariosVehiculoRetefuente =  this.propietariosVehiculoRetefuente.filter(h => h !== propietarioVehiculo);
    }
  }

  onCreateArray(){
    this.factura.valor = this.factura.valor + parseInt(this.tramitePrecio.valorTotal);

    this.tramitesPrecioArray.push(
      {
        'nombre': this.tramitePrecio.nombre,
        'valor': this.tramitePrecio.valorTotal,
        'id': this.tramitePrecio.id,
      }
    );

    swal.close();
  }

  onDeleteTramite(tramiteValor) {
    this.factura.valor = this.factura.valor - parseInt(tramiteValor.valor);
    this.tramitesPrecioArray = this.tramitesPrecioArray.filter(h => h !== tramiteValor);
  }

  onNew() {
    this.formNew = true;
    this.formIndex = false;
    this.formSearch = false;
  }

  onCancelar(){
    this.formNew = false;
    this.formIndex = false;
    this.formSearch = true;
    this.ngOnInit();
  }

  onEnviar() {
    swal({
      title: 'Generando factura!',
      text: 'Solo tardara unos segundos por favor espere.',
      onOpen: () => {
        swal.showLoading()
      }
    });

    let token = this._LoginService.getToken();

    this.factura.tramites = this.tramitesPrecioArray;
    //Tipo de recaudo trámites
    this.factura.idTipoRecaudo = 1;

    let datos = {
      'factura': this.factura,
      'propietarios': this.propietariosVehiculoRetefuente,
      'retencion': this.valorRetefuenteUnitario,
      'idVehiculoValor': this.idVehiculoValor,
      'valorVehiculo': this.valorVehiculo
    }

    this._FacturaService.register(datos, token).subscribe(
      response => {
        if (response.code == 200) {
          this.factura = response.data;
          this.municipio = response.data.organismoTransito.municipio;

          var datePiper = new DatePipe('en-US');

          var date = new Date();
          date.setTime(response.data.fechaCreacion.timestamp * 1000);

          this.fechaCreacion = datePiper.transform(
            date, 'dd/MM/yyyy'
          );

          date.setTime(response.data.fechaVencimiento.timestamp * 1000);
          this.fechaVencimiento = datePiper.transform(
            date, 'dd/MM/yyyy'
          );
          
          this.formNew = false;

          swal({
            title: 'Perfecto!',
            text: response.message,
            type: 'success',
            confirmButtonText: 'Aceptar'
          });
        } else {
          this.factura.id = null;
          this.factura.numero = null;
          this.formNew = true;

          swal({
            title: 'Error!',
            text: response.message,
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
      }
    );
  }

  onCalcularValorRetefuenteManual() {
    this.valorRetefuente = parseInt(this.valorVehiculo) * 0.01;
    this.valorRetefuenteUnitario = this.valorRetefuente / this.propietarios.length;
  }

  onChangeTramitePrecio(e) {
    this.tramite = false;

    if(e) {
      swal({
        title: 'Verificando Datos!',
        text: 'Solo tardará unos segundos, por favor espere.',
        timer: 1000,

        onOpen: () => {
          swal.showLoading()
        }
      }); 

      if (this.vehiculo.servicio.id != 2) {
        if (e == 95) {
          let token = this._LoginService.getToken();

          this._FroTrteSolicitudService.searchByCambioServicio({ 'idVehiculo': this.vehiculo.id }, token).subscribe(
            response => {
              if (response.code == 200) {
                this.tramite = true;

                swal({
                  title: response.title,
                  text: response.message,
                  type: response.status,
                  confirmButtonText: 'Aceptar'
                });
              } else {
                this.tramite = false;
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
      } else if(this.vehiculo.servicio.id == 2) {
        this.tramite = true;
      } else {
        swal({
          title: 'Atención!',
          text: 'El vehículo no pertenece a transporte público.',
          type: 'error',
          confirmButtonText: 'Aceptar'
        });
      }
    }
  }

  onChangedTamitePrecio(e) {
    if (e) {
      let token = this._LoginService.getToken();

      this._FroTrtePrecioService.searchTramiteById({ 'idTramitePrecio': e }, token).subscribe(
        response => {
          this.idTramite = response.data;

        },
        error => {
          this.errorMessage = <any>error;

          if (this.errorMessage != null) {
            console.log(this.errorMessage);
            alert("Error en la petición");
          }
        }
      );
    }
  }
}
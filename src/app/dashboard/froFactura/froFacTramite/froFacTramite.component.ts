import { Component, OnInit } from '@angular/core';
import { DatePipe, CurrencyPipe } from '@angular/common';
import { FroFacTramite } from './froFacTramite.modelo';
import { PnalFuncionarioService } from '../../../services/pnalFuncionario.service';
import { FroFacturaService } from '../../../services/froFactura.service';
import { CfgOrganismoTransitoService } from '../../../services/cfgOrganismoTransito.service';
import { CfgModuloService } from '../../../services/cfgModulo.service';
import { UserCfgTipoIdentificacionService } from '../../../services/userCfgTipoIdentificacion.service';
import { UserCiudadanoService } from '../../../services/userCiudadano.service';
import { VhloPropietarioService } from '../../../services/vhloPropietario.service';
import { FroTrtePrecioService } from '../../../services/froTrtePrecio.service';
import { LoginService } from '../../../services/login.service';
import { environment } from 'environments/environment'
import swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-index',
  templateUrl: './froFacTramite.component.html'
})

export class FroFacTramiteComponent implements OnInit {
  public errorMessage;
  public factura: FroFacTramite;

  public organismosTransito: any;
  public modulos: any;
  public tiposIdentificacion: any;
  public tramitesPrecio: any = null;

  public modulo: any = null;
  public ciudadano: any = null;
  public vehiculo: any = null;
  public tipoIdentificacionSelected: any = null;
  public identificacion: any;
  public vehiculoFiltro: any;
  public organismoTransito: any = null;
  public municipio: any = null;
  public fechaCreacion: any = null;
  public fechaVencimiento: any = null;
  public facturaNumero: any = null;
  public date: any;
  
  public formIndex = false;
  public formNew = false;
  public formSearch = true;
  public table: any = null;

  public apiUrl = environment.apiUrl + 'financiero';

  constructor(
    private _FuncionarioService: PnalFuncionarioService,
    private _FacturaService: FroFacturaService,
    private _OrganismoTransitoService: CfgOrganismoTransitoService,
    private _ModuloService: CfgModuloService,
    private _TipoIdentificacionService: UserCfgTipoIdentificacionService,
    private _CiudadanoService: UserCiudadanoService,
    private _PropietarioService: VhloPropietarioService,
    private _TramitePrecioService: FroTrtePrecioService,
    private _LoginService: LoginService,
  ){}
    
  ngOnInit() {
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
        if (response.status == 'success') {
          this.organismoTransito = response.data.organismoTransito;

          this.factura.numero = datePiper.transform(this.date, 'hmss');
          this.factura.fechaCreacion = datePiper.transform(this.date, 'yyyy-MM-dd');
          this.factura.idOrganismoTransito = this.organismoTransito.id;

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

        swal.close();
      },
      error => {
        this.errorMessage = <any>error;

        if (this.errorMessage != null) {
          console.log(this.errorMessage);
          alert('Error en la petición');
        }
      }
    );

    this.date = new Date();

    this.factura = new FroFacTramite(null, null, null, null, null, null, null, null, null, null, null);

    var datePiper = new DatePipe(this.date);
  }

  onChangedModulo(e) {
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

          this._TramitePrecioService.selectByModulo({ 'idModulo': this.factura.idModulo }, token).subscribe(
            response => {
              this.tramitesPrecio = response;
            },
            error => {
              this.errorMessage = <any>error;

              if (this.errorMessage != null) {
                console.log(this.errorMessage);
                alert("Error en la petición");
              }
            }
          );

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

  iniciarTabla() {
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

    let token = this._LoginService.getToken();

    let datos = {
      'identificacion': this.identificacion,
      'tipoIdentificacion': this.tipoIdentificacionSelected,
    }

    this._CiudadanoService.searchByIdentificacion(datos, token).subscribe(
      response => {
        if (response.status == 'error') {
          this.ciudadano = response.datos;
          this.factura.idCiudadano = this.ciudadano.id;
        } else {
          this.ciudadano = null;
        }

        swal.close();
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

  onSearchVehiculo() {
    swal({
      title: 'Buscando vehiculo!',
      text: 'Solo tardara unos segundos por favor espere.',
      onOpen: () => {
        swal.showLoading()
      }
    });

    let token = this._LoginService.getToken();

    this._PropietarioService.searchByFilter({ 'filtro': this.vehiculoFiltro }, token).subscribe(
      response => {
        if (response.code == 200) {
          this.vehiculo = response.data.vehiculo;
          this.factura.idVehiculo = this.vehiculo.id;

          swal({
            title: 'Perfecto!',
            text: response.message,
            type: 'success',
            confirmButtonText: 'Aceptar'
          });
        }else {
          if (response.data.vehiculo) {
            this.vehiculo = response.data.vehiculo;
            this.factura.idVehiculo = this.vehiculo.id;
          }else{
            this.vehiculo = null;
            this.factura.idVehiculo = null;
          }
          
          swal({
            title: 'Atención!',
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

  /*
  onAddNewTramite() {
    swal({
      title: 'Agregando trámite!',
      text: 'Solo tardara unos segundos por favor espere.',
      onOpen: () => {
        swal.showLoading()
      }
    });

    let token = this._LoginService.getToken();

    if (this.modulo.abreviatura == 'RNA') {
      if (!this.propietario) {
        this._TramitePrecioService.showTramitePrecio(token, this.tramitePrecioSelected).subscribe(
          response => {
            this.tramitePrecio = response.data;
            if (this.tramitePrecio.tramite.formulario == 'rna-matriculainicial') {
              this.factura.valorBruto = this.factura.valorBruto + parseInt(this.tramitePrecio.valorTotal);
              this.tramitesValor.push(
                {
                  'idTramitePrecio': this.tramitePrecio.id,
                  'nombre': this.tramitePrecio.nombre,
                  'valor': this.tramitePrecio.valorTotal
                }
              );

              swal.close();
            } else {
              swal({
                title: 'Sin propietarios!',
                text: 'Necesita facturar matricula inicial para este vehiculo',
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
      } else {

        this._TramitePrecioService.showTramitePrecio(token, this.tramitePrecioSelected).subscribe(
          response => {
            this.tramitePrecio = response.data;
            if (this.tramitePrecio.tramite.id == 6) {

              this.factura.valorBruto = this.factura.valorBruto + parseInt(this.tramitePrecio.valorTotal);
              this.tramitesValor.push(
                {
                  'idTramitePrecio': this.tramitePrecio.id,
                  'nombre': this.tramitePrecio.nombre,
                  'valor': this.tramitePrecio.valorTotal
                }
              )

              swal({
                title: 'Buscando Propietarios!',
                text: 'Solo tardara unos segundos por favor espere.',
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
              this._ciudadanoVehiculoService.showCiudadanoVehiculoId(token, this.vehiculoCriterio).subscribe(
                response => {
                  let datos = {
                    'linea': this.vehiculo.linea.id,
                    'clase': this.vehiculo.clase.id,
                    'modelo': this.vehiculo.modelo
                  }

                  this._CfgValorVehiculoService.getCfgValorVehiculoVehiculo(datos, token).subscribe(
                    valorVehiculo => {
                      if (valorVehiculo.datos != null) {
                        this.valorRetefuente = parseInt(valorVehiculo.datos.valor) * 0.01;
                        this.valorVehiculoId = valorVehiculo.datos.id;
                        this.propietariosVehiculo = response.data;
                        response.data.forEach(element => {
                          if (element.ciudadano) {
                            this.searchByIdentificacionForm = true;
                          }
                          if (element.empresa) {
                            this.isEmpresaForm = true;
                          }
                        });
                        swal.close();
                      } else {
                        swal.close();
                        swal({
                          title: 'Sin valor!',
                          text: 'Necesita ingresar el valor del vehiculo',
                          type: 'error',
                          confirmButtonText: 'Aceptar'
                        })
                        return (0);
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
                  error => {
                    this.errorMessage = <any>error;
                    if (this.errorMessage != null) {
                      console.log(this.errorMessage);
                      alert("Error en la petición");
                    }
                  }
                });
            } else {
              this.factura.valorBruto = this.factura.valorBruto + parseInt(this.tramitePrecio.valorTotal);
              this.tramitesValor.push(
                {
                  'idTramitePrecio': this.tramitePrecio.id,
                  'nombre': this.tramitePrecio.nombre,
                  'valor': this.tramitePrecio.valorTotal
                }
              )
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
    } else {
      this._TramitePrecioService.showTramitePrecio(token, this.tramitePrecioSelected).subscribe(
        response => {
          this.tramitePrecio = response.data;
          this.factura.valorBruto = this.factura.valorBruto + parseInt(this.tramitePrecio.valorTotal);
          this.tramitesValor.push(
            {
              'idTramitePrecio': this.tramitePrecio.id,
              'nombre': this.tramitePrecio.nombre,
              'valor': this.tramitePrecio.valorTotal
            }
          )
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
  */

  onNew() {
    this.formNew = true;
    this.formIndex = false;
    this.formSearch = false;

    this.factura = new FroFacTramite(null, null, null, null, null, null, null, null, null, null, null);

    
  }

  onCancelar(){
    this.formNew = false;
    this.formIndex = false;
    this.formSearch = true;
    this.ngOnInit();
  }

  onEnviar() {
    let token = this._LoginService.getToken();

    //this.factura.comparendos = this.comparendosSelect;
    //Tipo de recaudo infracciones
    this.factura.idTipoRecaudo = 1;

    this._FacturaService.register(this.factura, token).subscribe(
      response => {
        if (response.status == 'success') {
          this.factura.id = response.data.id;
          this.municipio = response.data.sedeOperativa.municipio.nombre;
          this.fechaCreacion = response.data.fechaCreacion;
          this.fechaVencimiento = response.data.fechaVencimiento;
          this.facturaNumero = response.data.numero;

          swal({
            title: 'Perfecto!',
            text: response.message,
            type: 'success',
            confirmButtonText: 'Aceptar'
          })
        } else {
          this.factura.id = null;

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
}
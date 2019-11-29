import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DatePipe } from '@angular/common';
import { CfgOrganismoTransitoService } from '../../../../../services/cfgOrganismoTransito.service';
import { CfgMunicipioService } from '../../../../../services/cfgMunicipio.service';
import { VhloCfgLineaService } from '../../../../../services/vhloCfgLinea.service';
import { VhloCfgClaseService } from '../../../../../services/vhloCfgClase.service';
import { VhloCfgCarroceriaService } from '../../../../../services/vhloCfgCarroceria.service';
import { VhloCfgServicioService } from '../../../../../services/vhloCfgServicio.service';
import { VhloCfgColorService } from '../../../../../services/vhloCfgColor.service';
import { VhloCfgCombustibleService } from '../../../../../services/vhloCfgCombustible.service';
import { VhloVehiculoService } from '../../../../../services/vhloVehiculo.service';
import { VhloCfgMarcaService } from '../../../../../services/vhloCfgMarca.service';
import { VhloCfgRadioAccionService } from '../../../../../services/vhloCfgRadioAccion.service';
import { VhloCfgModalidadTransporteService } from '../../../../../services/vhloCfgModalidadTransporte.service';
import { VhloPropietarioService } from '../../../../../services/vhloPropietario.service';
import { VhloRnaPreregistroService } from '../../../../../services/vhloRnaPreregistro.service';
import { UserCfgTipoIdentificacionService } from '../../../../../services/userCfgTipoIdentificacion.service';
import { UserCiudadanoService } from '../../../../../services/userCiudadano.service';
import { UserEmpresaService } from "../../../../../services/userEmpresa.service";
import { PnalFuncionarioService } from '../../../../../services/pnalFuncionario.service';
import { FroTrteSolicitudService } from 'app/services/froTrteSolicitud.service';
import { LoginService } from '../../../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-edit-vhlo-rna-preregistro',
  templateUrl: './edit.component.html',
  providers: [DatePipe]
})

export class EditComponent implements OnInit {
  @Output() ready = new EventEmitter<any>();
  @Input() vehiculo: any = null;
  public errorMessage: any;

  public municipios: any;
  public lineas: any;
  public clases: any;
  public carrocerias: any;
  public servicios: any;
  public colores: any;
  public marcas: any;
  public combustibles: any;
  public radiosAccion: any;
  public modalidadesTransporte: any;
  public organismosTransito: any;
  public organismosTransitoNacional: any;

  public fechaFactura: any;
  public fechaManifiesto: any;
  public municipioSelected: any;
  public lineaSelected: any;
  public claseSelected: any;
  public carroceriaSelected: any;
  public servicioSelected: any;
  public colorSelected: any;
  public marcaSelected: any;
  public combustibleSelected: any;
  public radioAccionSelected: any;
  public modalidadTransporteSelected: any;
  public sedeOperativaSelected: any;

  public tipoIdentificacionSelected: any;

  public ciudadano: any = null;
  public apoderado: any = null;
  public propietarioSelected: any;
  public apoderadoSelected: any;

  public empresa: any = null;
  public empresaTransporte: any = null;

  public tiposIdentificacion: any;
  public identificacion: any;
  public identificacionApoderado: any;
  public nit: any;
  public nitEmpresaTransporte: any;

  public formApoderado = false;
  public funcionario: any = null;
  public propietarios: any = null;

  public realizoTramites = true;

  public tiposPropiedad = [
    { 'value': 1, 'label': "Leasing" },
    { 'value': 2, 'label': "Propio" }
  ];

  public tiposMatricula = [
    { 'value': 'RADICADO', 'label': "Radicado de cuenta" },
    { 'value': 'MATRICULA', 'label': "Matricula inicial" },
    { 'value': 'IMPORTACION', 'label': "Importación temporal" },
    { 'value': 'CARPETA', 'label': "Cargue de carpeta" },
    { 'value': 'DEVOLUCION', 'label': "Devolución por radicado de cuenta" },
  ];

  public datos = {
    'propietarios': [],
    'solidario': false,
    'tipoPropiedad': null,
    'numeroLicencia': null,
    'fechaLicencia': null,
    'idVehiculo': null,
  };

  public radicado = {
    'fechaIngreso': null,
    'guiaLlegada': null,
    'empresaEnvio': null,
    'numeroLicencia': null,
    'idOrganismoTransito': null,
  };

  constructor(
    private _PropietarioService: VhloPropietarioService,
    private _PreregistroService: VhloRnaPreregistroService,
    private _MunicipioService: CfgMunicipioService,
    private _LineaService: VhloCfgLineaService,
    private _ClaseService: VhloCfgClaseService,
    private _CarroceriaService: VhloCfgCarroceriaService,
    private _ServicioService: VhloCfgServicioService,
    private _MarcaService: VhloCfgMarcaService,
    private _ColorService: VhloCfgColorService,
    private _CombustibleService: VhloCfgCombustibleService,
    private _VehiculoService: VhloVehiculoService,
    private _OrganismoTransitoService: CfgOrganismoTransitoService,
    private _RadioAccionService: VhloCfgRadioAccionService,
    private _ModalidadTransporteService: VhloCfgModalidadTransporteService,
    private _FuncionarioService: PnalFuncionarioService,
    private _TipoIdentificacionService: UserCfgTipoIdentificacionService,
    private _CiudadanoService: UserCiudadanoService,
    private _TramiteSolicitudService: FroTrteSolicitudService,
    private _LoginService: LoginService,
  ) { }

  ngOnInit() {
    swal({
      title: 'Cargando Formulario!',
      text: 'Solo tardara unos segundos por favor espere.',
      onOpen: () => {
        swal.showLoading()
      }
    });

    let token = this._LoginService.getToken();
    let identity = this._LoginService.getIdentity();

    //Traer propietarios por vehiculo
    if (this.vehiculo.tipoMatricula == 'RADICADO') {
      this._PropietarioService.searchByVehiculo({ 'idVehiculo': this.vehiculo.id }, token).subscribe(
        response => {
          if (response.code == 200) {
            this.propietarios = response.data;

            //Foreach
            this.propietarios.forEach((element: any, key: any) => {
              this.datos.propietarios.push(
                {
                  'idPropietario': element.ciudadano.id,
                  'identificacion': element.ciudadano.identificacion,
                  'nombre': element.ciudadano.primerNombre + " " + element.ciudadano.segundoNombre,
                  'permiso': element.permiso,
                  'tipo': 'Ciudadano',
                  'idApoderado': null,
                  'apoderadoIdentificacion': null,
                  'apoderado.nombre': null,
                });
            });
            //

            this._TramiteSolicitudService.searchByVehiculo({ 'idVehiculo': this.vehiculo.id }, token).subscribe(
              response => {
                if (response.code == 200) {
                  this.realizoTramites = true;
                  swal.close();
                } else {
                  this.realizoTramites = false;
                  swal.close();
                }
              });
          } else {
            this.propietarios = null;

            swal({
              title: 'Atención!',
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

    if (this.vehiculo.placa) {
      this.vehiculo.placa = this.vehiculo.placa.numero;
    }

    var datePiper = new DatePipe('en-US');

    var date = new Date();

    if (this.vehiculo.fechaFactura) {
      date.setTime(this.vehiculo.fechaFactura.timestamp * 1000);

      this.vehiculo.fechaFactura = datePiper.transform(
        date, 'yyyy-MM-dd'
      );
    }

    if (this.vehiculo.fechaManifiesto) {
      date.setTime(this.vehiculo.fechaManifiesto.timestamp * 1000);

      this.vehiculo.fechaManifiesto = datePiper.transform(
        date, 'yyyy-MM-dd'
      );
    }

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

    this._FuncionarioService.searchLogin({ 'identificacion': identity.identificacion }, token).subscribe(
      response => {
        if (response.code == 200) {
          this.funcionario = response.data;
          this.vehiculo.idOrganismoTransito = response.data.organismoTransito.id;
        } else {
          this.funcionario = null;
          this._FuncionarioService.searchEmpresa({ 'identificacion': identity.identificacion }, token).subscribe(
            response => {
              if (response.code == 200) {
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
        error => {
          this.errorMessage = <any>error;
          if (this.errorMessage != null) {
            console.log(this.errorMessage);
            alert('Error en la petición');
          }
        }
      }
    );

    this._LineaService.select().subscribe(
      response => {
        this.lineas = response;
        setTimeout(() => {
          this.lineaSelected = [this.vehiculo.linea.id];
          this._MarcaService.select().subscribe(
            response => {
              this.marcas = response;
              setTimeout(() => {
                this.marcaSelected = [this.vehiculo.linea.marca.id];
              })
            },
            error => {
              this.errorMessage = <any>error;

              if (this.errorMessage != null) {
                console.log(this.errorMessage);
                alert("Error en la petición");
              }
            }
          );
        });
      },
      error => {
        this.errorMessage = <any>error;
        if (this.errorMessage != null) {
          console.log(this.errorMessage);
          alert("Error en la petición");
        }
      }
    );

    this._ClaseService.select().subscribe(
      response => {
        this.clases = response;
        setTimeout(() => {
          this.claseSelected = [this.vehiculo.clase.id];
        });
      },
      error => {
        this.errorMessage = <any>error;

        if (this.errorMessage != null) {
          console.log(this.errorMessage);
          alert("Error en la petición");
        }
      }
    );

    this._CarroceriaService.select().subscribe(
      response => {
        this.carrocerias = response;

        setTimeout(() => {
          if (this.vehiculo.carroceria) {
            this.carroceriaSelected = [this.vehiculo.carroceria.id];
          }
        });
      },
      error => {
        this.errorMessage = <any>error;
        if (this.errorMessage != null) {
          console.log(this.errorMessage);
          alert("Error en la petición");
        }
      }
    );
    this._ServicioService.select().subscribe(
      response => {
        this.servicios = response;
        setTimeout(() => {
          if (this.vehiculo.servicio) {
            this.servicioSelected = [this.vehiculo.servicio.codigo];
          }
        });
      },
      error => {
        this.errorMessage = <any>error;

        if (this.errorMessage != null) {
          console.log(this.errorMessage);
          alert("Error en la petición");
        }
      }
    );

    this._ColorService.select().subscribe(
      response => {
        this.colores = response;
        setTimeout(() => {
          if (this.vehiculo.color) {
            this.colorSelected = [this.vehiculo.color.id];
          }
        });
      },
      error => {
        this.errorMessage = <any>error;
        if (this.errorMessage != null) {
          console.log(this.errorMessage);
          alert("Error en la petición");
        }
      }
    );

    this._CombustibleService.select().subscribe(
      response => {
        this.combustibles = response;
        setTimeout(() => {
          if (this.vehiculo.combustible) {
            this.combustibleSelected = [this.vehiculo.combustible.id];
          }
        });
      },
      error => {
        this.errorMessage = <any>error;
        if (this.errorMessage != null) {
          console.log(this.errorMessage);
          alert("Error en la petición");
        }
      }
    );

    this._OrganismoTransitoService.selectSedes().subscribe(
      response => {
        this.organismosTransito = response;

        if (this.vehiculo.organismoTransito) {
          setTimeout(() => {
            if (this.vehiculo.organismoTransito) {
              this.sedeOperativaSelected = [this.vehiculo.organismoTransito.id];
            }
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

    this._OrganismoTransitoService.select().subscribe(
      response => {
        this.organismosTransitoNacional = response;

        if (this.vehiculo.organismoTransitoRadicado) {
          setTimeout(() => {
            this.radicado.idOrganismoTransito = [this.vehiculo.organismoTransitoRadicado.id];
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

    this._MunicipioService.select().subscribe(
      response => {
        this.municipios = response;

        if (this.vehiculo.municipio) {
          setTimeout(() => {
            this.municipioSelected = [this.vehiculo.municipio.id];
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

    this._RadioAccionService.select().subscribe(
      response => {
        this.radiosAccion = response;
        setTimeout(() => {
          if (this.vehiculo.radioAccion) {
            this.radioAccionSelected = [this.vehiculo.radioAccion.id];
          }
        });
      },
      error => {
        this.errorMessage = <any>error;

        if (this.errorMessage != null) {
          console.log(this.errorMessage);
          alert("Error en la petición");
        }
      }
    );

    this._ModalidadTransporteService.select().subscribe(
      response => {
        this.modalidadesTransporte = response;

        if (this.vehiculo.modalidadTransporte) {
          setTimeout(() => {
            this.modalidadTransporteSelected = [this.vehiculo.modalidadTransporte.id];
          });
        }

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

    this.datos.numeroLicencia = this.vehiculo.numeroLicenciaRadicado;

    var datePiper = new DatePipe('en-US');

    var date = new Date();
    if (this.vehiculo.fechaRegistroRadicado) {
      date.setTime(this.vehiculo.fechaRegistroRadicado.timestamp * 1000);
      this.vehiculo.fechaRegistroRadicado = datePiper.transform(
        date, 'yyyy-MM-dd'
      );
    }

    this.radicado.fechaIngreso = this.vehiculo.fechaRegistroRadicado;
    this.radicado.guiaLlegada = this.vehiculo.numeroGuiaRadicado;
    this.radicado.empresaEnvio = this.vehiculo.empresaEnvioRadicado;
    this.radicado.numeroLicencia = this.datos.numeroLicencia;

    if (this.vehiculo.pignorado) {
      this.datos.tipoPropiedad = [1];
    } else {
      this.datos.tipoPropiedad = [2];
    }

    if (this.vehiculo.servicio) {
      if (this.vehiculo.servicio.id = 2 && this.vehiculo.empresa != null) {
        this.nitEmpresaTransporte = this.vehiculo.empresa.nit;
        this.onSearchEmpresaTransporte();
      }
    }


  }

  onCancelar() {
    this.ready.emit(true);
  }

  onChangedMarca(e) {
    if (e) {
      let token = this._LoginService.getToken()
      this._LineaService.selectByMarca({ 'idMarca': e }, token).subscribe(
        response => {
          this.lineas = response;
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

  onChangedClase(e) {
    if (e) {
      let token = this._LoginService.getToken()

      this._CarroceriaService.selectByClase({ 'idClase': e }, token).subscribe(
        response => {
          this.carrocerias = response;
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

  onUpdate() {
    this.vehiculo.vin = this.vehiculo.chasis;
    this.vehiculo.serie = this.vehiculo.chasis;
  }

  onSearchEmpresaTransporte() {
    swal({
      title: 'Buscando empresa de afiliacion!',
      text: 'Solo tardara unos segundos por favor espere.',
      onOpen: () => {
        swal.showLoading()
      }
    });

    let token = this._LoginService.getToken();

    let datos = {
      'identificacion': this.nitEmpresaTransporte,
      'idTipoIdentificacion': 4,
    }

    this._CiudadanoService.searchByIdentificacion(datos, token).subscribe(
      response => {
        if (response.code == 200) {
          if (response.data.empresa) {
            this.empresaTransporte = response.data.empresa;
            this.vehiculo.idEmpresa = this.empresaTransporte.id;

            swal({
              title: 'Perfecto!',
              text: response.message,
              type: 'success',
              confirmButtonText: 'Aceptar'
            });
          }
        } else {
          this.empresaTransporte = null;
          this.vehiculo.idEmpresa = null;

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
      'idTipoIdentificacion': this.tipoIdentificacionSelected,
    }

    this._CiudadanoService.searchByIdentificacion(datos, token).subscribe(
      response => {
        if (response.code == 200) {
          if (response.data.ciudadano) {
            this.ciudadano = response.data.ciudadano;

            swal({
              title: 'Perfecto!',
              text: response.message,
              type: 'success',
              confirmButtonText: 'Aceptar'
            });
          }
        } else {
          this.ciudadano = null;

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
          } else {
            this.apoderado = response.data.empresa;
          }

          swal({
            title: 'Perfecto!',
            text: response.message,
            type: 'success',
            confirmButtonText: 'Aceptar'
          });
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
            alert('Error en la petición');
          }
        }
      }
    );
  }

  onSearchEmpresa() {
    swal({
      title: 'Buscando empresa!',
      text: 'Solo tardara unos segundos por favor espere.',
      onOpen: () => {
        swal.showLoading()
      }
    });

    let token = this._LoginService.getToken();

    let datos = {
      'identificacion': this.nit,
      'idTipoIdentificacion': this.tipoIdentificacionSelected,
    }

    this._CiudadanoService.searchByIdentificacion(datos, token).subscribe(
      response => {
        if (response.code == 200) {
          if (response.data.empresa) {
            this.empresa = response.data.empresa;

            swal({
              title: 'Perfecto!',
              text: response.message,
              type: 'success',
              confirmButtonText: 'Aceptar'
            });
          }
        } else {
          this.empresa = null;

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

  onAddCiudadano() {
    let agregado = this.datos.propietarios.includes(this.ciudadano.identificacion, 1);

    if (agregado) {
      swal({
        title: 'Error!',
        text: 'El registro seleccionado ya se encuentra agregado como propietario.',
        type: 'error',
        confirmButtonText: 'Aceptar'
      });
    } else {
      this.datos.propietarios.push(
        {
          'idPropietario': this.ciudadano.id,
          'identificacion': this.ciudadano.identificacion,
          'nombre': this.ciudadano.primerNombre + " " + this.ciudadano.segundoNombre,
          'permiso': this.datos.solidario,
          'tipo': 'Ciudadano',
          'idApoderado': null,
          'apoderadoIdentificacion': null,
          'apoderado.Nombre': null,
        }
      );
    }
  }

  onAddEmpresa() {
    this.datos.propietarios.push(
      {
        'idPropietario': this.empresa.id,
        'identificacion': this.empresa.nit,
        'nombre': this.empresa.nombre,
        'permiso': this.datos.solidario,
        'tipo': 'Empresa',
        'idApoderado': null,
        'apoderadoIdentificacion': null,
        'apoderado.Nombre': null,
      }
    );
  }

  onDeletePropietario(propietario: any): void {
    this.datos.propietarios = this.datos.propietarios.filter(h => h !== propietario);
  }

  onNewApoderado(propietario: any) {
    let agregado = this.datos.propietarios.includes(propietario.identificacion, 1);

    if (agregado) {
      swal({
        title: 'Error!',
        text: 'El registro seleccionado ya se encuentra agregado como apoderado.',
        type: 'error',
        confirmButtonText: 'Aceptar'
      });
    } else {
      this.formApoderado = true;
      this.propietarioSelected = this.datos.propietarios.filter(h => h == propietario);
      this.propietarioSelected = this.propietarioSelected[0];
    }
  }

  onAddApoderado(apoderado) {
    let posicion = this.datos.propietarios.indexOf(this.propietarioSelected);

    this.datos.propietarios[posicion].idApoderado = apoderado.id;
    this.datos.propietarios[posicion].apoderadoIdentificacion = apoderado.identificacion;
    this.datos.propietarios[posicion].apoderadoNombre = apoderado.primerNombre + " " + apoderado.primerApellido;
  }

  onCancelarApoderado() {
    this.apoderado = null;
    this.formApoderado = false;
  }

  onEnviar() {
    let token = this._LoginService.getToken();
    this.vehiculo.idLinea = this.lineaSelected;
    this.vehiculo.idClase = this.claseSelected;
    this.vehiculo.idCarroceria = this.carroceriaSelected;
    this.vehiculo.idServicio = this.servicioSelected;
    this.vehiculo.idColor = this.colorSelected;
    this.vehiculo.idCombustible = this.combustibleSelected;
    this.vehiculo.idOrganismoTransito = this.sedeOperativaSelected;
    this.vehiculo.idRadioAccion = this.radioAccionSelected;
    this.vehiculo.idModalidadTransporte = this.modalidadTransporteSelected;
    this.vehiculo.idEmpresa = this.empresaTransporte.id;

    var html = 'los datos del Automotor seran editados !<br>';

    swal({
      title: 'Actualización de automotor!',
      type: 'warning',
      html: html,
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText:
        '<i class="fa fa-thumbs-up"></i> Editar!',
      confirmButtonAriaLabel: 'Thumbs up, great!',
      cancelButtonText:
        '<i class="fa fa-thumbs-down"></i> No editar',
      cancelButtonAriaLabel: 'Thumbs down',
    }).then((result) => {
      if (result.value) {
        this._VehiculoService.edit({ 'vehiculo': this.vehiculo, 'radicado': this.radicado }, token).subscribe(
          response => {
            if (response.code == 200) {
              //para eliminar los registros anteriores
              this.datos.idVehiculo = this.vehiculo.id;

              if (!this.realizoTramites && this.vehiculo.tipoMatricula == 'RADICADO') {
                this._PropietarioService.searchAndDeleteByVehiculo(this.datos, token).subscribe(
                  response => {
                    if (response.code == 200) {
                      console.log("los registros se eliminaron correctamente");

                      this._PropietarioService.register(this.datos, token).subscribe(
                        response => {
                          if (response.code == 200) {
                            /* this.ready.emit(true); */
                          }
                        },
                        error => {
                          this.errorMessage = <any>error;

                          if (this.errorMessage != null) {
                            console.log(this.errorMessage);
                            alert('Error en la petición');
                          }
                        }
                      );


                    } else {
                      swal({
                        title: 'Error!',
                        text: response.message,
                        type: response.status,
                        confirmButtonText: 'Aceptar'
                      })
                    }
                  },
                  error => {
                    this.errorMessage = <any>error;

                    if (this.errorMessage != null) {
                      console.log(this.errorMessage);
                      alert('Error en la petición');
                    }
                  }
                );

                swal({
                  title: response.title,
                  text: response.message,
                  type: response.status,
                  confirmButtonText: 'Aceptar'
                })
              }

              swal({
                title: response.title,
                text: response.message,
                type: response.status,
                confirmButtonText: 'Aceptar'
              })

              this.ready.emit(true);
            } else {
              swal({
                title: 'Error!',
                text: response.message,
                type: response.status,
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
      } else if (result.dismiss === swal.DismissReason.cancel) { }
    })
  }

  changedDepartamento(e) {
    if (this.marcaSelected) {
      let token = this._LoginService.getToken()
      this._LineaService.selectByMarca(this.marcaSelected, token).subscribe(
        response => {
          console.log(response.data[0]);
          if (response.data[0] != null) {
            this.lineas = response.data;
          } else {
            this.lineas = [];
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
  }
}
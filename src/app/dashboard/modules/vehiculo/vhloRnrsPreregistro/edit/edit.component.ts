import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { VhloRemolqueService } from '../../../../../services/vhloRemolque.service';
import { VhloCfgCarroceriaService } from '../../../../../services/vhloCfgCarroceria.service';
import { VhloCfgMarcaService } from '../../../../../services/vhloCfgMarca.service';
import { VhloCfgLineaService } from '../../../../../services/vhloCfgLinea.service';
import { VhloCfgOrigenRegistroService } from '../../../../../services/vhloCfgOrigenRegistro.service';
import { VhloCfgCondicionIngresoService } from '../../../../../services/vhloCfgCondicionIngreso.service';
import { VhloCfgClaseService } from '../../../../../services/vhloCfgClase.service';
import { VhloPropietarioService } from 'app/services/vhloPropietario.service';
import { FroTrteSolicitudService } from 'app/services/froTrteSolicitud.service';
import { UserCfgTipoIdentificacionService } from '../../../../../services/userCfgTipoIdentificacion.service';
import { UserCiudadanoService } from '../../../../../services/userCiudadano.service';
import { LoginService } from '../../../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-edit-rnrspreregistro',
  templateUrl: './edit.component.html'
})

export class EditComponent implements OnInit {
  @Output() ready = new EventEmitter<any>();
  @Input() remolque: any = null;

  public errorMessage;
  public habilitar: any
  public formReady = false;

  public carrocerias: any;
  public carroceriaSelected: any;
  public marcas: any;
  public marcaSelected: any;
  public lineas: any;
  public lineaSelected: any;
  public origenRegistros: any;
  public origenRegistroSelected: any;
  public condicionIngresos: any;
  public condicionIngresoSelected: any;
  public clases: any;
  public claseSelected: any;
  public propietarios: any;
  public propietarioSelected: any;

  public tipoIdentificacionSelected: any;
  public tiposIdentificacion: any;

  public empresa: any = null;
  public ciudadano: any = null;
  public apoderado: any = null;
  public apoderadoSelected: any;

  public identificacion: any;
  public nit: any;
  public identificacionApoderado: any;
  public nitEmpresaTransporte: any;

  public placa: any;
  public serie: any;
  public vin: any;
  public largo: any;
  public alto: any;
  public ancho: any;
  public numeroEjes: any;
  public cargaUtil: any;
  public pesoVacio: any;
  public referencia: any;
  public modelo: any;
  public numeroFth: any;
  public rut: any;

  public realizoTramites = true;

  public tiposMatricula = [
    { 'value': 'RADICADO', 'label': "Radicado de cuenta" },
    { 'value': 'MATRICULA', 'label': "Matricula inicial" },
    { 'value': 'IMPORTACION', 'label': "Importación temporal" },
    { 'value': 'CARPETA', 'label': "Cargue de carpeta" }
  ];

  public datos = {
    'propietarios': [],
    'solidario': false,
    'tipoPropiedad': null,
    'numeroLicencia': null,
    'fechaLicencia': null,
    'idVehiculo': null,
  };

  constructor(
    private _PropietarioService: VhloPropietarioService,
    private _RegistroRemolqueService: VhloRemolqueService,
    private _LineaService: VhloCfgLineaService,
    private _ClaseService: VhloCfgClaseService,
    private _MarcaService: VhloCfgMarcaService,
    private _CarroceriaService: VhloCfgCarroceriaService,
    private _OrigenRegistroService: VhloCfgOrigenRegistroService,
    private _CondicionIngresoService: VhloCfgCondicionIngresoService,
    private _TramiteSolicitudService: FroTrteSolicitudService,
    private _TipoIdentificacionService: UserCfgTipoIdentificacionService,
    private _CiudadanoService: UserCiudadanoService,
    private _LoginService: LoginService,
  ) { }

  ngOnInit() {
    console.log(this.remolque);
    swal({
      title: 'Cargando Formulario!',
      text: 'Solo tardara unos segundos por favor espere.',
      timer: 2000,
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

    let token = this._LoginService.getToken();

    //Traer propietarios por vehiculo
    if (this.remolque.vehiculo.tipoMatricula == 'RADICADO') {
      swal({
        title: 'Buscando propietarios!',
        text: 'Solo tardará unos segundos, por favor espere.',
        type: 'info',
        showConfirmButton: false,
        onOpen: () => {
          swal.showLoading()
        }
      });

      this._PropietarioService.searchByVehiculo({ 'idVehiculo': this.remolque.vehiculo.id }, token).subscribe(
        response => {
          if (response.code == 200) {
            console.log("si encontro propeitarios");
            this.propietarios = response.data;
            console.log(this.propietarios);
            
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
            
            this._TramiteSolicitudService.searchByVehiculo({ 'idVehiculo': this.remolque.vehiculo.id }, token).subscribe(
              response => {
                if (response.code == 200) {
                  console.log("si encontro tramites");
                  this.realizoTramites = true;
                  swal.close();
                } else {
                  console.log("no encontro tramites");
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

    this._CarroceriaService.select().subscribe(
      response => {
        this.carrocerias = response;
        setTimeout(() => {
          this.carroceriaSelected = [this.remolque.vehiculo.carroceria.id];
        });
      },
      error => {
        this.errorMessage = <any>error;
        if (this.errorMessage != null) {
          console.log(this.errorMessage);
          alert('Error en la petición');
        }
      }
    );

    this._LineaService.select().subscribe(
      response => {
        this.lineas = response;
        setTimeout(() => {
          this.lineaSelected = [this.remolque.vehiculo.linea.id];
          this._MarcaService.select().subscribe(
            response => {
              this.marcas = response;
              setTimeout(() => {
                this.marcaSelected = [this.remolque.vehiculo.linea.marca.id];
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

    /* this._OrigenRegistroService.select().subscribe(
      response => {
        this.origenRegistros = response;
        setTimeout(() => {
          this.origenRegistroSelected = [this.remolque.origenRegistro.id];
        });
      },
      error => {
        this.errorMessage = <any>error;
        if (this.errorMessage != null) {
          console.log(this.errorMessage);
          alert('Error en la petición');
        }
      }
    );
    
    this._CondicionIngresoService.select().subscribe(
      response => {
        this.condicionIngresos = response;
        setTimeout(() => {
          this.condicionIngresoSelected = [this.remolque.condicionIngreso.id];
        });
      },
      error => {
        this.errorMessage = <any>error;
        if (this.errorMessage != null) {
          console.log(this.errorMessage);
          alert('Error en la petición');
        }
      }
    ); */
    this._ClaseService.select().subscribe(
      response => {
        this.clases = response;
        setTimeout(() => {
          this.claseSelected = [this.remolque.vehiculo.clase.id];
        });
      },
      error => {
        this.errorMessage = <any>error;
        if (this.errorMessage != null) {
          console.log(this.errorMessage);
          alert('Error en la petición');
        }
      }
    );

  }
  onCancelar() {
    this.ready.emit(true);
  }
  onEnviar() {

    let token = this._LoginService.getToken();

    /* this.remolque.origenRegistroId = this.origenRegistroSelected;
    this.remolque.condicionIngresoId = this.condicionIngresoSelected; */

    this.remolque.idLinea = this.lineaSelected;
    this.remolque.idMarca = this.marcaSelected;
    this.remolque.idClase = this.claseSelected;
    this.remolque.idCarroceria = this.carroceriaSelected;

    var html = 'Los datos del remolque serán editados !<br>';

    swal({
      title: 'Actualización de remolque!',
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

        this._RegistroRemolqueService.edit(this.remolque, token).subscribe(
          response => {
            if (response.code == 200) {
              //para eliminar los registros anteriores
              this.datos.idVehiculo = this.remolque.vehiculo.id;

              if (!this.realizoTramites && this.remolque.vehiculo.tipoMatricula == 'RADICADO') {
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
                title: response.title,
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

          });
      } else if (
        // Read more about handling dismissals
        result.dismiss === swal.DismissReason.cancel
      ) {

      }
    })
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
}
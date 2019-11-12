import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CfgOrganismoTransitoService } from '../../../../../services/cfgOrganismoTransito.service';
import { VhloCfgLineaService } from '../../../../../services/vhloCfgLinea.service';
import { VhloCfgClaseService } from '../../../../../services/vhloCfgClase.service';
import { VhloCfgCarroceriaService } from '../../../../../services/vhloCfgCarroceria.service';
import { VhloCfgColorService } from '../../../../../services/vhloCfgColor.service';
import { VhloCfgCombustibleService } from '../../../../../services/vhloCfgCombustible.service';
import { VhloCfgRadioAccionService } from '../../../../../services/vhloCfgRadioAccion.service';
import { VhloCfgModalidadTransporteService } from '../../../../../services/vhloCfgModalidadTransporte.service';
import { VhloCfgMarcaService } from '../../../../../services/vhloCfgMarca.service';
import { VhloMaquinariaService } from '../../../../../services/vhloMaquinaria.service';
import { PnalFuncionarioService } from '../../../../../services/pnalFuncionario.service';
import { VhloCfgTipoMaquinariaService } from '../../../../../services/vhloCfgTipoMaquinaria.service';
import { VhloCfgCondicionIngresoService } from '../../../../../services/vhloCfgCondicionIngreso.service';
import { VhloCfgTipoRodajeService } from '../../../../../services/vhloCfgTipoRodaje.service';
import { VhloCfgTipoCabinaService } from '../../../../../services/vhloCfgTipoCabina.service';
import { VhloCfgOrigenRegistroService } from '../../../../../services/vhloCfgOrigenRegistro.service';
import { VhloCfgSubpartidaArancelariaService } from '../../../../../services/vhloCfgSubpartidaArancelaria.service';
import { VhloCfgEmpresaGpsService } from '../../../../../services/vhloCfgEmpresaGps.service';
import { LoginService } from '../../../../../services/login.service';

import { DatePipe } from '@angular/common';
import swal from 'sweetalert2';

@Component({
  selector: 'app-edit-rnmapreregistro',
  templateUrl: './edit.component.html',
  providers: [DatePipe]
})

export class EditComponent implements OnInit {
  @Output() ready = new EventEmitter<any>();
  @Input() maquinaria:any = null;
  public errorMessage:any;

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
  public origenesRegistro: any;
  public condicionesIngreso: any;
  public tiposMaquinaria: any;
  public tiposRodaje: any;
  public tiposCabina: any;
  public clasesMaquinaria: any = null;
  public empresasGps: any;
  public subpartidasArancelarias: any;


  public empresaSelected: any;
  public tipoIdentificacionSelected: any;

  public lineaSelected: any;
  public claseSelected: any;
  public carroceriaSelected: any;
  public servicioSelected: any;
  public colorSelected: any;
  public marcaSelected: any;
  public combustibleSelected: any;
  public radioAccioSelected: any;
  public modalidadTransporteSelected: any;
  public organismoTransitoSelected: any;
  public organismoTransitoNacionaSelected: any;
  public origenRegistroSelected: any;
  public condicionIngresoSelected: any;
  public tipoMaquinariaSelected: any;
  public tipoRodajeSelected: any;
  public tipoCabinaSelected: any;
  public claseMaquinariaSelected: any = null;
  public empresaGpsSelected: any;
  public subpartidaArancelariaSelected: any;

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

  public tiposPropiedad = [
    { 'value': 1, 'label': "Leasing" },
    { 'value': 2, 'label': "Propio" }
  ];

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

  public radicado = {
    'fechaIngreso': null,
    'guiaLlegada': null,
    'empresaEnvio': null,
    'idOrganismoTransito': null,
    'idTipoIdentificacion': null,
  };

  constructor(
    private _MarcaService: VhloCfgMarcaService,
    private _LineaService: VhloCfgLineaService,
    private _ClaseService: VhloCfgClaseService,
    private _CarroceriaService: VhloCfgCarroceriaService,
    private _ColorService: VhloCfgColorService,
    private _CombustibleService: VhloCfgCombustibleService,
    private _RadioAccionService: VhloCfgRadioAccionService,
    private _ModalidadTransporteService: VhloCfgModalidadTransporteService,
    private _MaquinariaService: VhloMaquinariaService,
    private _OrganismoTransitoService: CfgOrganismoTransitoService,
    private _FuncionarioService: PnalFuncionarioService,
    private _TipoMaquinariaService: VhloCfgTipoMaquinariaService,
    private _CondicionIngresoService: VhloCfgCondicionIngresoService,
    private _TipoRodajeService: VhloCfgTipoRodajeService,
    private _TipoCabinaService: VhloCfgTipoCabinaService,
    private _OrigenRegistroService: VhloCfgOrigenRegistroService,
    private _SubpartidaArancelariaService: VhloCfgSubpartidaArancelariaService,
    private _EmpresaGpsService: VhloCfgEmpresaGpsService,
    private _LoginService: LoginService,
  ){}

  ngOnInit() {   
    console.log(this.maquinaria);
    swal({
      title: 'Cargando Formulario!',
      text: 'Solo tardara unos segundos por favor espere.',
      onOpen: () => {
        swal.showLoading()
      }
    });

    let token = this._LoginService.getToken();
    let identity = this._LoginService.getIdentity();

    setTimeout(() => {
      this.onChangedTipoMaquinaria(this.maquinaria.tipoMaquinaria.id);
      this.onChangedClase(this.maquinaria.vehiculo.clase.id);
    });

    var datePiper = new DatePipe('en-US');

    var date = new Date();
    date.setTime(this.maquinaria.fechaIngreso.timestamp * 1000);

    this.maquinaria.fechaIngreso = datePiper.transform(
      date, 'yyyy-MM-dd'
    );

    date.setTime(this.maquinaria.vehiculo.fechaFactura.timestamp * 1000);

    this.maquinaria.vehiculo.fechaFactura = datePiper.transform(
      date, 'yyyy-MM-dd'
    );


    this._MarcaService.select().subscribe(
      response => {
        this.marcas = response;

        setTimeout(() => {
          this.lineaSelected = [this.maquinaria.vehiculo.linea.id];
          this.marcaSelected = [this.maquinaria.vehiculo.linea.marca.id];
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

    this._OrganismoTransitoService.selectSedes().subscribe(
      response => {
        this.organismosTransito = response;
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
      },
      error => {
        this.errorMessage = <any>error;

        if (this.errorMessage != null) {
          console.log(this.errorMessage);
          alert("Error en la petición");
        }
      }
    );

    this._FuncionarioService.searchLogin({ 'identificacion': identity.identificacion }, token).subscribe(
      response => {
        if (response.code == 200) {
          this.funcionario = response.data;
          this.maquinaria.idOrganismoTransito = response.data.organismoTransito.id;
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

    this._ColorService.select().subscribe(
      response => {
        this.colores = response;

        setTimeout(() => {
          this.colorSelected = [this.maquinaria.vehiculo.color.id];
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

    this._CombustibleService.select().subscribe(
      response => {
        this.combustibles = response;

        setTimeout(() => {
          this.combustibleSelected = [this.maquinaria.vehiculo.combustible.id];
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

    this._RadioAccionService.select().subscribe(
      response => {
        this.radiosAccion = response;
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
      },
      error => {
        this.errorMessage = <any>error;

        if (this.errorMessage != null) {
          console.log(this.errorMessage);
          alert("Error en la petición");
        }
      }
    );

    this._TipoMaquinariaService.select().subscribe(
      response => {
        this.tiposMaquinaria = response;

        setTimeout(() => {
          this.tipoMaquinariaSelected = [this.maquinaria.tipoMaquinaria.id];
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

    this._CondicionIngresoService.select().subscribe(
      response => {
        this.condicionesIngreso = response;

        setTimeout(() => {
          this.condicionIngresoSelected  = [this.maquinaria.condicionIngreso.id];
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

    this._TipoRodajeService.select().subscribe(
      response => {
        this.tiposRodaje = response;

        setTimeout(() => {
          this.tipoRodajeSelected = [this.maquinaria.tipoRodaje.id];
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

    this._TipoCabinaService.select().subscribe(
      response => {
        this.tiposCabina = response;

        setTimeout(() => {
          this.tipoCabinaSelected = [this.maquinaria.tipoCabina.id];
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

    this._OrigenRegistroService.select().subscribe(
      response => {
        this.origenesRegistro = response;

        setTimeout(() => {
          this.origenRegistroSelected = [this.maquinaria.origenRegistro.id];
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

    this._SubpartidaArancelariaService.select().subscribe(
      response => {
        this.subpartidasArancelarias = response;

        setTimeout(() => {
          this.subpartidaArancelariaSelected = [this.maquinaria.subpartidaArancelaria.id];
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

    this._EmpresaGpsService.select().subscribe(
      response => {
        this.empresasGps = response;

        setTimeout(() => {
          this.empresaGpsSelected = [this.maquinaria.empresaGps.id];
        })
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

  onCancelar(){
    this.ready.emit(true);
  }

  onChangedMarca(e){
    if (e) {
      let token = this._LoginService.getToken()
        this._LineaService.selectByMarca({'idMarca':e}, token).subscribe(
          response => {
            this.lineas = response;
          }, 
          error => { 
            this.errorMessage = <any>error;
    
            if(this.errorMessage != null){
              console.log(this.errorMessage);
              alert("Error en la petición");
            }
          }
        );
    }
  }

  onChangedTipoMaquinaria(e) {
    if (e) {
      let token = this._LoginService.getToken()

      this._ClaseService.selectByTipoMaquinaria({ 'idTipoMaquinaria': e }, token).subscribe(
        response => {
          this.clasesMaquinaria = response;
          setTimeout(() => {
            this.claseSelected = [this.maquinaria.vehiculo.clase.id];
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
    }
  }

  onChangedClase(e){
    if (e) {
      let token = this._LoginService.getToken()
      this._CarroceriaService.selectByClase({'idClase':e}, token).subscribe(
        response => {
          this.carrocerias = response;

          setTimeout(() => {
            this.carroceriaSelected = [this.maquinaria.vehiculo.carroceria.id];
          });
        }, 
        error => { 
          this.errorMessage = <any>error;
  
          if(this.errorMessage != null){
            console.log(this.errorMessage);
            alert("Error en la petición");
          }
        }
      );
    }
  }

  /* onUpdate(){
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

  changedDepartamento(e){
    if (this.marcaSelected) {
      let token = this._LoginService.getToken()
        this._LineaService.selectByMarca(this.marcaSelected, token).subscribe(
          response => {
            console.log(response.data[0]);
            if (response.data[0] != null) {
              this.lineas = response.data;
            }else{
              this.lineas = [];
            }
          }, 
          error => { 
            this.errorMessage = <any>error;
    
            if(this.errorMessage != null){
              console.log(this.errorMessage);
              alert("Error en la petición");
            }
          }
        );
    }
    } */

  onEnviar() {
    let token = this._LoginService.getToken();

    this.maquinaria.idCondicionIngreso = this.condicionIngresoSelected;
    this.maquinaria.idColor = this.colorSelected;
    this.maquinaria.idTipoMaquinaria = this.tipoMaquinariaSelected ;
    this.maquinaria.idClaseMaquinaria = this.claseMaquinariaSelected ;
    this.maquinaria.idMarca = this.marcaSelected ;
    this.maquinaria.idLinea = this.lineaSelected ;
    this.maquinaria.idCarroceria = this.carroceriaSelected ;
    this.maquinaria.idTipoRodaje = this.tipoRodajeSelected ;
    this.maquinaria.idTipoCabina = this.tipoCabinaSelected ;
    this.maquinaria.idCombustible = this.combustibleSelected ;
    this.maquinaria.idOrigenRegistro = this.origenRegistroSelected ;
    this.maquinaria.idSubpartidaArancelaria = this.subpartidaArancelariaSelected ;
    this.maquinaria.idEmpresaGps = this.empresaGpsSelected ;

    swal({
      title: 'Actualización de automotor!',
      type: 'warning',
      html: 'Los datos del Automotor serán editados !<br>',
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

        this._MaquinariaService.edit(this.maquinaria, token).subscribe(
          response => {
            if (response.code == 200) {
              this.ready.emit(true);

              swal({
                title: response.title,
                text: response.message,
                type: response.status,
                confirmButtonText: 'Aceptar'
              })
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
}
import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { VhloRnmaPreregistro } from '../vhloRnmaPreregistro.modelo';
import { CfgOrganismoTransitoService } from '../../../../../services/cfgOrganismoTransito.service';
import { VhloCfgLineaService } from '../../../../../services/vhloCfgLinea.service';
import { VhloCfgClaseService } from '../../../../../services/vhloCfgClase.service';
import { VhloCfgCarroceriaService } from '../../../../../services/vhloCfgCarroceria.service';
import { VhloCfgServicioService } from '../../../../../services/vhloCfgServicio.service';
import { VhloCfgColorService } from '../../../../../services/vhloCfgColor.service';
import { VhloCfgCombustibleService } from '../../../../../services/vhloCfgCombustible.service';
import { VhloCfgRadioAccionService } from '../../../../../services/vhloCfgRadioAccion.service';
import { VhloCfgModalidadTransporteService } from '../../../../../services/vhloCfgModalidadTransporte.service';
import { VhloCfgMarcaService } from '../../../../../services/vhloCfgMarca.service';
import { VhloPropietarioService } from '../../../../../services/vhloPropietario.service';
import { VhloMaquinariaService } from '../../../../../services/vhloMaquinaria.service';
import { UserCfgTipoIdentificacionService } from '../../../../../services/userCfgTipoIdentificacion.service';
import { UserCiudadanoService } from '../../../../../services/userCiudadano.service';
import { PnalFuncionarioService } from '../../../../../services/pnalFuncionario.service';
import { VhloCfgTipoMaquinariaService } from '../../../../../services/vhloCfgTipoMaquinaria.service';
import { VhloCfgCondicionIngresoService } from '../../../../../services/vhloCfgCondicionIngreso.service';
import { VhloCfgTipoRodajeService } from '../../../../../services/vhloCfgTipoRodaje.service';
import { VhloCfgTipoCabinaService } from '../../../../../services/vhloCfgTipoCabina.service';
import { VhloCfgOrigenRegistroService } from '../../../../../services/vhloCfgOrigenRegistro.service';
import { VhloCfgSubpartidaArancelariaService } from '../../../../../services/vhloCfgSubpartidaArancelaria.service';
import { VhloCfgEmpresaGpsService } from '../../../../../services/vhloCfgEmpresaGps.service';
import { LoginService } from '../../../../../services/login.service';

import swal from 'sweetalert2';

@Component({
  selector: 'app-new-rnmapreregistro',
  templateUrl: './new.component.html'
})

export class NewComponent implements OnInit {
  @Output() ready = new EventEmitter<any>();
  public errorMessage:any;

  public maquinaria: VhloRnmaPreregistro;

  public lineas:any;
  public clases:any;
  public carrocerias:any;
  public servicios:any;
  public colores:any;
  public marcas:any;
  public combustibles:any;
  public radiosAccion:any;
  public modalidadesTransporte:any;
  public organismosTransito:any;
  public organismosTransitoNacional:any;
  public origenesRegistro: any;
  public condicionesIngreso: any;
  public tiposMaquinaria: any;
  public tiposRodaje: any;
  public tiposCabina: any;
  public clasesMaquinaria: any = null;
  public empresasGps: any;
  public subpartidasArancelarias: any;
  public empresaSelected:any;
  public tipoIdentificacionSelected:any;

  public ciudadano: any = null;
  public apoderado: any = null;
  public propietarioSelected: any;
  public apoderadoSelected:any;

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
    {'value':1,'label':"Leasing"},
    {'value':2,'label':"Propio"}
  ];

  public tiposMatricula = [
    {'value':'RADICADO','label':"Radicado de cuenta"},
    {'value':'MATRICULA','label':"Matricula inicial"},
    {'value':'IMPORTACION','label':"Importación temporal"},
    {'value':'CARPETA','label':"Cargue de carpeta"}
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
  private _PropietarioService: VhloPropietarioService,
  private _MarcaService: VhloCfgMarcaService,
  private _LineaService: VhloCfgLineaService,
  private _ClaseService: VhloCfgClaseService,
  private _CarroceriaService: VhloCfgCarroceriaService,
  private _ServicioService: VhloCfgServicioService,
  private _ColorService: VhloCfgColorService,
  private _CombustibleService: VhloCfgCombustibleService,
  private _RadioAccionService: VhloCfgRadioAccionService,
  private _ModalidadTransporteService: VhloCfgModalidadTransporteService,
  private _MaquinariaService: VhloMaquinariaService,
  private _OrganismoTransitoService: CfgOrganismoTransitoService,
  private _FuncionarioService: PnalFuncionarioService,
  private _TipoIdentificacionService: UserCfgTipoIdentificacionService,
  private _CiudadanoService: UserCiudadanoService,
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
    this.maquinaria = new VhloRnmaPreregistro(null, null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null);
    
    let token = this._LoginService.getToken();
    let identity = this._LoginService.getIdentity();

    this._TipoIdentificacionService.select().subscribe(
      response => {
        this.tiposIdentificacion = response;
      },
      error => {
        this.errorMessage = <any>error;

        if(this.errorMessage != null){
          console.log(this.errorMessage);
          alert('Error en la petición');
        }
      }
    );
    
    this._MarcaService.select().subscribe(
      response => {
        this.marcas = response;
      }, 
      error => { 
        this.errorMessage = <any>error;

        if(this.errorMessage != null){
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

        if(this.errorMessage != null){
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

        if(this.errorMessage != null){
          console.log(this.errorMessage);
          alert("Error en la petición");
        }
      }
    );

    this._FuncionarioService.searchLogin({ 'identificacion': identity.identificacion }, token).subscribe(
      response => { 
        if(response.code == 200){
          this.funcionario = response.data;
          this.maquinaria.idOrganismoTransito = response.data.organismoTransito.id;
        }else{
          this.funcionario = null;
          this._FuncionarioService.searchEmpresa({ 'identificacion': identity.identificacion },token).subscribe(
            response => {
              if(response.code == 200){
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
      error => {
          this.errorMessage = <any>error;
          if(this.errorMessage != null){
            console.log(this.errorMessage); 
            alert('Error en la petición');
          }
        }
      }
    );
    
    this._ClaseService.selectByModulo({ 'idModulo': 2 }, token).subscribe(
      response => {
        this.clases = response;
      }, 
      error => {
        this.errorMessage = <any>error;

        if(this.errorMessage != null){
          console.log(this.errorMessage);
          alert("Error en la petición");
        }
      }
    );

    this._ServicioService.select().subscribe(
      response => {
        this.servicios = response;
      }, 
      error => {
        this.errorMessage = <any>error;

        if(this.errorMessage != null){
          console.log(this.errorMessage);
          alert("Error en la petición");
        }
      }
    );

    this._ColorService.select().subscribe(
      response => {
        this.colores = response;
      },  
      error => {
        this.errorMessage = <any>error;

        if(this.errorMessage != null){
          console.log(this.errorMessage);
          alert("Error en la petición");
        }
      }
    );

    this._CombustibleService.select().subscribe(
      response => {
        this.combustibles = response;
      },  
      error => {
        this.errorMessage = <any>error;

        if(this.errorMessage != null){
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
        if(this.errorMessage != null){
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

        if(this.errorMessage != null){
          console.log(this.errorMessage);
          alert("Error en la petición");
        }
      }
    );

    this._TipoMaquinariaService.select().subscribe(
      response => {
        this.tiposMaquinaria = response;
      },  
      error => {
        this.errorMessage = <any>error;

        if(this.errorMessage != null){
          console.log(this.errorMessage);
          alert("Error en la petición");
        }
      }
    );

    this._CondicionIngresoService.select().subscribe(
      response => {
        this.condicionesIngreso = response;
      },  
      error => {
        this.errorMessage = <any>error;

        if(this.errorMessage != null){
          console.log(this.errorMessage);
          alert("Error en la petición");
        }
      }
    );

    this._TipoRodajeService.select().subscribe(
      response => {
        this.tiposRodaje = response;
      },  
      error => {
        this.errorMessage = <any>error;

        if(this.errorMessage != null){
          console.log(this.errorMessage);
          alert("Error en la petición");
        }
      }
    );

    this._TipoCabinaService.select().subscribe(
      response => {
        this.tiposCabina = response;
      },  
      error => {
        this.errorMessage = <any>error;

        if(this.errorMessage != null){
          console.log(this.errorMessage);
          alert("Error en la petición");
        }
      }
    );

    this._OrigenRegistroService.select().subscribe(
      response => {
        this.origenesRegistro = response;
      },  
      error => {
        this.errorMessage = <any>error;

        if(this.errorMessage != null){
          console.log(this.errorMessage);
          alert("Error en la petición");
        }
      }
    );

    this._SubpartidaArancelariaService.select().subscribe(
      response => {
        this.subpartidasArancelarias = response;
      },  
      error => {
        this.errorMessage = <any>error;

        if(this.errorMessage != null){
          console.log(this.errorMessage);
          alert("Error en la petición");
        }
      }
    );

    this._EmpresaGpsService.select().subscribe(
      response => {
        this.empresasGps = response;
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

  onChangedClase(e){
    if (e) {
      let token = this._LoginService.getToken()

      this._CarroceriaService.selectByClase({'idClase':e}, token).subscribe(
        response => {
          this.carrocerias = response;
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

  onUpdate(){
    this.maquinaria.vin = this.maquinaria.chasis;
    this.maquinaria.serie = this.maquinaria.chasis;
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
            //this.maquinaria.idEmpresa = this.empresaTransporte.id;

            swal({
              title: 'Perfecto!',
              text: response.message,
              type: 'success',
              confirmButtonText: 'Aceptar'
            });
          }
        } else {
          this.empresaTransporte = null;
          //this.maquinaria.idEmpresa = null;

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

  onChangedTipoMaquinaria(e) {
    if (e) {
      let token = this._LoginService.getToken()

      this._ClaseService.selectByTipoMaquinaria({ 'idTipoMaquinaria': e }, token).subscribe(
        response => {
          this.clasesMaquinaria = response;
          console.log(response);
          console.log(this.clasesMaquinaria);
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

    //this.maquinaria.radicado = this.radicado;

    var html = 'Que desea pre-registrar el maquinaria como:  <b>'+ this.maquinaria.tipoMatricula +
                '</b><br>Recuerde que solo podrá editar datos generales del vehículo.';

    swal({
      title: '¿Está seguro?',
      type: 'info',
      html:html,
      showCancelButton: true,
      confirmButtonColor: '#15d4be',
      cancelButtonColor: '#ff6262',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        swal({
          title: 'Preregistrando vehículo!',
          text: 'Solo tardara unos segundos por favor espere.',
          onOpen: () => {
            swal.showLoading()
          }
        });

        this._MaquinariaService.register(this.maquinaria, token).subscribe(
          response => {
            if (response.code == 200) {
              swal({
                title: response.title,
                text: response.message,
                type: response.status,
                confirmButtonText: 'Aceptar'
              });
              
              if (this.maquinaria.tipoMatricula == 'RADICADO' || this.maquinaria.tipoMatricula == 'IMPORTACION') {
                this.datos.idVehiculo = response.data.id;
                
                this._PropietarioService.register(this.datos, token).subscribe(
                  response => {
                    if (response.code == 200) {
                      this.ready.emit(true);
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
                this.ready.emit(true);
    
                swal({
                  title: 'Perfecto!',
                  text: response.message,
                  type: 'success',
                  confirmButtonText: 'Aceptar'
                })
              }
    
            } else {
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
    });
  }
} 
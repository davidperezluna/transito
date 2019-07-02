import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CfgOrganismoTransitoService } from '../../../services/cfgOrganismoTransito.service';
import { CfgMunicipioService } from '../../../services/cfgMunicipio.service';
import { VhloCfgLineaService } from '../../../services/vhloCfgLinea.service';
import { VhloCfgClaseService } from '../../../services/vhloCfgClase.service';
import { VhloCfgCarroceriaService } from '../../../services/vhloCfgCarroceria.service';
import { VhloCfgServicioService } from '../../../services/vhloCfgServicio.service';
import { VhloCfgColorService } from '../../../services/vhloCfgColor.service';
import { VhloCfgCombustibleService } from '../../../services/vhloCfgCombustible.service';
import { VehiculoService } from '../../../services/vehiculo.service';
import { VhloCfgMarcaService } from '../../../services/vhloCfgMarca.service';
import { VhloCfgRadioAccionService } from '../../../services/vhloCfgRadioAccion.service';
import { VhloCfgModalidadTransporteService } from '../../../services/vhloCfgModalidadTransporte.service';
import { VhloPropietarioService } from '../../../services/vhloPropietario.service';
import { VhloRnaPreregistroService } from '../../../services/vhloRnaPreregistro.service';
import { UserCfgTipoIdentificacionService } from '../../../services/userCfgTipoIdentificacion.service';
import { UserCiudadanoService } from '../../../services/userCiudadano.service';
import { UserEmpresaService } from "../../../services/userEmpresa.service";
import { PnalFuncionarioService } from '../../../services/pnalFuncionario.service';
import { LoginService } from '../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html'
})

export class EditComponent implements OnInit {
  @Output() ready = new EventEmitter<any>();
  @Input() vehiculo:any = null;
  public errorMessage:any;

  public municipios:any;
  public lineas:any;
  public clases:any;
  public carrocerias:any;
  public servicios:any;
  public colores:any;
  public marcas:any;
  public combustibles:any;
  public radioAcciones:any;
  public modalidadTransportes:any;
  public organismosTransito:any;
  public organismosTransitoNacional:any;

  public municipioSelected:any;
  public lineaSelected:any;
  public claseSelected:any;
  public carroceriaSelected:any;
  public servicioSelected:any;
  public colorSelected:any;
  public marcaSelected:any;
  public combustibleSelected:any;
  public radioAccionSelected:any;
  public modalidadTransporteSelected:any;
  public sedeOperativaSelected:any;

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
  'licenciaTransito': null,
  'idVehiculo': null,
};

public radicado = {
  'numeroDocumento': null,
  'fechaIngreso': null,
  'guiaLlegada': null,
  'empresaEnvio': null,
  'idOrganismoTransito': null,
  'idTipoIdentificacion': null,
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
  private _VehiculoService: VehiculoService,
  private _OrganismoTransitoService: CfgOrganismoTransitoService,
  private _RadioAccionService: VhloCfgRadioAccionService,
  private _ModalidadTransporteService: VhloCfgModalidadTransporteService,
  private _FuncionarioService: PnalFuncionarioService,
  private _TipoIdentificacionService: UserCfgTipoIdentificacionService,
  private _CiudadanoService: UserCiudadanoService,
  private _LoginService: LoginService,
  ){}

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

    this._FuncionarioService.searchLogin({ 'identificacion': identity.identificacion }, token).subscribe(
      response => { 
        if(response.status == 'success'){
          this.funcionario = response.data;
          this.vehiculo.idOrganismoTransito = response.data.organismoTransito.id;
        }else{
          this.funcionario = null;
          this._FuncionarioService.searchEmpresa({ 'identificacion': identity.identificacion },token).subscribe(
            response => {
              if(response.status == 'success'){
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
    
    this._LineaService.select().subscribe(
      response => {
        this.lineas = response;
        setTimeout(() => {
            this.lineaSelected = [this.vehiculo.linea.id]; 
            this._MarcaService.getMarcaSelect().subscribe(
              response => {
                this.marcas = response;
                setTimeout(() => {
                    this.marcaSelected = [this.vehiculo.linea.marca.id];
                })
              }, 
              error => { 
                this.errorMessage = <any>error;
        
                if(this.errorMessage != null){
                  console.log(this.errorMessage);
                  alert("Error en la petición");
                }
              }
            );
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
    this._ClaseService.select().subscribe(
      response => {
        this.clases = response;
        setTimeout(() => {
            this.claseSelected = [this.vehiculo.clase.id];
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
    this._CarroceriaService.select().subscribe(
      response => {
        this.carrocerias = response;
        setTimeout(() => {
            this.carroceriaSelected = [this.vehiculo.carroceria.id];
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
    this._ServicioService.select().subscribe(
      response => {
        this.servicios = response;
        setTimeout(() => {
            this.servicioSelected = [this.vehiculo.servicio.id];
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
    this._ColorService.select().subscribe(
      response => {
        this.colores = response;
        setTimeout(() => {
            this.colorSelected = [this.vehiculo.color.id];
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
    this._CombustibleService.select().subscribe(
      response => {
        this.combustibles = response;
        setTimeout(() => {
            this.combustibleSelected = [this.vehiculo.combustible.id];
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

    this._OrganismoTransitoService.selectSedes().subscribe(
      response => {
        this.organismosTransito = response;
        setTimeout(() => {
            this.sedeOperativaSelected = [this.vehiculo.organismoTransito.id];
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

        if(this.errorMessage != null){
          console.log(this.errorMessage);
          alert("Error en la petición");
        }
      }
    );

    this._MunicipioService.select().subscribe(
      response => {
        this.municipios = response;
        setTimeout(() => {
            this.municipioSelected = [this.vehiculo.municipio.id];
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
    this._RadioAccionService.select().subscribe(
      response => {
        this.radioAcciones = response;
        setTimeout(() => {
            this.radioAccionSelected = [this.vehiculo.radioAccion.id];
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
    
    this._ModalidadTransporteService.select().subscribe(
      response => {
        this.modalidadTransportes = response;
        setTimeout(() => {
            this.modalidadTransporteSelected = [this.vehiculo.modalidadTransporte.id];
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

  onEnviar(){
    console.log("hhhgfh");
    let token = this._LoginService.getToken();
    this.vehiculo.marcaId = this.marcaSelected;
    this.vehiculo.lineaId = this.lineaSelected;
    this.vehiculo.claseId = this.claseSelected;
    this.vehiculo.carroceriaId = this.carroceriaSelected;
    this.vehiculo.servicioId = this.servicioSelected;
    this.vehiculo.colorId = this.colorSelected;
    this.vehiculo.combustibleId = this.combustibleSelected;
    this.vehiculo.sedeOperativaId = this.sedeOperativaSelected;
    this.vehiculo.municipioId = this.municipioSelected;
    this.vehiculo.radioAccionId = this.radioAccionSelected;
    this.vehiculo.modalidadTransporteId = this.modalidadTransporteSelected;
     
    var html = 'los datos de la Automotor sera editados !<br>';
   
   swal({
      title: 'Actualización de automotor!',
      type: 'warning',
      html:html,
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText:
        '<i class="fa fa-thumbs-up"></i> Crear!',
      confirmButtonAriaLabel: 'Thumbs up, great!',
      cancelButtonText:
      '<i class="fa fa-thumbs-down"></i> No crear',
      cancelButtonAriaLabel: 'Thumbs down',
    }).then((result) => {
        if (result.value) {

    this._VehiculoService.editVehiculo(this.vehiculo,token).subscribe(
			response => {
        if(response.status == 'success'){
          this.ready.emit(true);
          swal({
            title: 'Perfecto!',
            text: 'Registro exitoso!',
            type: 'success',
            confirmButtonText: 'Aceptar'
          })
        }else{
          swal({
            title: 'Error!',
            text: 'El vehiculo '+ this.vehiculo.placa +' ya se encuentra registrado',
            type: 'error',
            confirmButtonText: 'Aceptar'
          })
        }
			error => {
					this.errorMessage = <any>error;

					if(this.errorMessage != null){
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
    }

}
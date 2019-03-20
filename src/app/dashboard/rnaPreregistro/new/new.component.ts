import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { RnaPreregistro } from '../rnaPreregistro.modelo';
import { CfgOrganismoTransitoService } from '../../../services/cfgOrganismoTransito.service';
import { VhloCfgLineaService } from '../../../services/vhloCfgLinea.service';
import { VhloCfgClaseService } from '../../../services/vhloCfgClase.service';
import { VhloCfgCarroceriaService } from '../../../services/vhloCfgCarroceria.service';
import { VhloCfgServicioService } from '../../../services/vhloCfgServicio.service';
import { VhloCfgColorService } from '../../../services/vhloCfgColor.service';
import { VhloCfgCombustibleService } from '../../../services/vhloCfgCombustible.service';
import { VhloCfgRadioAccionService } from '../../../services/vhloCfgRadioAccion.service';
import { VhloCfgModalidadTransporteService } from '../../../services/vhloCfgModalidadTransporte.service';
import { VhloCfgMarcaService } from '../../../services/vhloCfgMarca.service';
import { UserCfgTipoIdentificacionService } from '../../../services/userCfgTipoIdentificacion.service';
import { UserCiudadanoService } from '../../../services/userCiudadano.service';
import { UserEmpresaService } from "../../../services/userEmpresa.service";
import { PnalFuncionarioService } from '../../../services/pnalFuncionario.service';
import { VhloPropietarioService } from '../../../services/vhloPropietario.service';
import { RnaPreregistroService } from '../../../services/rnaPreregistro.service';
import { LoginService } from '../../../services/login.service';

import swal from 'sweetalert2';
@Component({
  selector: 'app-new',
  templateUrl: './new.component.html'
})
export class NewRnaPreregistroComponent implements OnInit {
  @Output() ready = new EventEmitter<any>();
  public errorMessage:any;

  public vehiculo: RnaPreregistro;

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

  public empresaSelected:any;

  public tipoIdentificacionSelected:any;

  public ciudadano: any = null;
  public apoderado: any = null;
  public propietarioSelected: any;
  public apoderadoSelected:any;

  public empresa: any = null;

  public tiposIdentificacion: any;
  public identificacion: any;
  public identificacionApoderado: any;
  public nit: any;

  public formApoderado = false;
  public funcionario: any = null;

  public tiposPropiedad = [
    {'value':1,'label':"Leasing"},
    {'value':2,'label':"Propio"}
  ];

  public tipoPropiedadSelected:any;

  public tipoMatricula = [
    {'value':'RADICADO','label':"Radicado"},
    {'value':'MATRICULA INICIAL','label':"Matricula inicial"},
    {'value':'IMPORTACION TEMPORAL','label':"Importación temporal"}
  ];

  public datos = {
    'propietarios': [],
    'solidario': false,
    'tipoPropiedad': null,
    'licenciaTransito': null,
    'idVehiculo': null,
  };

constructor(
  private _PropietarioService: VhloPropietarioService,
  private _MarcaService: VhloCfgMarcaService,
  private _lineaService: VhloCfgLineaService,
  private _ClaseService: VhloCfgClaseService,
  private _CarroceriaService: VhloCfgCarroceriaService,
  private _ServicioService: VhloCfgServicioService,
  private _ColorService: VhloCfgColorService,
  private _CombustibleService: VhloCfgCombustibleService,
  private _CfgRadioAccionService: VhloCfgRadioAccionService,
  private _ModalidadTransporteService: VhloCfgModalidadTransporteService,
  private _RnaPreregistroService: RnaPreregistroService,
  private _OrganismoTransitoService: CfgOrganismoTransitoService,
  private _FuncionarioService: PnalFuncionarioService,
  private _TipoIdentificacionService: UserCfgTipoIdentificacionService,
  private _CiudadanoService: UserCiudadanoService,
  private _EmpresaService: UserEmpresaService,
  private _LoginService: LoginService,
  ){}

  ngOnInit() {
    this.vehiculo = new RnaPreregistro(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null);
    
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
    
    this._MarcaService.getMarcaSelect().subscribe(
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

    this._FuncionarioService.searchLogin({ 'identificacion': identity.identificacion }, token).subscribe(
      response => { 
        if(response.status == 'success'){
          this.vehiculo.idOrganismoTransito = Number[response.data.organismoTransito.id];
          this.funcionario = response.data;
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

    this._CarroceriaService.select().subscribe(
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

    this._CfgRadioAccionService.select().subscribe(
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
  }

  onCancelar(){
    this.ready.emit(true);
  }

  onChangedMarca(e){
    if (e) {
      let token = this._LoginService.getToken()
        this._lineaService.searchByMarcaSelect({'idMarca':e}, token).subscribe(
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

/*
  btnNewCiudadano(){
      if (this.tipoPropiedadSelected == 2) {
          this.datos.propietariosCiudadanos.push(
              {'identificacion':this.ciudadano.identificacion,
              'nombre':this.ciudadano.primerNombre+" "+this.ciudadano.segundoNombre,
              'permisoTramite':this.datos.solidario,
              'propietarioPresente':this.propietarioPresente
              }   
          );
      }else{
          this.datos.propietariosCiudadanos.push(
                  {'identificacion':this.ciudadano.identificacion,
                  'nombre':this.ciudadano.primerNombre+" "+this.ciudadano.segundoNombre,
                  'permisoTramite':this.propietario
              }   
          );
          if (this.propietario) {
              this.propietario = false
          }
      }

      this.ciudadanoEncontrado=1;
      this.listaPropietariosCiudadanos=true;
  }

  btnNewEmpresa(){
      if (this.tipoPropiedadSelected == 2) {
          this.datos.propietariosEmpresas.push(
              {'nit':this.empresa.nit,
              'nombre':this.empresa.nombre,
              'permisoTramite':this.datos.solidario,
              'propietarioPresente':this.propietarioPresente
              }   
          );
      }else{
          this.datos.propietariosEmpresas.push(
                  {'nit':this.empresa.nit,
                  'nombre':this.empresa.nombre,
                  'permisoTramite':this.propietario
              }   
          );
          if (this.propietario) {
              this.propietario = false
          }
      }   
      this.empresaEncontrada=1;
      this.listaPropietariosEmpresas=true;
  }

  btnNewApoderado(){
      if (this.apoderado == 'ciudadano') {
          this.datos.propietariosCiudadanos =  this.datos.propietariosCiudadanos.filter(h => h !== this.ciudadanoSelected[0]);
          this.datos.propietariosCiudadanos.push(
              {'identificacion':this.ciudadanoSelected[0].identificacion,
              'nombre':this.ciudadanoSelected[0].nombre,
              'permisoTramite':this.ciudadanoSelected[0].permisoTramite,
              'propietarioPresente':this.ciudadanoSelected[0].propietarioPresente,
              'identificacionApoderado':this.apoderadoSelected.identificacion,
              'nombreApoderado':this.apoderadoSelected.primerNombre+" "+this.apoderadoSelected.segundoNombre,
              }   
          )
          this.apoderado = 'false'
          this.tipoIdentificacionSelected = [this.tipoIdentificacionSelected];
          this.listaPropietariosCiudadanos=true;
      }
      if (this.apoderado == 'empresa') {
          this.datos.propietariosEmpresas =  this.datos.propietariosEmpresas.filter(h => h !== this.empresaSelected[0]);
          this.datos.propietariosEmpresas.push(
              {'nit':this.empresaSelected[0].nit,
              'nombre':this.empresaSelected[0].nombre,
              'permisoTramite':this.empresaSelected[0].permisoTramite,
              'identificacionApoderado':this.apoderadoSelected.identificacion,
              'nombreApoderado':this.apoderadoSelected.primerNombre+" "+this.apoderadoSelected.segundoNombre,
              }   
          );
          this.apoderado = 'false'
          this.tipoIdentificacionSelected = [this.tipoIdentificacionSelected];
          this.listaPropietariosEmpresas=true;
      }
  }
  */

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
    let token = this._LoginService.getToken();

    let nit = {
      'nit': this.nit,
    };

    this._EmpresaService.showByNit(token, nit).subscribe(
      response => {
        if (response.status == 'success') {
          this.empresa = response.data;
        } else {
          this.empresa = null;
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

  onAddCiudadano() {
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
        text: 'El registro seleccionado ya se encuentra agregado como propietario.s',
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

  /*
  delete(ciudadano:any): void {
    this.datos.propietariosCiudadanos =  this.datos.propietariosCiudadanos.filter(h => h !== ciudadano);
    if (this.datos.propietariosCiudadanos.length === 0) {
        this.listaPropietariosCiudadanos = false;
    }
    if(ciudadano.permisoTramite){
        this.propietario = true;
    }
  }
  deleteEmpresa(empresa:any): void {
      this.datos.propietariosEmpresas =  this.datos.propietariosEmpresas.filter(h => h !== empresa);
      if (this.datos.propietariosEmpresas.length === 0) {
          this.listaPropietariosEmpresas = false;
      }
      if(empresa.permisoTramite){
          this.propietario = true;
      }
  }*/

  onEnviar() {
    let token = this._LoginService.getToken();

    this._RnaPreregistroService.register(this.vehiculo, token).subscribe(
      response => {
        if (response.status == 'success') {
          if (this.vehiculo.tipoMatricula == 'RADICADO' || this.vehiculo.tipoMatricula == 'IMPORTACION TEMPORAL') {
            this.datos.idVehiculo = response.data.id;
            this.datos.licenciaTransito = this.vehiculo.numeroLicencia;
            this._PropietarioService.register(this.datos, token).subscribe(
              response => {
                if (response.code == 200) {
                  this.ready.emit(true);

                  swal({
                    title: 'Perfecto!',
                    text: response.message,
                    type: 'success',
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
              text: 'Registro exitoso!',
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
} 
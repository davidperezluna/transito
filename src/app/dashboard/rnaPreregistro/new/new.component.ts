import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { RnaPreregistro } from '../rnaPreregistro.modelo';
import { CfgDepartamentoService } from "../../../services/cfgDepartamento.service";
import { CfgMunicipioService } from '../../../services/cfgMunicipio.service';
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
import { MpersonalFuncionarioService } from '../../../services/mpersonalFuncionario.service';
import { CiudadanoVehiculoService } from '../../../services/ciudadanoVehiculo.service';
import { RnaPreregistroService } from '../../../services/rnaPreregistro.service';
import { LoginService } from '../../../services/login.service';

import swal from 'sweetalert2';
@Component({
  selector: 'app-new',
  templateUrl: './new.component.html'
})
export class NewRnaPreregistroComponent implements OnInit {
@Output() ready = new EventEmitter<any>();
public vehiculo: RnaPreregistro;
public municipios:any;
public errorMessage:any;
public habilitar:any;
public lineas:any;
public clases:any;
public carrocerias:any;
public servicios:any;
public colores:any;
public marcas:any;
public combustibles:any;
public radiosAccion:any;
public empresaSelected:any;
public modalidadesTransporte:any;
public municipioSelected:any;
public lineaSelected:any;
public claseSelected:any;
public carroceriaSelected:any;
public apoderadoSelected:any;
public ciudadanoSelected:any;
public servicioSelected:any;
public colorSelected:any;
public marcaSelected:any;
public sedeOperativaSelected:any;
public combustibleSelected:any;
public radioAccionSelected:any;
public modalidadTransporteSelected:any;
public tipoIdentificacionSelected:any;
public respuesta:any;
public organismosTransito:any;
public tipoIdentificaciones:any;
public ciudadanoEncontrado=1;
public empresaEncontrada=1;
public ciudadano:any;
public apoderado = 'false';
public ciudadanoNew:any;
public licenciaTransito:any;
public empresa:any;
public nit:any;
public propietarioPresente:any;
public listaPropietariosCiudadanos=false;
public listaPropietariosEmpresas=false;
public empresaNew=false;
public radicado=false;
public apoderadoEncontrado=1;
public identificacion:any;
public persona:any='empresa';
public tipoPropiedadSelected:any;
public sedeOperativa:any;
public identificacionApoderado:any;
public tipoMatriculaSelect:any;
public btnRadicado:any = 'Preregistro para matricula inicial';
public propietario = true;
public campo = false;

public tipoPropiedades= [
  {'value':1,'label':"Leasing"},
  {'value':2,'label':"Propio"}
];

public tipoMatricula= [
  {'value':'RADICADO','label':"Radicado"},
  {'value':'MATRICULA INICIAL','label':"Matricula inicial"},
  {'value':'IMPORTACIÓN TEMPORAL','label':"Importación temporal"}
];

    
public datos = {
  'propietariosEmpresas': [],
  'propietariosCiudadanos': [],
  'solidario': false,
  'vehiculo': null,
  'sustrato': null,
  'licenciaTransito': null,
  'tramiteFormulario': null,
  'facturaId': null,
};

constructor(
  private _MunicipioService: CfgMunicipioService,
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
  private _TipoIdentificacionService: UserCfgTipoIdentificacionService,
  private _FuncionarioService: MpersonalFuncionarioService,
  private _UserCiudadanoService: UserCiudadanoService,
  private _EmpresaService: UserEmpresaService,
  private _CiudadanoVehiculoService: CiudadanoVehiculoService,
  private _loginService: LoginService,
  ){}

  ngOnInit() {
    this.vehiculo = new RnaPreregistro(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null);
    
    let token = this._loginService.getToken();
    let identity = this._loginService.getIdentity();
    let datos = {'identificacion':identity.identificacion};
    
    this._TipoIdentificacionService.select().subscribe(
      response => {
        this.tipoIdentificaciones = response;
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

    this._MunicipioService.select().subscribe(
      response => {
        this.municipios = response;
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

    this._FuncionarioService.searchLogin(datos,token).subscribe(
      response => { 
        if(response.status == 'success'){
          this.persona='funcionario';
          this.sedeOperativa = response.data.sedeOperativa;
          this.sedeOperativaSelected = [this.sedeOperativa.id];
        }else{
          this._FuncionarioService.searchEmpresa(datos,token).subscribe(
            response => {
              if(response.status == 'success'){
                this.persona='empresa';
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
    });
    
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
  onEnviar(){
    this.vehiculo.municipioId = this.municipioSelected;
    this.vehiculo.lineaId = this.lineaSelected;
    this.vehiculo.clase = this.claseSelected;
    this.vehiculo.carroceriaId = this.carroceriaSelected;
    this.vehiculo.servicioId = this.servicioSelected;
    this.vehiculo.colorId = this.colorSelected;
    this.vehiculo.combustibleId = this.combustibleSelected;
    this.vehiculo.radioAccionId = this.radioAccionSelected;
    this.vehiculo.modalidadTransporteId = this.modalidadTransporteSelected;
    this.vehiculo.sedeOperativaId = this.sedeOperativaSelected;
    this.vehiculo.tipoMatricula = this.tipoMatriculaSelect;
    let datos = { 
      'vehiculo':this.vehiculo,
      'sedeOperativaId':this.sedeOperativa.id,
      'persona':this.persona,
    }

    this.datos.vehiculo = this.vehiculo;
    this.datos.licenciaTransito = this.licenciaTransito;
    this.datos.tramiteFormulario = 'rna-matriculainicial';
    let token = this._loginService.getToken(); 

    console.log(this.datos);
    
    this._RnaPreregistroService.register(datos, token).subscribe(
			response => {
        this.respuesta = response;
        if(this.respuesta.status == 'success'){
          if (this.tipoMatriculaSelect == 'RADICADO') {
            this._CiudadanoVehiculoService.register(token,this.datos,this.tipoPropiedadSelected).subscribe(
              response => {
                this.ready.emit(true);
                swal({
                  title: 'Perfecto!',
                  text: 'Registro exitoso!',
                  type: 'success',
                  confirmButtonText: 'Aceptar'
                })
              },
              error => {
                this.errorMessage = <any>error;
        
                if(this.errorMessage != null){
                  console.log(this.errorMessage);
                  alert('Error en la petición');
                }
              }
            );
          }else{
            this.ready.emit(true);
            swal({
              title: 'Perfecto!',
              text: 'Registro exitoso!',
              type: 'success',
              confirmButtonText: 'Aceptar'
            })
          }
          
        }else{
          swal({
            title: 'Error!',
            text: this.respuesta.msj,
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
  }

  onChangedMarca(e){
    if (e) {
      let token = this._loginService.getToken()
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

  onRadicado(){
    if(this.radicado) {
      this.radicado = false; 
      this.btnRadicado = 'Preregistro para matricula inicial';
    }else{
      this.btnRadicado = 'Preregistro para radicado de cuenta';
      this.radicado = true; 
    }
    // alert(this.btnRadicado); 
  }

  changedtipoIdentificacion(e){
    this.ciudadanoEncontrado = 1;
    this.empresaEncontrada = 1;
  }

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

  onKeyCiudadano(){ 
    let token = this._loginService.getToken();
    let identificacion = {
      'numeroIdentificacion' : this.identificacion,
    };
    this._UserCiudadanoService.searchByIdentificacion(identificacion, token).subscribe(
        response => {
            this.respuesta = response; 
            if(this.respuesta.status == 'success'){
                this.ciudadano = this.respuesta.data;
                this.ciudadanoEncontrado= 2;
                this.ciudadanoNew = false;
        }else{
            this.ciudadanoEncontrado=3;
            this.ciudadanoNew = true;
        }
        error => {
                this.errorMessage = <any>error;
            
                if(this.errorMessage != null){
                    console.log(this.errorMessage);
                    alert("Error en la petición");
                }
            }
    }); 
}

onKeyApoderado(){
    let token = this._loginService.getToken();
    let identificacion = {
  'numeroIdentificacion' : this.identificacionApoderado,
    };
    this._UserCiudadanoService.searchByIdentificacion(token,identificacion).subscribe(
        response => {
            this.respuesta = response; 
            if(this.respuesta.status == 'success'){
                this.apoderadoSelected = this.respuesta.data;
                // this.ciudadanoNew = false;
        }else{
            this.apoderadoEncontrado=3;
            // this.ciudadanoNew = true;
        }
        error => {
                this.errorMessage = <any>error;
            
                if(this.errorMessage != null){
                    console.log(this.errorMessage);
                    alert("Error en la petición");
                }
            }
    }); 
}

onKeyEmpresa(){
    let token = this._loginService.getToken();
    let nit = {
      'nit' : this.nit,
    };
    this._EmpresaService.showByNit(token,nit).subscribe(
        response => {
            this.respuesta = response; 
            if(this.respuesta.status == 'success'){
                this.empresa = this.respuesta.data;
                this.empresaEncontrada= 2;
        }else{
            this.empresaEncontrada=3;
        }
        error => {
                this.errorMessage = <any>error;
            
                if(this.errorMessage != null){
                    console.log(this.errorMessage);
                    alert("Error en la petición");
                }
            }
    }); 
  }
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
  }
} 
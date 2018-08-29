import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { RnaPreregistro } from '../rnaPreregistro.modelo';
import { DepartamentoService } from "../../../services/departamento.service";
import { LoginService } from '../../../services/login.service';
import { MunicipioService } from '../../../services/municipio.service';
import { LineaService } from '../../../services/linea.service';
import { ClaseService } from '../../../services/clase.service';
import { CarroceriaService } from '../../../services/carroceria.service';
import { ServicioService } from '../../../services/servicio.service';
import { ColorService } from '../../../services/color.service';
import { CombustibleService } from '../../../services/combustible.service';
import { CfgRadioAccionService } from '../../../services/cfgRadioAccion.service';
import { CfgModalidadTransporteService } from '../../../services/cfgModalidadTransporte.service';
import { RnaPreregistroService } from '../../../services/rnaPreregistro.service';
import { SedeOperativaService } from '../../../services/sedeOperativa.service';
import { MarcaService } from '../../../services/marca.service';
import { TipoIdentificacionService } from '../../../services/tipoIdentificacion.service';
import { CiudadanoService } from '../../../services/ciudadano.service';
import { EmpresaService } from "../../../services/empresa.service";
import { CiudadanoVehiculoService } from '../../../services/ciudadanoVehiculo.service';
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
public modalidadesTransporte:any;
public municipioSelected:any;
public lineaSelected:any;
public claseSelected:any;
public carroceriaSelected:any;
public servicioSelected:any;
public colorSelected:any;
public marcaSelected:any;
public sedeOperativaSelected:any;
public combustibleSelected:any;
public radioAccionSelected:any;
public modalidadTransporteSelected:any;
public respuesta:any;
public sedesOperativas:any;
public tipoIdentificaciones:any;
public ciudadanoEncontrado=1;
public empresaEncontrada=1;
public ciudadano:any;
public ciudadanoNew:any;
public empresa:any;
public nit:any;
public propietarioPresente:any;
public listaPropietariosCiudadanos=false;
public listaPropietariosEmpresas=false;
public empresaNew=false;
public identificacion:any;
public tipoPropiedadSelected:any;
public propietario = true;
public tipoPropiedades= [
  {'value':1,'label':"Leasing"},
  {'value':2,'label':"Propio"}
];

public datos = {
  'propietariosEmpresas': [],
  'propietariosCiudadanos': [],
  'solidario': false,
  'vehiculo': null,
  'sustrato': null,
  'numeroLicencia': null,
  'tramiteFormulario': null,
  'facturaId': null,
};

constructor(
  private _departamentoService: DepartamentoService,
  private _loginService: LoginService,
  private _MunicipioService: MunicipioService,
  private _MarcaService: MarcaService,
  private _lineaService: LineaService,
  private _ClaseService: ClaseService,
  private _CarroceriaService: CarroceriaService,
  private _ServicioService: ServicioService,
  private _ColorService: ColorService,
  private _CombustibleService: CombustibleService,
  private _CfgRadioAccionService: CfgRadioAccionService,
  private _CfgModalidadTransporteService: CfgModalidadTransporteService,
  private _RnaPreregistroService: RnaPreregistroService,
  private _SedeOperativaService: SedeOperativaService,
  private _tipoIdentificacionService: TipoIdentificacionService,
  private _CiudadanoService: CiudadanoService,
  private _EmpresaService: EmpresaService,
  private _CiudadanoVehiculoService: CiudadanoVehiculoService,
  ){}

  ngOnInit() {
    this.vehiculo = new RnaPreregistro(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null);
    
    this._tipoIdentificacionService.getTipoIdentificacionSelect().subscribe(
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
    this._MunicipioService.getMunicipioSelect().subscribe(
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
    this._SedeOperativaService.getSedeOperativaSelect().subscribe(
      response => {
        this.sedesOperativas = response;
      }, 
      error => {
        this.errorMessage = <any>error;

        if(this.errorMessage != null){
          console.log(this.errorMessage);
          alert("Error en la petición");
        }
      }
    );
    this._ClaseService.getClasePorModuloSelect(2).subscribe(
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
    this._CarroceriaService.getCarroceriaSelect().subscribe(
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
    this._ServicioService.getServicioSelect().subscribe(
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
    this._ColorService.getColorSelect().subscribe(
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
    this._CombustibleService.getCombustibleSelect().subscribe(
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

    this._CfgRadioAccionService.getCfgRadioAccionSelect().subscribe(
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

    this._CfgModalidadTransporteService.getCfgModalidadTransporteSelect().subscribe(
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
    this.vehiculo.claseId = this.claseSelected;
    this.vehiculo.carroceriaId = this.carroceriaSelected;
    this.vehiculo.servicioId = this.servicioSelected;
    this.vehiculo.colorId = this.colorSelected;
    this.vehiculo.combustibleId = this.combustibleSelected;
    this.vehiculo.radioAccionId = this.radioAccionSelected;
    this.vehiculo.modalidadTransporteId = this.modalidadTransporteSelected;
    this.vehiculo.sedeOperativaId = this.sedeOperativaSelected;
    let datos = { 
      'vehiculo':this.vehiculo,
      'datosPropietarios':this.datos,
    }

    let token = this._loginService.getToken();
    this._RnaPreregistroService.register(datos,token).subscribe(
			response => {
        this.respuesta = response;
        if(this.respuesta.status == 'success'){
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
            text: 'El vehiculo '+ this.vehiculo.id +' ya se encuentra registrado',
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

  changedDepartamento(e){
    if (this.marcaSelected) {
      let token = this._loginService.getToken()
        this._lineaService.getLineasMar(this.marcaSelected, token).subscribe(
          response => { 
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

    changedtipoIdentificacion(e){
      this.ciudadanoEncontrado = 1;
      this.empresaEncontrada = 1;
  }
  onKeyCiudadano(){
    let token = this._loginService.getToken();
    let identificacion = {
    'numeroIdentificacion' : this.identificacion,
      };
      this._CiudadanoService.searchByIdentificacion(token,identificacion).subscribe(
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
  onKeyEmpresa(){
    let token = this._loginService.getToken();
    
      this._EmpresaService.showNit(token,this.nit).subscribe(
          response => {
              this.respuesta = response; 
              if(this.respuesta.status == 'success'){
                  this.empresa = this.respuesta.data;
                  this.empresaEncontrada= 2;
          }else{
              this.empresaEncontrada=3;
              this.empresaNew = true;
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
  
  readyCiudadano(isCreado:any){
      if(isCreado) {
        this.onKeyCiudadano();
      }else{
        this.ciudadanoNew = false; 
      }
  }

  readyEmpresa(isCreado:any){
      if(isCreado) {
        this.onKeyEmpresa();
      }else{
        this.empresaNew = false; 
      }
  }
}
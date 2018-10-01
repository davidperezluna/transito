import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import {DepartamentoService} from "../../../services/departamento.service";
import {LoginService} from '../../../services/login.service';
import {MunicipioService} from '../../../services/municipio.service';
import {LineaService} from '../../../services/linea.service';
import {ClaseService} from '../../../services/clase.service';
import {CarroceriaService} from '../../../services/carroceria.service';
import {ServicioService} from '../../../services/servicio.service';
import {ColorService} from '../../../services/color.service';
import {CombustibleService} from '../../../services/combustible.service';
import {VehiculoService} from '../../../services/vehiculo.service';
import {SedeOperativaService} from '../../../services/sedeOperativa.service';
import {MarcaService} from '../../../services/marca.service';
import {CfgRadioAccionService} from '../../../services/cfgRadioAccion.service';
import {CfgModalidadTransporteService} from '../../../services/cfgModalidadTransporte.service';
import swal from 'sweetalert2';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html'
})
export class EditComponent implements OnInit {
@Output() ready = new EventEmitter<any>();
@Input() vehiculo:any = null;
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
public radioAcciones:any;
public modalidadTransportes:any;
public municipioSelected:any;
public lineaSelected:any;
public claseSelected:any;
public carroceriaSelected:any;
public servicioSelected:any;
public colorSelected:any;
public sedeOperativaSelected:any;
public marcaSelected:any;
public combustibleSelected:any;
public radioAccionSelected:any;
public modalidadTransporteSelected:any;
public respuesta:any;
public sedesOperativas:any;

constructor(
  private _departamentoService: DepartamentoService,
  private _loginService: LoginService,
  private _MunicipioService: MunicipioService,
  private _LineaService: LineaService,
  private _ClaseService: ClaseService,
  private _CarroceriaService: CarroceriaService,
  private _ServicioService: ServicioService,
  private _MarcaService: MarcaService,
  private _ColorService: ColorService,
  private _CombustibleService: CombustibleService,
  private _VehiculoService: VehiculoService,
  private _SedeOperativaService: SedeOperativaService,
  private _CfgRadioAccionService: CfgRadioAccionService,
  private _CfgModalidadTransporteService: CfgModalidadTransporteService,
  ){}

  ngOnInit() {
    console.log("hola");
    console.log(this.vehiculo);
    
    swal({
      title: 'Cargando Formulario!',
      text: 'Solo tardara unos segundos por favor espere.',
      timer: 3000,
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
    this._ClaseService.getClaseSelect().subscribe(
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
    this._CarroceriaService.getCarroceriaSelect().subscribe(
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
    this._ServicioService.getServicioSelect().subscribe(
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
    this._CombustibleService.getCombustibleSelect().subscribe(
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
    this._SedeOperativaService.getSedeOperativaSelect().subscribe(
      response => {
        this.sedesOperativas = response;
        setTimeout(() => {
            this.sedeOperativaSelected = [this.vehiculo.sedeOperativa.id];
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
    this._MunicipioService.getMunicipioSelect().subscribe(
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
    this._CfgRadioAccionService.getCfgRadioAccionSelect().subscribe(
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
    this._CfgModalidadTransporteService.getCfgModalidadTransporteSelect().subscribe(
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

  onEnviar(){
    console.log("hhhgfh");
    let token = this._loginService.getToken();
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
        this.respuesta = response; 
        console.log(this.respuesta); 
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
      let token = this._loginService.getToken()
        this._LineaService.searchByMarcaSelectSelect(this.marcaSelected, token).subscribe(
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
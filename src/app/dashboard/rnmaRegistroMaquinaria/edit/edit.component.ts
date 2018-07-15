import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import { RegistroMaquinaria } from '../newRnmaRegistroMaquinaria.modelo';
import {DepartamentoService} from "../../../services/departamento.service";
import {LoginService} from '../../../services/login.service';
import {MunicipioService} from '../../../services/municipio.service';
import {LineaService} from '../../../services/linea.service';
import {ClaseService} from '../../../services/clase.service';
import {CarroceriaService} from '../../../services/carroceria.service';
import {ServicioService} from '../../../services/servicio.service';
import {ColorService} from '../../../services/color.service';
import {CombustibleService} from '../../../services/combustible.service';
import {RegistroMaquinariaService} from '../../../services/registroMaquinaria.service';
import {SedeOperativaService} from '../../../services/sedeOperativa.service';
import {MarcaService} from '../../../services/marca.service';
import swal from 'sweetalert2';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html'
})
export class EditComponent implements OnInit {
@Output() ready = new EventEmitter<any>();
@Input() registroMaquinaria:any = null;
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
public municipioSelected:any;
public lineaSelected:any;
public claseSelected:any;
public carroceriaSelected:any;
public servicioSelected:any;
public colorSelected:any;
public sedeOperativaSelected:any;
public marcaSelected:any;
public combustibleSelected:any;
public respuesta:any;
public sedesOperativas:any;

constructor(
  private _departamentoService: DepartamentoService,
  private _loginService: LoginService,
  private _MunicipioService: MunicipioService,
  private _lineaService: LineaService,
  private _ClaseService: ClaseService,
  private _CarroceriaService: CarroceriaService,
  private _ServicioService: ServicioService,
  private _MarcaService: MarcaService,
  private _ColorService: ColorService,
  private _CombustibleService: CombustibleService,
  private RegistroMaquinariaService: RegistroMaquinariaService,
  private _SedeOperativaService: SedeOperativaService,
  ){}

  ngOnInit() {
  
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
    
    this._lineaService.getLineaSelect().subscribe(
      response => {
        this.lineas = response;
        setTimeout(() => {
            this.lineaSelected = [this.registroMaquinaria.linea.id]; 
            this._MarcaService.getMarcaSelect().subscribe(
              response => {
                this.marcas = response;
                setTimeout(() => {
                    this.marcaSelected = [this.registroMaquinaria.linea.marca.id];
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
    this._MunicipioService.getMunicipioSelect().subscribe(
      response => {
        this.municipios = response;
        setTimeout(() => {
            this.municipioSelected = [this.registroMaquinaria.municipio.id];
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
            this.sedeOperativaSelected = [this.registroMaquinaria.sedeOperativa.id];
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
            this.claseSelected = [this.registroMaquinaria.clase.id];
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
            this.carroceriaSelected = [this.registroMaquinaria.carroceria.id];
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
            this.servicioSelected = [this.registroMaquinaria.servicio.id];
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
    this._ColorService.getColorSelect().subscribe(
      response => {
        this.colores = response;
        setTimeout(() => {
            this.colorSelected = [this.registroMaquinaria.color.id];
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
            this.combustibleSelected = [this.registroMaquinaria.combustible.id];
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

    this.registroMaquinaria.municipioId = this.municipioSelected;
    this.registroMaquinaria.lineaId = this.lineaSelected;
    this.registroMaquinaria.claseId = this.claseSelected;
    this.registroMaquinaria.carroceriaId = this.carroceriaSelected;
    this.registroMaquinaria.servicioId = this.servicioSelected;
    this.registroMaquinaria.colorId = this.colorSelected;
    this.registroMaquinaria.combustibleId = this.combustibleSelected;
    this.registroMaquinaria.sedeOperativaId = this.sedeOperativaSelected;
    console.log(this.registroMaquinaria);  
    let token = this._loginService.getToken();
    this.RegistroMaquinariaService.editRegistroMaquinaria(this.registroMaquinaria,token).subscribe(
			response => {
        this.respuesta = response; 
        console.log(this.respuesta);
        if(this.respuesta.status == 'success'){
          this.ready.emit(true);
          swal({
            title: 'Perfecto!',
            text: 'El registro se ha registrado con exito',
            type: 'success',
            confirmButtonText: 'Aceptar'
          })
        }else{
          swal({
            title: 'Error!',
            text: 'El registroMaquinaria '+ this.registroMaquinaria.placa +' ya se encuentra registrado',
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
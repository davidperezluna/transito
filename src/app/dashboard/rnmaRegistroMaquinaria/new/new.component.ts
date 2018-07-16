import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import {RegistroMaquinaria} from '../rnmaRegistroMaquinaria.modelo';
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
import swal from 'sweetalert2';
@Component({
  selector: 'app-new-rnmaRegistroMaquinaria',
  templateUrl: './new.component.html'
})
export class NewRegistroMaquinariaComponent implements OnInit {
@Output() ready = new EventEmitter<any>();
public registroMaquinaria: RegistroMaquinaria;
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
public marcaSelected:any;
public sedeOperativaSelected:any;
public combustibleSelected:any;
public respuesta:any;
public sedesOperativas:any;

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
  private _VehiculoService: VehiculoService,
  private _SedeOperativaService: SedeOperativaService,
  ){}

  ngOnInit() {
    this.registroMaquinaria = new RegistroMaquinaria(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null);
    
    
    // this._MarcaService.getMarcaSelect().subscribe(
    //   response => {
    //     this.marcas = response;
    //   }, 
    //   error => { 
    //     this.errorMessage = <any>error;

    //     if(this.errorMessage != null){
    //       console.log(this.errorMessage);
    //       alert("Error en la petición");
    //     }
    //   }
    // );
    // this._MunicipioService.getMunicipioSelect().subscribe(
    //   response => {
    //     this.municipios = response;
    //   }, 
    //   error => {
    //     this.errorMessage = <any>error;

    //     if(this.errorMessage != null){
    //       console.log(this.errorMessage);
    //       alert("Error en la petición");
    //     }
    //   }
    // );
    // this._SedeOperativaService.getSedeOperativaSelect().subscribe(
    //   response => {
    //     this.sedesOperativas = response;
    //   }, 
    //   error => {
    //     this.errorMessage = <any>error;

    //     if(this.errorMessage != null){
    //       console.log(this.errorMessage);
    //       alert("Error en la petición");
    //     }
    //   }
    // );
    // this._ClaseService.getClaseSelect().subscribe(
    //   response => {
    //     this.clases = response;
    //   }, 
    //   error => {
    //     this.errorMessage = <any>error;

    //     if(this.errorMessage != null){
    //       console.log(this.errorMessage);
    //       alert("Error en la petición");
    //     }
    //   }
    // );
    // this._CarroceriaService.getCarroceriaSelect().subscribe(
    //   response => {
    //     this.carrocerias = response;
    //   }, 
    //   error => {
    //     this.errorMessage = <any>error;

    //     if(this.errorMessage != null){
    //       console.log(this.errorMessage);
    //       alert("Error en la petición");
    //     }
    //   }
    // );
    // this._ServicioService.getServicioSelect().subscribe(
    //   response => {
    //     this.servicios = response;
    //   }, 
    //   error => {
    //     this.errorMessage = <any>error;

    //     if(this.errorMessage != null){
    //       console.log(this.errorMessage);
    //       alert("Error en la petición");
    //     }
    //   }
    // );
    // this._ColorService.getColorSelect().subscribe(
    //   response => {
    //     this.colores = response;
    //   },  
    //   error => {
    //     this.errorMessage = <any>error;

    //     if(this.errorMessage != null){
    //       console.log(this.errorMessage);
    //       alert("Error en la petición");
    //     }
    //   }
    // );
    // this._CombustibleService.getCombustibleSelect().subscribe(
    //   response => {
    //     this.combustibles = response;
    //   },  
    //   error => {
    //     this.errorMessage = <any>error;

    //     if(this.errorMessage != null){
    //       console.log(this.errorMessage);
    //       alert("Error en la petición");
    //     }
    //   }
    // );
  }

  

  onCancelar(){
      this.ready.emit(true);
  }
  onEnviar(){

    // this.registroMaquinaria.id = this.municipioSelected;
    // this.registroMaquinaria.Id = this.lineaSelected;
    // this.registroMaquinaria.Id = this.claseSelected;
    // this.registroMaquinaria.Id = this.carroceriaSelected;
    // this.registroMaquinaria.Id = this.servicioSelected;
    // this.registroMaquinaria.Id = this.colorSelected;
    // this.registroMaquinaria.Id = this.combustibleSelected;
    // this.registroMaquinaria.sedeOperativaId = this.sedeOperativaSelected;
    console.log(this.registroMaquinaria);  
    let token = this._loginService.getToken();
    this._VehiculoService.register(this.registroMaquinaria,token).subscribe(
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
            text: 'El vehiculo '+ this.registroMaquinaria.altoTotal +' ya se encuentra registrado',
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
import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { RegistroMaquinaria } from './newRnmaRegistroMaquinaria.modelo';
import { TramiteFacturaService } from '../../services/tramiteFactura.service';
import {LoginService} from '../../services/login.service';
import {RegistroMaquinariaService} from '../../services/registroMaquinaria.service';
import {ColorService} from '../../services/color.service';
import { TipoVehiculoService } from '../../services/tipoVehiculo.service';
import {ClaseService} from '../../services/clase.service';
import {MarcaService} from '../../services/marca.service';
import {LineaService} from '../../services/linea.service';
import {CarroceriaService} from '../../services/carroceria.service';
import {CombustibleService} from '../../services/combustible.service';

// import {Vehiculo} from '../registroMaquinaria/vehiculo.modelo';

import swal from 'sweetalert2';
import { Factura } from '../factura/factura.modelo';

@Component({
  selector: 'appRnma-new-registroMaquinaria',
  templateUrl: './newRnmaRegistroMaquinaria.component.html'
})
export class NewRnmaRegistroMaquinariaComponent implements OnInit {
@Output() readyTramite = new EventEmitter<any>();
@Output() cancelarTramite = new EventEmitter<any>();
// @Input() registroMaquinaria: any = null;
@Input() factura: any = null;
@Input() tramitesFactura: any = null;

public registroMaquinaria:RegistroMaquinaria;
public errorMessage:any;
public respuesta:any;
public tramiteFacturaSelected: any;
public tramiteRealizado: any;
public sustratos: any;

public colores:any;
public tiposVehiculo:any;
public clases:any;
public marcas:any;
public lineas:any;
public carrocerias:any;
public combustibles:any;



public colorSelected:any;
public tipoVehiculoSelected:any;
public claseSelected:any;
public marcaSelected:any;
public lineaSelected:any;
public carroceriaSelected:any;
public combustibleSelected:any;


public placa:string;
public numeroSerie:any;
public numeroVin:any;
public numeroChasis:any;
public numeroMotor:any;
public fechaIngreso:any;



public codigoIngreso:any;

public tipoVehiculo:any;
public clase:any;

public tipoClase:any;
public linea:any;
public carroceria:any;
public pesoBruto:any;
public CargaUtil:any;
public rodaje:any;
public numeroEjes:any;
public numeroLlantas:any;
public tipoCabina:any;
public altoTotal:any;
public largoTotal:any;
public anchoTotal:any;
public combustible:any;
public origenVehiculo:any;
public subpartidaArancelaria:any;
public municipioSelected:any;
public tramiteFactura:any;
public condicionesSelected;
public condiciones =[
  {'value':"Nuevo",'label':"Nuevo"},{'value':"Sin registro antes de inicio RNMA",'label':"Sin registro antes de inicio RNMA"}
]


public datos = {
  'placa': null,
  'numeroSerie': null,
  'numeroVin': null,
  'numeroChasis': null,
  'numeroMotor': null,
  'codigoIngreso': null,
  'fechaIngreso': null,
  'colorId': null,
  'claseMaquinariaClase': null,
  'marcas': null,
  'tipoClase': null,
  'linea': null,
  'tipoMaquinaria': null,
  'carroceria': null,
  'pesoBruto': null,
  'cargaUtil': null,
  'rodaje': null,
  'numeroEjes': null,
  'numeroLlantas': null,
  'tipoCabina': null,
  'altoTotal': null,
  'largoTotal': null,
  'anchoTotal': null,
  'combustible': null,
  'origenVehiculo': null,
  'subpartidaArancelaria': null,
  'tramiteFactura': null,
  
};

constructor(
  
  private _loginService: LoginService,
  
  private _lineaService: LineaService,
  private _ClaseService: ClaseService,
  private _CarroceriaService: CarroceriaService,
  private _ColorService: ColorService,
  
  private _CombustibleService: CombustibleService,
  private _RegistroMaquinariaService: RegistroMaquinariaService,
  
  private _MarcaService: MarcaService,
  private _TramiteFacturaService: TramiteFacturaService,
  private _TipoVehiculoService: TipoVehiculoService,
  ){}
  
  ngOnInit() {
    this.registroMaquinaria = new RegistroMaquinaria(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null);
    
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
    this._TipoVehiculoService.getTipoVehiculoSelect().subscribe(
      response => {
        this.tiposVehiculo = response;
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
      }, 
      error => { 
        this.errorMessage = <any>error;

        if(this.errorMessage != null){
          console.log(this.errorMessage);
          alert("Error en la petición");
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
    this._lineaService.getLineaSelect().subscribe(
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
  }

  onCancelar(){
    this.cancelarTramite.emit(true);
}
  onEnviar(){

    this.registroMaquinaria.id = this.municipioSelected;
    this.registroMaquinaria.lineaId = this.lineaSelected;
    this.registroMaquinaria.claseId = this.claseSelected;
    this.registroMaquinaria.carroceriaId = this.carroceriaSelected;
    // this.registroMaquinaria.servicioId = this.servicioSelected;
    this.registroMaquinaria.colorId = this.colorSelected;
    this.registroMaquinaria.combustibleId = this.combustibleSelected;
    // this.registroMaquinaria.sedeOperativaId = this.sedeOperativaSelected;
    console.log(this.registroMaquinaria);  
    let token = this._loginService.getToken();
    this._RegistroMaquinariaService.register(this.registroMaquinaria,token).subscribe(
			response => {
        this.respuesta = response;
        console.log(this.respuesta);
        if(this.respuesta.status == 'success'){
          this.datos.numeroMotor = this.registroMaquinaria.id;
          this.datos.tramiteFactura =58;
          this.readyTramite.emit(this.datos);
        }else{
          swal({
            title: 'Error!',
            text: 'El registroMaquinaria '+ this.registroMaquinaria.id+' ya se encuentra registrado',
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
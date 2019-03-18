import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { RegistroMaquinaria } from './newRnrs.registroMaquinaria.modelo';
import { TramiteFacturaService } from '../../../../services/tramiteFactura.service';
import {LoginService} from '../../../../services/login.service';
import {VehiculoService} from '../../../../services/vehiculo.service';
import {VhloCfgColorService} from '../../../../services/vhloCfgColor.service';
import { TipoVehiculoService } from '../../../../services/tipoVehiculo.service';
import {VhloCfgClaseService} from '../../../../services/vhloCfgClase.service';
import {VhloCfgMarcaService} from '../../../../services/vhloCfgMarca.service';
import {VhloCfgLineaService} from '../../../../services/vhloCfgLinea.service';
import {VhloCfgCarroceriaService} from '../../../../services/vhloCfgCarroceria.service';
import {VhloCfgCombustibleService} from '../../../../services/vhloCfgCombustible.service';

import {Vehiculo} from '../../../vehiculo/vehiculo.modelo';

import swal from 'sweetalert2';
import { Factura } from '../../../factura/factura.modelo';

@Component({
  selector: 'appRnrs-new-registroMaquinaria',
  templateUrl: './newRnrs.registroMaquinaria.component.html'
})
export class NewRnrsRegistroMaquinariaComponent implements OnInit {
@Output() readyTramite = new EventEmitter<any>();
@Output() cancelarTramite = new EventEmitter<any>();
@Input() vehiculo: any = null;
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
  {'value':"Nuevo",'label':"Nuevo"},{'value':"Sin registro antes de inicio Rnrs",'label':"Sin registro antes de inicio Rnrs"}
]


public resumen = {};     public datos = {
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
  'tramiteFormulario': null,
  'idFactura': null,
  
};

constructor(
  
  private _loginService: LoginService,
  
  private _lineaService: VhloCfgLineaService,
  private _ClaseService: VhloCfgClaseService,
  private _CarroceriaService: VhloCfgCarroceriaService,
  private _ColorService: VhloCfgColorService,
  
  private _CombustibleService: VhloCfgCombustibleService,
  private _VehiculoService: VehiculoService,
  
  private _MarcaService: VhloCfgMarcaService,
  private _TramiteFacturaService: TramiteFacturaService,
  private _TipoVehiculoService: TipoVehiculoService,
  ){}
  
  ngOnInit() {
    this.registroMaquinaria = new RegistroMaquinaria(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null);
    
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
    
    this._lineaService.select().subscribe(
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
  }

  onCancelar(){
    this.cancelarTramite.emit(true);
}
  onEnviar(){

    this.vehiculo.municipioId = this.municipioSelected;
    this.vehiculo.lineaId = this.lineaSelected;
    this.vehiculo.claseId = this.claseSelected;
    this.vehiculo.carroceriaId = this.carroceriaSelected;
    // this.vehiculo.servicioId = this.servicioSelected;
    this.vehiculo.colorId = this.colorSelected;
    this.vehiculo.combustibleId = this.combustibleSelected;
    // this.vehiculo.sedeOperativaId = this.sedeOperativaSelected;
    console.log(this.vehiculo);  
    let token = this._loginService.getToken();
    this._VehiculoService.register(this.vehiculo,token).subscribe(
			response => {
        this.respuesta = response;
        console.log(this.respuesta);
        if(this.respuesta.status == 'success'){
          this.datos.numeroMotor = this.vehiculo.motor;
          this.datos.idFactura = this.factura.id;
          this.datos.tramiteFormulario = 'rnrs-registromaquinaria';
          this.readyTramite.emit({'foraneas':this.datos, 'resumen':this.resumen});
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
  }

  changedDepartamento(e){
    if (this.marcaSelected) {
      let token = this._loginService.getToken()
        this._lineaService.searchByMarcaSelect(this.marcaSelected, token).subscribe(
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
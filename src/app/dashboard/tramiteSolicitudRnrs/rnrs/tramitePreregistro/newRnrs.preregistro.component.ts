import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import {Vehiculo} from '../../../vehiculo/vehiculo.modelo';
import { CfgMunicipioService } from '../../../../services/cfgMunicipio.service';
import { VhloCfgLineaService } from '../../../../services/vhloCfgLinea.service';
import { VhloCfgClaseService } from '../../../../services/vhloCfgClase.service';
import { VhloCfgCarroceriaService } from '../../../../services/vhloCfgCarroceria.service';
import { VhloCfgServicioService } from '../../../../services/vhloCfgServicio.service';
import { VhloCfgColorService } from '../../../../services/vhloCfgColor.service';
import { VhloCfgCombustibleService } from '../../../../services/vhloCfgCombustible.service';
import { VehiculoService } from '../../../../services/vehiculo.service';
import { VhloCfgMarcaService } from '../../../../services/vhloCfgMarca.service';
import { CfgOrganismoTransitoService } from '../../../../services/cfgOrganismoTransito.service';
import { LoginService } from '../../../../services/login.service';
import swal from 'sweetalert2';
@Component({
  selector: 'appRnrs-new-preregistro',
  templateUrl: './newRnrs.preregistro.component.html'
})
export class NewRnrsPreregistroComponent implements OnInit {
@Output() readyTramite = new EventEmitter<any>();
@Output() cancelarTramite = new EventEmitter<any>();
public vehiculo: Vehiculo;
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
public combustibleSelected:any;
public marcaSelected:any;
public respuesta:any;
public organismosTransito:any;
public resumen = {};     public datos = {
  'numeroMotor': null,
  'tramiteFactura': null,
};

constructor(
  private _MunicipioService: CfgMunicipioService,
  private _lineaService: VhloCfgLineaService,
  private _ClaseService: VhloCfgClaseService,
  private _CarroceriaService: VhloCfgCarroceriaService,
  private _ServicioService: VhloCfgServicioService,
  private _MarcaService: VhloCfgMarcaService,
  private _ColorService: VhloCfgColorService,
  private _CombustibleService: VhloCfgCombustibleService,
  private _VehiculoService: VehiculoService,
  private _OrganismoTransitoService: CfgOrganismoTransitoService,
  private _loginService: LoginService,
  ){}

  ngOnInit() {
    this.vehiculo = new Vehiculo(null, null, null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null);
    
    this._lineaService.index().subscribe(
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

        if (this.errorMessage != null) {
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

    this.vehiculo.municipioId = this.municipioSelected;
    this.vehiculo.lineaId = this.lineaSelected;
    this.vehiculo.claseId = this.claseSelected;
    this.vehiculo.carroceriaId = this.carroceriaSelected;
    this.vehiculo.servicioId = this.servicioSelected;
    this.vehiculo.colorId = this.colorSelected;
    this.vehiculo.combustibleId = this.combustibleSelected;
    this.vehiculo.sedeOperativaId = this.sedeOperativaSelected;
    console.log(this.vehiculo);  
    let token = this._loginService.getToken();
    this._VehiculoService.register(this.vehiculo,token).subscribe(
			response => {
        this.respuesta = response;
        console.log(this.respuesta);
        if(this.respuesta.status == 'success'){
          this.datos.numeroMotor = this.vehiculo.motor;
          this.datos.tramiteFactura =12;
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
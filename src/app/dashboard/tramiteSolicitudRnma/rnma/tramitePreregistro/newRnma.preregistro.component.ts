import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import {Vehiculo} from '../../../vehiculo/vehiculo.modelo';
import {DepartamentoService} from "../../../../services/departamento.service";
import {LoginService} from '../../../../services/login.service';
import {MunicipioService} from '../../../../services/municipio.service';
import {LineaService} from '../../../../services/linea.service';
import {ClaseService} from '../../../../services/clase.service';
import {CarroceriaService} from '../../../../services/carroceria.service';
import {ServicioService} from '../../../../services/servicio.service';
import {ColorService} from '../../../../services/color.service';
import {CombustibleService} from '../../../../services/combustible.service';
import {VehiculoService} from '../../../../services/vehiculo.service';
import {CfgOrganismoTransitoService} from '../../../../services/cfgOrganismoTransito.service';
import {MarcaService} from '../../../../services/marca.service';
import swal from 'sweetalert2';
@Component({
  selector: 'appRnma-new-preregistro',
  templateUrl: './newRnma.preregistro.component.html'
})
export class NewRnmaPreregistroComponent implements OnInit {
@Output() readyTramite = new EventEmitter<any>();
@Output() cancelarTramite = new EventEmitter<any>();
@Input() factura: any = null;
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
  'tramiteFormulario': null,
  'idFactura': null,
};

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
  private _OrganismoTransitoService: CfgOrganismoTransitoService,
  ){}

  ngOnInit() {
    this.vehiculo = new Vehiculo(null, null, null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null);
    
    this._LineaService.index().subscribe(
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
          this.datos.idFactura = this.factura.id;
          this.datos.tramiteFormulario = 'rnma-preregistro';
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
        this._LineaService.searchByMarcaSelect(this.marcaSelected, token).subscribe(
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
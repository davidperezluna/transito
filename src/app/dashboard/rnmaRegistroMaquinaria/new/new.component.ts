import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import {RegistroMaquinaria} from '../rnmaRegistroMaquinaria.modelo';
import {DepartamentoService} from "../../../services/departamento.service";
import {LoginService} from '../../../services/login.service';
import {ColorService} from '../../../services/color.service';
import { TipoVehiculoService } from '../../../services/tipoVehiculo.service';
import {ClaseService} from '../../../services/clase.service';
import {CarroceriaService} from '../../../services/carroceria.service';
import {ServicioService} from '../../../services/servicio.service';
import {LineaService} from '../../../services/linea.service';
import {CombustibleService} from '../../../services/combustible.service';
import {VehiculoService} from '../../../services/vehiculo.service';
import {MarcaService} from '../../../services/marca.service';
import {CfgOrigenRegistroService} from '../../../services/cfgOrigenRegistro.service';
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
public respuesta:any;

public colores:any;
public tiposVehiculo:any;
public clases:any;
public marcas:any;
public lineas:any;
public carrocerias:any;
public combustibles:any;
public cfgOrigenRegistros:any;
public servicios:any;

public colorSelected:any;
public tipoVehiculoSelected:any;
public claseSelected:any;
public marcaSelected:any;
public lineaSelected:any;
public carroceriaSelected:any;
public combustibleSelected:any;
public cfgOrigenRegistroSelected:any;
public servicioSelected:any;

public condiciones =[
  {'value':"Nuevo",'label':"Nuevo"},{'value':"Sin registro antes de inicio RNMA",'label':"Sin registro antes de inicio RNMA"}
]
public rodajes =[
  {'value':"cilindros",'label':"Cilindros"},{'value':"neumaticos",'label':"Neumaticos"}
]
public origenes =[
  {'value':"importado temporal",'label':"Importado temporal"},{'value':"internacional temporal",'label':"Internacional temporal"}
]

constructor(
  private _VehiculoService: VehiculoService,
  private _loginService: LoginService,
  private _lineaService: LineaService,
  private _ColorService: ColorService,
  private _TipoVehiculoService: TipoVehiculoService,
  private _ClaseService: ClaseService,
  private _MarcaService: MarcaService,
  private _CarroceriaService: CarroceriaService,
  private _CombustibleService: CombustibleService,
  private _CfgOrigenRegistroService: CfgOrigenRegistroService,

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
    
    // this._CfgOrigenRegistroService.getCfgOrigenRegistroSelect().subscribe(
    //   response => {
    //     this.cfgOrigenRegistros = response;
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
    // if (this.marcaSelected) {
    //   let token = this._loginService.getToken()
    //     this._lineaService.getLineasMar(this.marcaSelected, token).subscribe(
    //       response => {
    //         console.log(response.data[0]);
    //         if (response.data[0] != null) {
    //           this.lineas = response.data;
    //         }else{
    //           this.lineas = [];
    //         }
    //       }, 
    //       error => { 
    //         this.errorMessage = <any>error;
    
    //         if(this.errorMessage != null){
    //           console.log(this.errorMessage);
    //           alert("Error en la petición");
    //         }
    //       }
    //     );
    // }
    }
}
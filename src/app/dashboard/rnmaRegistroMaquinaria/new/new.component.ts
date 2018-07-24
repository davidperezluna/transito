import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import {RegistroMaquinaria} from '../rnmaRegistroMaquinaria.modelo';
import {RegistroMaquinariaService} from '../../../services/registroMaquinaria.service';
import {LoginService} from '../../../services/login.service';
import {ColorService} from '../../../services/color.service';
import { TipoVehiculoService } from '../../../services/tipoVehiculo.service';
import {ClaseService} from '../../../services/clase.service';
import {CarroceriaService} from '../../../services/carroceria.service';
import {LineaService} from '../../../services/linea.service';
import {CombustibleService} from '../../../services/combustible.service';
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

public condicionSelected:any;
public fechaIngreso:any;
public pesoBruto:any;
public cargaUtilMaxima:any;
public rodajeSelected:any;
public numeroEjes:any;
public numeroLlantas:any;
public tipoCabinaSelected:any;
public altoTotal:any;
public anchoTotal:any;
public largoTotal:any;
public subpartidaArancelaria:any;

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
public tiposCabina =[
  {'value':"no_aplica",'label':"No aplica"}
]


constructor(
  private _RegistroMaquinariaService: RegistroMaquinariaService,
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
  this.registroMaquinaria = new RegistroMaquinaria(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null);
  
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
    
  this._CfgOrigenRegistroService.getCfgOrigenRegistroSelect().subscribe(
    response => {
      this.cfgOrigenRegistros = response;
      console.log(this.cfgOrigenRegistros);
      
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
    let token = this._loginService.getToken();
    this.registroMaquinaria.tipoVehiculoId = this.combustibleSelected;
    this.registroMaquinaria.cfgOrigenVehiculoId = this.cfgOrigenRegistroSelected;
    
    this.registroMaquinaria.vehiculoColorId = this.colorSelected;
    this.registroMaquinaria.vehiculoMarcaId = this.marcaSelected;
    this.registroMaquinaria.vehiculoClaseId = this.claseSelected;
    this.registroMaquinaria.vehiculoLineaId = this.lineaSelected;
    this.registroMaquinaria.vehiculoCarroceriaId = this.carroceriaSelected;
    this.registroMaquinaria.vehiculoCombustibleId = this.combustibleSelected;

    this.registroMaquinaria.condicionSelected = this.condicionSelected;
    this.registroMaquinaria.fechaIngreso = this.fechaIngreso;
    this.registroMaquinaria.pesoBruto = this.pesoBruto;
    this.registroMaquinaria.cargaUtilMaxima = this.cargaUtilMaxima;
    this.registroMaquinaria.rodajeSelected = this.rodajeSelected;
    this.registroMaquinaria.numeroEjes = this.numeroEjes;
    this.registroMaquinaria.numeroLlantas = this.numeroLlantas;
    this.registroMaquinaria.tipoCabinaSelected = this.tipoCabinaSelected;
    this.registroMaquinaria.altoTotal = this.altoTotal;
    this.registroMaquinaria.largoTotal = this.largoTotal;
    this.registroMaquinaria.anchoTotal = this.anchoTotal;
    this.registroMaquinaria.subpartidaArancelaria = this.subpartidaArancelaria;
    console.log(this.registroMaquinaria);  
    
    var html = 'los datos de la maquinaria a ingresar son:<br>'+
               'Placa: <b>'+this.registroMaquinaria.vehiculoPlaca+'</b><br>'+
               'Condicon ingreso: <b>'+this.registroMaquinaria.condicionSelected+'</b><br>'+
               'Motor: <b>'+this.registroMaquinaria.vehiculoMotor+'</b><br>'+
               'Serie: <b>'+this.registroMaquinaria.vehiculoSerie+'</b><br>'+
               'Chasis: <b>'+this.registroMaquinaria.vehiculoChasis+'</b><br>'+
               'Fecha ingreso: <b>'+this.registroMaquinaria.fechaIngreso+'</b><br>';
               

   swal({
      title: 'Preregistro de maquinaria!',
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

    this._RegistroMaquinariaService.register(this.registroMaquinaria,token).subscribe(
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
        } else if (
          // Read more about handling dismissals
          result.dismiss === swal.DismissReason.cancel
        ) {

        }
      })
  }
  changedMarca(e){
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
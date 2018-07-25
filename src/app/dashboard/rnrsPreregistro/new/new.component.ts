import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import {RegistroRemolque} from '../rnrsPreregistro.modelo';
import {RegistroRemolqueService} from '../../../services/rnrsRegistroRemolque.service';
import {LoginService} from '../../../services/login.service';
import {CarroceriaService} from '../../../services/carroceria.service';
import {MarcaService} from '../../../services/marca.service';
import {LineaService} from '../../../services/linea.service';
import {CfgOrigenRegistroService} from '../../../services/cfgOrigenRegistro.service';
// import {CfgOrigenRegistroService} from '../../../services/condiconIngreso.service';
import {ClaseService} from '../../../services/clase.service';
import {CiudadanoService} from '../../../services/ciudadano.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html'
})

export class NewRegistroRemolqueComponent implements OnInit {
  @Output() ready = new EventEmitter<any>();
  
  public registroRemolque: RegistroRemolque;
  public errorMessage:any;
  public respuesta:any;
  
  public carrocerias:any;
  public carroceriaSelected:any;
  public marcas:any;
  public marcaSelected:any;
  public lineas:any;
  public lineaSelected:any;
  public cfgOrigenRegistros:any;
  public cfgOrigenRegistroSelected:any;
  public condicionIngreso:any;
  public condicionIngresosSelected:any;
  public clases:any;
  public claseSelected:any;
  public propietarios:any;
  public propietarioSelected:any;

  
  public placa:any;
  public serie:any;
  public vin:any;
  public largo:any;
  public alto:any;
  public ancho:any;
  public numeroEjes:any;
  public cargaUtil:any;
  public pesoVacio:any;
  public referencia:any;
  public modelo:any;
  public numeroFth:any;
  public rut:any;

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
  private _RegistroMaquinariaService: RegistroRemolqueService,
  private _loginService: LoginService,
  private _lineaService: LineaService,
  private _ClaseService: ClaseService,
  private _MarcaService: MarcaService,
  private _CarroceriaService: CarroceriaService,
  private _CfgOrigenRegistroService: CfgOrigenRegistroService,

){}

ngOnInit() {
  this.registroRemolque = new RegistroRemolque(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null);
  
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

  // this._TipoVehiculoService.getTipoVehiculoSelect().subscribe(
  //   response => {
  //     this.tiposVehiculo = response;
  //   }, 
  //   error => { 
  //     this.errorMessage = <any>error;

  //     if(this.errorMessage != null){
  //       console.log(this.errorMessage);
  //       alert("Error en la petición");
  //     }
  //   }
  // );
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
    this.registroRemolque.cfgOrigenVehiculoId = this.cfgOrigenRegistroSelected;
    
    this.registroRemolque.vehiculoMarcaId = this.marcaSelected;
    this.registroRemolque.vehiculoClaseId = this.claseSelected;
    this.registroRemolque.vehiculoLineaId = this.lineaSelected;
    this.registroRemolque.vehiculoCarroceriaId = this.carroceriaSelected;
    this.registroRemolque.numeroEjes = this.numeroEjes;
    
    // this.registroRemolque.vehiculoColorId = this.colorSelected;
    // this.registroRemolque.vehiculoCombustibleId = this.combustibleSelected;
    // this.registroRemolque.condicionSelected = this.condicionSelected;
    // this.registroRemolque.fechaIngreso = this.fechaIngreso;
    // this.registroRemolque.pesoBruto = this.pesoBruto;
    // this.registroRemolque.cargaUtilMaxima = this.cargaUtilMaxima;
    // this.registroRemolque.rodajeSelected = this.rodajeSelected;
    // this.registroRemolque.numeroLlantas = this.numeroLlantas;
    // this.registroRemolque.tipoVehiculoId = this.combustibleSelected;
    // this.registroRemolque.tipoCabinaSelected = this.tipoCabinaSelected;
    // this.registroRemolque.altoTotal = this.altoTotal;
    // this.registroRemolque.largoTotal = this.largoTotal;
    // this.registroRemolque.anchoTotal = this.anchoTotal;
    // this.registroRemolque.subpartidaArancelaria = this.subpartidaArancelaria;
    console.log(this.registroRemolque);  
    
    var html = 'los datos de la maquinaria a ingresar son:<br>'+
               'Placa: <b>'+this.registroRemolque.vehiculoPlaca+'</b><br>'+
               'Condicon ingreso: <b>'+this.registroRemolque.condicionSelected+'</b><br>'+
               'Motor: <b>'+this.registroRemolque.vehiculoMotor+'</b><br>'+
               'Serie: <b>'+this.registroRemolque.vehiculoSerie+'</b><br>'+
               'Chasis: <b>'+this.registroRemolque.vehiculoChasis+'</b><br>'+
               'Fecha ingreso: <b>'+this.registroRemolque.fechaIngreso+'</b><br>';
               

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

    this._RegistroMaquinariaService.register(this.registroRemolque,token).subscribe(
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
            text: 'El vehiculo '+ this.registroRemolque.altoTotal +' ya se encuentra registrado',
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
import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import { RnmaPreregistro} from '../rnmaPreregistro.modelo';
import { RnmaPreregistroService } from '../../../services/rnmaPreregistro.service';
import { ColorService } from '../../../services/color.service';
import { ClaseService } from '../../../services/clase.service';
import { CarroceriaService } from '../../../services/carroceria.service';
import { LineaService } from '../../../services/linea.service';
import { CombustibleService } from '../../../services/combustible.service';
import { MarcaService } from '../../../services/marca.service';
import { VhloCfgTipoMaquinariaService } from '../../../services/vhloCfgTipoMaquinaria.service';
import { VhloCfgOrigenRegistroService } from '../../../services/vhloCfgOrigenRegistro.service';
import { VhloCfgEmpresaGpsService } from '../../../services/vhloCfgEmpresaGps.service';
import { LoginService } from '../../../services/login.service';
import swal from 'sweetalert2';
@Component({
  selector: 'app-new-rnmaRegistroMaquinaria',
  templateUrl: './new.component.html'
})
export class NewRegistroMaquinariaComponent implements OnInit {
@Output() ready = new EventEmitter<any>();
  public registroMaquinaria: RnmaPreregistro;
  public municipios:any;
  public errorMessage:any;
  public habilitar:any;

  public colores:any;
  
  public marcas:any;

  public lineas:any;

  public carrocerias:any;

  public combustibles:any;

  public origenesRegistro:any;

  public servicios:any;

  public tiposMaquinaria:any;
  public clasesMaquinaria:any;
  public empresasGps:any;



constructor(
  private _RegistroMaquinariaService: RnmaPreregistroService,
  private _loginService: LoginService,
  private _LineaService: LineaService,
  private _ColorService: ColorService,
  private _TipoMaquinariaService: VhloCfgTipoMaquinariaService,
  private _ClaseService: ClaseService,
  private _MarcaService: MarcaService,
  private _CarroceriaService: CarroceriaService,
  private _CombustibleService: CombustibleService,
  private _OrigenRegistroService: VhloCfgOrigenRegistroService,
  private _EmpresaGpsService: VhloCfgEmpresaGpsService,

){}

ngOnInit() {
  this.registroMaquinaria = new RnmaPreregistro(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null);
  
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

  this._TipoMaquinariaService.select().subscribe(
    response => {
      this.tiposMaquinaria = response;
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

  this._LineaService.select().subscribe(
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
    
  this._OrigenRegistroService.select().subscribe(
    response => {
      this.origenesRegistro = response;
    }, 
    error => { 
      this.errorMessage = <any>error;

      if(this.errorMessage != null){
        console.log(this.errorMessage);
        alert("Error en la petición");
      }
    }
  );

  this._EmpresaGpsService.select().subscribe(
    response => {
      this.empresasGps = response;     
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
    
    var html = 'los datos de la maquinaria a ingresar son:<br>'+
               'Placa: <b>'+this.registroMaquinaria.placa+'</b><br>'+
               'Condicon ingreso: <b>'+this.registroMaquinaria.idCondicionIngreso+'</b><br>'+
               'Motor: <b>'+this.registroMaquinaria.motor+'</b><br>'+
               'Serie: <b>'+this.registroMaquinaria.serie+'</b><br>'+
               'Chasis: <b>'+this.registroMaquinaria.chasis+'</b><br>'+
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
        if(response.status == 'success'){
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
            text: 'El vehiculo '+ this.registroMaquinaria.alto +' ya se encuentra registrado',
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
    if (e) {
      let token = this._loginService.getToken()
      this._LineaService.searchByMarca(e, token).subscribe(
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
    //     this._LineaService.getLineasMar(this.marcaSelected, token).subscribe(
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
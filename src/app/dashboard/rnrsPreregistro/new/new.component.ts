import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import {RegistroRemolque} from '../rnrsPreregistro.modelo';
import {RegistroRemolqueService} from '../../../services/rnrsRegistroRemolque.service';
import {LoginService} from '../../../services/login.service';
import {CarroceriaService} from '../../../services/carroceria.service';
import {MarcaService} from '../../../services/marca.service';
import {LineaService} from '../../../services/linea.service';
import { VhloCfgOrigenRegistroService } from '../../../services/vhloCfgOrigenRegistro.service';
import { VhloCfgCondicionIngresoService } from '../../../services/vhloCfgCondicionIngreso.service';
import {ClaseService} from '../../../services/clase.service';
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
  public origenRegistros:any;
  public origenRegistroSelected:any;
  public condicionIngresos:any;
  public condicionIngresoSelected:any;
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

public rodajes =[
  {'value':"cilindros",'label':"Cilindros"},{'value':"neumaticos",'label':"Neumaticos"}
]
public tiposCabina =[
  {'value':"no_aplica",'label':"No aplica"}
]


constructor(
  private _RegistroRemolqueService: RegistroRemolqueService,
  private _loginService: LoginService,
  private _LineaService: LineaService,
  private _ClaseService: ClaseService,
  private _MarcaService: MarcaService,
  private _CarroceriaService: CarroceriaService,
  private _OrigenRegistroService: VhloCfgOrigenRegistroService,
  private _CondicionIngresoService: VhloCfgCondicionIngresoService
){}

ngOnInit() {
  this.registroRemolque = new RegistroRemolque(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null);
  
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

  this._OrigenRegistroService.select().subscribe(
    response => {
      this.origenRegistros = response; 
    }, 
    error => { 
      this.errorMessage = <any>error;
      
      if(this.errorMessage != null){
        console.log(this.errorMessage);
        alert("Error en la petición");
      }
    }
  );

  this._CondicionIngresoService.select().subscribe(
    response => {
      this.condicionIngresos = response;
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
    
  }

  onCancelar(){
      this.ready.emit(true);
  }
  onEnviar(){
    let token = this._loginService.getToken();

    this.registroRemolque.origenRegistroId = this.origenRegistroSelected;
    this.registroRemolque.condicionIngresoId = this.condicionIngresoSelected;
    
    this.registroRemolque.vehiculoCarroceriaId = this.carroceriaSelected;
    this.registroRemolque.vehiculoMarcaId = this.marcaSelected;
    this.registroRemolque.vehiculoClaseId = this.claseSelected;
    this.registroRemolque.numeroEjes = this.numeroEjes;
    
    this.registroRemolque.alto = this.alto;
    this.registroRemolque.largo = this.largo;
    this.registroRemolque.ancho = this.ancho;
    this.registroRemolque.numeroEjes = this.numeroEjes;
    this.registroRemolque.cargaUtil = this.cargaUtil;
    this.registroRemolque.pesoVacio = this.pesoVacio;
    this.registroRemolque.referencia = this.referencia;
    this.registroRemolque.numeroFth = this.numeroFth;
    this.registroRemolque.rut = this.rut;
        
    var html = 'los datos de la maquinaria a ingresar son:<br>'+
               'Placa: <b>'+this.registroRemolque.vehiculoPlaca+'</b><br>'+
               'Serie: <b>'+this.registroRemolque.vehiculoSerie+'</b><br>'+
               'Carga util: <b>'+this.registroRemolque.cargaUtil+'</b><br>'+
               'Peso vacio: <b>'+this.registroRemolque.pesoVacio+'</b><br>'+
               'Referencia: <b>'+this.registroRemolque.referencia+'</b><br>';
               'Ficha tecnica: <b>'+this.registroRemolque.numeroFth+'</b><br>'+
               

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

    this._RegistroRemolqueService.register(this.registroRemolque,token).subscribe(
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
            text: 'El vehiculo '+ this.registroRemolque.vehiculoPlaca +' ya se encuentra registrado',
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
      this._LineaService.searchByMarcaSelect(this.marcaSelected, token).subscribe(
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
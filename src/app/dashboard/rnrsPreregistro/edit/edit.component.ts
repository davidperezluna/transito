import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import { RegistroRemolque } from '../rnrsPreregistro.modelo';
import { RnrsPreregistroService } from '../../../services/rnrsPreregistro.service';
import {LoginService} from '../../../services/login.service';
import {CarroceriaService} from '../../../services/carroceria.service';
import {MarcaService} from '../../../services/marca.service';
import {LineaService} from '../../../services/linea.service';
import { VhloCfgOrigenRegistroService } from '../../../services/vhloCfgOrigenRegistro.service';
import { VhloCfgCondicionIngresoService } from '../../../services/vhloCfgCondicionIngreso.service';
import {ClaseService} from '../../../services/clase.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html'
})
export class EditComponent implements OnInit{
@Output() ready = new EventEmitter<any>();
@Input() registroRemolque:any = null;
@Input() vehiculo:any = null;
@Input() cfgPlaca:any = null;

public errorMessage;
public habilitar:any;
public respuesta;
public formReady = false;

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
  private _RegistroRemolqueService: RnrsPreregistroService,
  private _loginService: LoginService,
  private _LineaService: LineaService,
  private _ClaseService: ClaseService,
  private _MarcaService: MarcaService,
  private _CarroceriaService: CarroceriaService,
  private _OrigenRegistroService: VhloCfgOrigenRegistroService,
  private _CondicionIngresoService: VhloCfgCondicionIngresoService,


){}

  ngOnInit(){

     swal({
      title: 'Cargando Formulario!',
      text: 'Solo tardara unos segundos por favor espere.',
      timer: 2000,
      onOpen: () => {
        swal.showLoading()
      }
    }).then((result) => {
      if (
        // Read more about handling dismissals
        result.dismiss === swal.DismissReason.timer
      ) {
      }
    })
    this._CarroceriaService.getCarroceriaSelect().subscribe(
      response => {
        this.carrocerias = response;
        setTimeout(() => {
          this.carroceriaSelected = [this.registroRemolque.vehiculo.carroceria.id];
        });
      },
      error => {
        this.errorMessage = <any>error;
        if (this.errorMessage != null) {
          console.log(this.errorMessage);
          alert('Error en la petición');
        }
      }
    );

    this._LineaService.select().subscribe(
      response => {
        this.lineas = response;
        setTimeout(() => {
            this.lineaSelected = [this.registroRemolque.vehiculo.linea.id]; 
            this._MarcaService.getMarcaSelect().subscribe(
              response => {
                this.marcas = response;
                setTimeout(() => {
                    this.marcaSelected = [this.registroRemolque.vehiculo.linea.marca.id];
                })
              }, 
              error => { 
                this.errorMessage = <any>error;
        
                if(this.errorMessage != null){
                  console.log(this.errorMessage);
                  alert("Error en la petición");
                }
              }
            );
        });
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
        setTimeout(() => {
          this.origenRegistroSelected = [this.registroRemolque.origenRegistro.id];
        });
      },
      error => {
        this.errorMessage = <any>error;
        if (this.errorMessage != null) {
          console.log(this.errorMessage);
          alert('Error en la petición');
        }
      }
    );
    
    this._CondicionIngresoService.select().subscribe(
      response => {
        this.condicionIngresos = response;
        setTimeout(() => {
          this.condicionIngresoSelected = [this.registroRemolque.condicionIngreso.id];
        });
      },
      error => {
        this.errorMessage = <any>error;
        if (this.errorMessage != null) {
          console.log(this.errorMessage);
          alert('Error en la petición');
        }
      }
    );
    this._ClaseService.getClaseSelect().subscribe(
      response => {
        this.clases = response;
        setTimeout(() => {
          this.claseSelected = [this.registroRemolque.vehiculo.clase.id];
        });
      },
      error => {
        this.errorMessage = <any>error;
        if (this.errorMessage != null) {
          console.log(this.errorMessage);
          alert('Error en la petición');
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

    var html = 'los datos de la Remolque sera editados !<br>';
   
   swal({
      title: 'Actualización de remolque!',
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

    this._RegistroRemolqueService.edit(this.registroRemolque,token).subscribe(
			response => {
        this.respuesta = response;
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
            text: 'El vehiculo '+ this.registroRemolque.placa+' ya se encuentra registrado',
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


   changedPaisNacimiento(id){
  
  }

  changedDepartamentoNacimiento(id){
  
  
  }

  changedPaisResidencia(id){
  
  }

  changedDepartamentoResidencia(id){
 
  
  }

}
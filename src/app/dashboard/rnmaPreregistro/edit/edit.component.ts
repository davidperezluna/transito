import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import { RnmaPreregistro } from '../rnmaPreregistro.modelo';
import { RnmaPreregistroModule } from '../rnmaPreregistro.module';
import { RnmaPreregistroService } from '../../../services/rnmaPreregistro.service';
import { LoginService } from '../../../services/login.service';
import {VhloCfgColorService} from '../../../services/vhloCfgColor.service';
import { TipoVehiculoService } from '../../../services/tipoVehiculo.service';
import {VhloCfgClaseService} from '../../../services/vhloCfgClase.service';
import {VhloCfgCarroceriaService} from '../../../services/vhloCfgCarroceria.service';
import {VhloCfgLineaService} from '../../../services/vhloCfgLinea.service';
import {VhloCfgCombustibleService} from '../../../services/vhloCfgCombustible.service';
import {VhloCfgMarcaService} from '../../../services/vhloCfgMarca.service';
import { VhloCfgOrigenRegistroService } from '../../../services/vhloCfgOrigenRegistro.service';

import swal from 'sweetalert2';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html'
})
export class EditComponent implements OnInit{
@Output() ready = new EventEmitter<any>();
@Input() registroMaquinaria:any = null;
@Input() vehiculo:any = null;
@Input() cfgPlaca:any = null;

public errorMessage;
public habilitar:any;
public respuesta;
public formReady = false;

public colores: Array<any>
public colorSelected: Array<any>; // ng-select [(ngModel)]
public tiposVehiculo: Array<any>
public tipoVehiculoSelected: Array<any>; // ng-select [(ngModel)]
public clases: Array<any>
public claseSelected: Array<any>; // ng-select [(ngModel)]
public marcas: Array<any>;
public marcaSelected: Array<any>;
public lineas: Array<any>;
public lineaSelected:Array<any>;
public carrocerias: Array<any>;
public carroceriaSelected:Array<any>;
public combustibles: Array<any>;
public combustibleSelected: Array<any>;
public cfgOrigenRegistros: Array<any>;
public cfgOrigenRegistroSelected: Array<any>;
public servicios: Array<any>;
public serviciosSelected: Array<any>;


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
  private _RegistroMaquinariaService: RnmaPreregistroService,
  private _loginService: LoginService,
  private _colorService: VhloCfgColorService,
  private _lineaService: VhloCfgLineaService,
  private _tipoVehiculoService: TipoVehiculoService,
  private _claseService: VhloCfgClaseService,
  private _marcaService: VhloCfgMarcaService,
  private _carroceriaService: VhloCfgCarroceriaService,
  private _combustibleService: VhloCfgCombustibleService,
  private _OrigenRegistroService: VhloCfgOrigenRegistroService,

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

    this._colorService.select().subscribe(
      response => {
        this.colores = response;
        setTimeout(() => {
          this.colorSelected = [this.registroMaquinaria.vehiculo.color.id];
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

     this._tipoVehiculoService.getTipoVehiculoSelect().subscribe(
      response => {
        this.tiposVehiculo = response;
        setTimeout(() => {
          this.tipoVehiculoSelected = [this.registroMaquinaria.tipoVehiculo.id];
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

     this._claseService.select().subscribe(
        response => {
          this.clases = response;
          setTimeout(() => {
            this.claseSelected = [this.registroMaquinaria.vehiculo.clase.id];
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

      this._lineaService.index().subscribe(
        response => {
          this.lineas = response;
          setTimeout(() => {
              this.lineaSelected = [this.registroMaquinaria.vehiculo.linea.id]; 
              this._marcaService.getMarcaSelect().subscribe(
                response => {
                  this.marcas = response;
                  setTimeout(() => {
                      this.marcaSelected = [this.registroMaquinaria.vehiculo.linea.marca.id];
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
      this._carroceriaService.select().subscribe(
        response => {
          this.carrocerias = response;
          setTimeout(() => {
            this.carroceriaSelected = [this.registroMaquinaria.vehiculo.carroceria.id];
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
      this._combustibleService.select().subscribe(
        response => {
          this.combustibles = response;
          setTimeout(() => {
            this.combustibleSelected = [this.registroMaquinaria.vehiculo.combustible.id];
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
      this._OrigenRegistroService.select().subscribe(
        response => {
          this.cfgOrigenRegistros = response;
          setTimeout(() => {
            this.cfgOrigenRegistroSelected = [this.registroMaquinaria.cfgOrigenRegistro.id];
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
    this.registroMaquinaria.tipoVehiculoId = this.tipoVehiculoSelected;
    this.registroMaquinaria.cfgOrigenVehiculoId = this.cfgOrigenRegistroSelected;
    
    this.registroMaquinaria.vehiculoColorId = this.colorSelected;
    this.registroMaquinaria.vehiculoMarcaId = this.marcaSelected;
    this.registroMaquinaria.vehiculoClaseId = this.claseSelected;
    this.registroMaquinaria.vehiculoLineaId = this.lineaSelected;
    this.registroMaquinaria.vehiculoCarroceriaId = this.carroceriaSelected;
    this.registroMaquinaria.vehiculoCombustibleId = this.combustibleSelected;

    this.registroMaquinaria.condicionSelected = this.condicionSelected;
    this.registroMaquinaria.rodajeSelected = this.rodajeSelected;
    this.registroMaquinaria.tipoCabinaSelected = this.tipoCabinaSelected;
        
    var html = 'los datos de la maquinaria sera editados !<br>';
    
   swal({
      title: 'Actualización de maquinaria!',
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

    this._RegistroMaquinariaService.edit(this.registroMaquinaria,token).subscribe(
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
            text: 'El vehiculo '+ this.registroMaquinaria.cfgPlaca +' ya se encuentra registrado',
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

  changedXX(id){
  }


}
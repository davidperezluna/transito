import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import { RegistroMaquinaria } from '../rnmaRegistroMaquinaria.modelo';
import {RegistroMaquinariaService} from '../../../services/registroMaquinaria.service';
import { LoginService } from '../../../services/login.service';
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
  selector: 'app-edit',
  templateUrl: './edit.component.html'
})
export class EditComponent implements OnInit{
@Output() ready = new EventEmitter<any>();
@Input() registroMaquinaria:any = null;
@Input() vehiculo:any = null;
@Input() cfgPlaca:any = null;

public errorMessage;
public respuesta;
public formReady = false;

public colores: Array<any>
public colorSelected: Array<any>; // ng-select [(ngModel)]
public tiposVehiculo: Array<any>
public tipoVehiculoSelected: Array<any>; // ng-select [(ngModel)]
public clases: Array<any>
public claseSelected: Array<any>; // ng-select [(ngModel)]
public marcas: Array<any>;
public marcasSelected: Array<any>;
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

constructor(
  private _registroMaquinariaService: RegistroMaquinariaService,
  private _loginService: LoginService,
  private _colorService: ColorService,
  private _lineaService: LineaService,
  private _tipoVehiculoService: TipoVehiculoService,
  private _claseService: ClaseService,
  private _marcaService: MarcaService,
  private _carroceriaService: CarroceriaService,
  private _combustibleService: CombustibleService,
  private _cfgOrigenRegistroService: CfgOrigenRegistroService,

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

    console.log(this.registroMaquinaria);

    this.registroMaquinaria.vehiculoPlaca = this.registroMaquinaria.vehiculo.cfgPlaca.numero;
    this.registroMaquinaria.vehiculoSerie = this.registroMaquinaria.vehiculo.serie;
    this.registroMaquinaria.vehiculoVin = this.registroMaquinaria.vehiculo.vin;
    this.registroMaquinaria.vehiculoChasis = this.registroMaquinaria.vehiculo.chasis;
    this.registroMaquinaria.vehiculoMotor = this.registroMaquinaria.vehiculo.motor;

    this.registroMaquinaria.vehiculoColor = this.registroMaquinaria.vehiculo.color.nombre;

    this.registroMaquinaria.vehiculoTipoVehiculo = this.registroMaquinaria.tipoVehiculo.nombre;
    this.registroMaquinaria.segundoApellidoUsuario = this.registroMaquinaria.vehiculo.linea.marca.nombre;
    this.registroMaquinaria.segundoApellidoUsuario = this.registroMaquinaria.vehiculo.clase.nombre;
    this.registroMaquinaria.segundoApellidoUsuario = this.registroMaquinaria.vehiculo.linea.nombre;
    this.registroMaquinaria.segundoApellidoUsuario = this.registroMaquinaria.vehiculo.modelo;
    this.registroMaquinaria.segundoApellidoUsuario = this.registroMaquinaria.vehiculo.carroseria.nombre;
    this.registroMaquinaria.segundoApellidoUsuario = this.registroMaquinaria.vehiculo.combustible.nombre;


    this._colorService.getColorSelect().subscribe(
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

    //  this._departamentoService.getDepartamentoPorPaisSelect(this.ciudadano.municipioResidencia.departamento.pais.id).subscribe(
    //   response => {
    //     this.departamentosResidencia = response;
    //     setTimeout(() => {
    //       this.departamentoResidenciaSelected = [this.ciudadano.municipioResidencia.departamento.id];
    //     });
    //   },
    //   error => {
    //     this.errorMessage = <any>error;
    //     if (this.errorMessage != null) {
    //       console.log(this.errorMessage);
    //       alert('Error en la petición');
    //     }
    //   }
    // );

    //  this._municipioService.getMunicipioPorDepartamentoSelect(this.ciudadano.municipioNacimiento.departamento.id).subscribe(
    //     response => {
    //       this.municipiosNacimiento = response;
    //       setTimeout(() => {
    //         this.municipioNacimientoSelected = [this.ciudadano.municipioNacimiento.id];
    //       });
    //     },
    //     error => {
    //       this.errorMessage = <any>error;
    //       if (this.errorMessage != null) {
    //         console.log(this.errorMessage);
    //         alert('Error en la petición');
    //       }
    //     }
    //   );
    //  this._municipioService.getMunicipioPorDepartamentoSelect(this.ciudadano.municipioResidencia.departamento.id).subscribe(
    //     response => {
    //       this.municipiosResidencia = response;
    //       setTimeout(() => {
    //         this.municipioResidenciaSelected = [this.ciudadano.municipioResidencia.id];
    //       });
    //     },
    //     error => {
    //       this.errorMessage = <any>error;
    //       if (this.errorMessage != null) {
    //         console.log(this.errorMessage);
    //         alert('Error en la petición');
    //       }
    //     }
    //   );

   
    // this._paisService.select().subscribe(
    //   response => {
    //     this.paises = response;
    //     setTimeout(() => {
    //       this.paisNacimientoSelected = [this.ciudadano.municipioNacimiento.departamento.pais.id];
    //       this.municipioNacimientoSelected = [this.ciudadano.municipioNacimiento.id];
    //       this.paisResidenciaSelected = [this.ciudadano.municipioResidencia.departamento.pais.id];
    //       this.departamentoResidenciaSelected = [this.ciudadano.municipioResidencia.departamento.id];
    //       this.municipioResidenciaSelected = [this.ciudadano.municipioResidencia.id];
    //     });
    //     console.log(this.departamentoNacimientoSelected);
    //   },
    //   error => {
    //     this.errorMessage = <any>error;
    //     if (this.errorMessage != null) {
    //       console.log(this.errorMessage);
    //       alert('Error en la petición');
    //     }
    //   }
    // );
    
    // this._tipoIdentificacionService.getTipoIdentificacionSelect().subscribe(
    //     response => {
    //       this.tiposIdentificacion = response;
    //       setTimeout(() => {
    //         this.tipoIdentificacionSelected = [this.ciudadano.usuario.tipoIdentificacion.id];
    //         this.formReady = true;
    //       });
    //     }, 
    //     error => {
    //       this.errorMessage = <any>error;

    //       if(this.errorMessage != null){
    //         console.log(this.errorMessage);
    //         alert("Error en la petición");
    //       }
    //     }
    //   );

    // this._generoService.getGeneroSelect().subscribe(
    //   response => {
    //     this.generos = response;
    //     setTimeout(() => {
    //       this.generoSelected = [this.ciudadano.genero.id];
    //       this.formReady = true;
    //     });
    //   },
    //   error => {
    //     this.errorMessage = <any>error;

    //     if (this.errorMessage != null) {
    //       console.log(this.errorMessage);
    //       alert("Error en la petición");
    //     }
    //   }
    // );

    // this._grupoSanguineoService.getGrupoSanguineoSelect().subscribe(
    //   response => {
    //     this.gruposSanguineos = response;
    //     setTimeout(() => {
    //       this.grupoSanguineoSelected = [this.ciudadano.grupoSanguineo.id];
    //       this.formReady = true;
    //     });
    //   },
    //   error => {
    //     this.errorMessage = <any>error;

    //     if (this.errorMessage != null) {
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

    // let token = this._loginService.getToken();
    // this.ciudadano.municipioResidenciaId = this.municipioResidenciaSelected;
    // this.ciudadano.municipioNacimientoId = this.municipioNacimientoSelected;
    // this.ciudadano.tipoIdentificacionUsuarioId = this.tipoIdentificacionSelected;
    // this.ciudadano.generoId = this.generoSelected;
    // this.ciudadano.grupoSanguineoId = this.grupoSanguineoSelected;
    // console.log(this.ciudadano);
		// this._ciudadanoService.editCiudadano(this.ciudadano,token).subscribe(
		// 	response => {
    //     this.respuesta = response;
    //     console.log(this.respuesta);
    //     if(this.respuesta.status == 'success'){
    //       this.ready.emit(true);
    //       swal({
    //         title: 'Perfecto!',
    //         text: 'El registro se ha modificado con exito',
    //         type: 'success',
    //         confirmButtonText: 'Aceptar'
    //       })
    //     }
		// 	error => {
		// 			this.errorMessage = <any>error;

		// 			if(this.errorMessage != null){
		// 				console.log(this.errorMessage);
		// 				alert("Error en la petición");
		// 			}
		// 		}

		// }); 
  }


   changedPaisNacimiento(id){
  // if (id) {
  //   this.paisNacimientoSelected = id;
  //   this._departamentoService.getDepartamentoPorPaisSelect(this.paisNacimientoSelected).subscribe(
  //     response => {
  //       this.departamentosNacimiento = response;
  //     },
  //     error => {
  //       this.errorMessage = <any>error;
  //       if (this.errorMessage != null) {
  //         console.log(this.errorMessage);
  //         alert('Error en la petición');
  //       }
  //     }
  //   );
  // }

  }

  changedDepartamentoNacimiento(id){
    // if (id) {
    //   this._municipioService.getMunicipioPorDepartamentoSelect(this.departamentoNacimientoSelected).subscribe(
    //     response => {
    //       this.municipiosNacimiento = response;

    //     },
    //     error => {
    //       this.errorMessage = <any>error;
    //       if (this.errorMessage != null) {
    //         console.log(this.errorMessage);
    //         alert('Error en la petición');
    //       }
    //     }
    //   );
    // }
  
  }

  changedPaisResidencia(id){
    // if (id) {
    //   this._departamentoService.getDepartamentoPorPaisSelect(this.paisResidenciaSelected).subscribe(
    //     response => {
    //       this.departamentosResidencia = response;
    //     },
    //     error => {
    //       this.errorMessage = <any>error;
    //       if (this.errorMessage != null) {
    //         console.log(this.errorMessage);
    //         alert('Error en la petición');
    //       }
    //     }
    //   );
    // }
  }

  changedDepartamentoResidencia(id){
  //   if (id) {
  //     this._municipioService.getMunicipioPorDepartamentoSelect(this.departamentoResidenciaSelected).subscribe(
  //       response => {
  //         this.municipiosResidencia = response;

  //       },
  //       error => {
  //         this.errorMessage = <any>error;
  //         if (this.errorMessage != null) {
  //           alert('Error en la petición');
  //         }
  //       }
  //     );
  //   }
  
  }

}
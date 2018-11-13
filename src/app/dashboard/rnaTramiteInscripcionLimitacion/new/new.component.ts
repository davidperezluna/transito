import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { LoginService } from '../../../services/login.service';
import { TramiteLimitacionService } from '../../../services/tramiteLimitacion.service';
import { VehiculoLimitacionService } from '../../../services/vehiculoLimitacion.service';
import { VehiculoService } from '../../../services/vehiculo.service';
import { CiudadanoService } from '../../../services/ciudadano.service';
import { MunicipioService } from '../../../services/municipio.service';
import { DepartamentoService } from '../../../services/departamento.service';
import { CfgEntidadJudicialService } from '../../../services/cfgEntidadJudicial.service';
import { LimitacionService } from '../../../services/cfgLimitacion.service';
import { CfgTipoProcesoService } from '../../../services/cfgTipoProceso.service';
import { CfgCausalLimitacionService } from '../../../services/cfgCausalLimitacion.service';
import { TipoIdentificacionService } from '../../../services/tipoIdentificacion.service';
import { RnaTramiteInscripcionLimitacion } from '../rnaTramiteInscripcionLimitacion.modelo';
import { Ciudadano } from '../../ciudadano/ciudadano.modelo';
import swal from 'sweetalert2';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
  @Output() ready = new EventEmitter<any>();
  public rnaTramiteInscripcionLimitacion: RnaTramiteInscripcionLimitacion;
  public vehiculoLimitacion: any;
  public errorMessage;
  public respuesta;
  public ciudadanoDemandado: any;
  public ciudadanoDemandadoEncontrado = 1;
  public ciudadanoDemandante: any;
  public ciudadanoDemandanteEncontrado = 1;
  public municipios;
  public municipioSelected;
  public departamentos;
  public departamentoSelected;
  public tipoIdentificacionDemandanteSelected:any;
  public tipoIdentificacionDemandadoSelected:any;
  public entidadesJudiciales;
  public entidadJudicialSelected;
  public limitaciones;
  public limitacionSelected;
  public tiposProceso;
  public tipoProcesoSelected;
  public causalesLimitacion;
  public causalLimitacionSelected;
  public placa: any;
  public vehiculo: any;
  public placaEncontrada = 1;
  public demandado = false;
  public demandante = false;
  public listaVehiculosPlacas = false;
  public identificacionDemandado: any;
  public identificacionDemandante: any;
  public tipoIdentificacionesDemandado;
  public tipoIdentificacionesDemandante;
  public opcionSeleccionado: string = '0'; // Iniciamos
  public verSeleccion: string = '';
  public resumen = {};     public datos = {
  }
  public datos2 = {
    'vehiculos': [],
    'cDemandante': [],
    'cDemandado': [],
  }

  constructor(
    private _TramiteInscripcionLimitacionService: TramiteLimitacionService,
    private _VehiculoLimitacionService: VehiculoLimitacionService,
    private _VehiculoService: VehiculoService,
    private _CiudadanoService: CiudadanoService,
    private _loginService: LoginService,
    private _MunicipioService: MunicipioService,
    private _DepartamentoService: DepartamentoService,
    private _CfgEntidadJuducialService: CfgEntidadJudicialService,
    private _LimitacionService: LimitacionService,
    private _CfgTipoProcesoService: CfgTipoProcesoService,
    private _CfgCausalLimitacionService: CfgCausalLimitacionService,
    private _tipoIdentificacionService: TipoIdentificacionService,
  ) { }

  ngOnInit() {
    this.rnaTramiteInscripcionLimitacion = new RnaTramiteInscripcionLimitacion(null, null, null, null, null, null, null, null, null, null, null, null, null);

    this._tipoIdentificacionService.getTipoIdentificacionSelect().subscribe(
      response => {
        this.tipoIdentificacionesDemandado = response;
      },
      error => {
        this.errorMessage = <any>error;

        if (this.errorMessage != null) {
          console.log(this.errorMessage);
          alert('Error en la petición');
        }
      }
    );
    this._CfgCausalLimitacionService.getCausalLimitacionSelect().subscribe(
      response => {
        this.causalesLimitacion = response;
      },
      error => {
        this.errorMessage = <any>error;

        if (this.errorMessage != null) {
          console.log(this.errorMessage);
          alert('Error en la petición');
        }
      }
    );

    this._tipoIdentificacionService.getTipoIdentificacionSelect().subscribe(
      response => {
        this.tipoIdentificacionesDemandante = response;
      },
      error => {
        this.errorMessage = <any>error;

        if (this.errorMessage != null) {
          console.log(this.errorMessage);
          alert('Error en la petición');
        }
      }
    );

    // this._MunicipioService.getMunicipioSelect().subscribe(
    //   response => {
    //     this.municipios = response;
    //   },
    //   error => {
    //     this.errorMessage = <any>error;

    //     if (this.errorMessage != null) {
    //       console.log(this.errorMessage);
    //       alert("Error en la petición");
    //     }
    //   }
    // );
    this._DepartamentoService.getDepartamentoSelect().subscribe(
      response => {
        this.departamentos = response;
      },
      error => {
        this.errorMessage = <any>error;

        if (this.errorMessage != null) {
          console.log(this.errorMessage);
          alert("Error en la petición");
        }
      }
    );

    this._CfgEntidadJuducialService.getEntidadJudicialSelect().subscribe( 
      response => {
        this.entidadesJudiciales = response;
      },
      error => {
        this.errorMessage = <any>error;

        if (this.errorMessage != null) {
          console.log(this.errorMessage);
          alert("Error en la petición");
        }
      }
    );
    this._LimitacionService.getLimitacionSelect().subscribe(
      response => {
        this.limitaciones = response;
      },
      error => {
        this.errorMessage = <any>error;

        if (this.errorMessage != null) {
          console.log(this.errorMessage);
          alert("Error en la petición");
        }
      }
    );
    this._CfgTipoProcesoService.getTipoProcesoSelect().subscribe(
      response => {
        this.tiposProceso = response;
      },
      error => {
        this.errorMessage = <any>error;

        if (this.errorMessage != null) {
          console.log(this.errorMessage);
          alert("Error en la petición");
        }
      }
    );

  }


  onEnviar(){
    
  }

  onCancelar() {
    this.ready.emit(true);
  }
  enviarTramite() {
    let token = this._loginService.getToken();

    this.rnaTramiteInscripcionLimitacion.departamentoId = this.departamentoSelected;
    this.rnaTramiteInscripcionLimitacion.entidadJudicialId = this.entidadJudicialSelected;
    this.rnaTramiteInscripcionLimitacion.limitacionId = this.limitacionSelected;
    this.rnaTramiteInscripcionLimitacion.municipioId = this.municipioSelected;
    this.rnaTramiteInscripcionLimitacion.tipoProcesoId = this.tipoProcesoSelected;
    this.rnaTramiteInscripcionLimitacion.causalLimitacionId = this.causalLimitacionSelected;
    this.rnaTramiteInscripcionLimitacion.ciudadanoDemandadoId = this.ciudadanoDemandado.id;
    this.rnaTramiteInscripcionLimitacion.ciudadanoDemandanteId = this.ciudadanoDemandante.id;
    let data =[
      {'datosLimitacion': this.rnaTramiteInscripcionLimitacion},

      {'vehiculosLimitacionArray': this.datos2}
    ]
    this._TramiteInscripcionLimitacionService.register(data, token).subscribe(
      response => {
        this.respuesta = response;
        console.log(this.respuesta);
        if (this.respuesta.status == 'success') {
          this.ready.emit(true);
          swal({
            title: 'Perfecto!',
            text: 'Registro exitoso!',
            type: 'success',
            confirmButtonText: 'Aceptar'
          })
          
        } else {
          let eJudicial = this.entidadesJudiciales[this.entidadJudicialSelected - 1].label;
          
          swal({
            title: 'Error!',
            text: 'La limitacion a la propiedad ' + this.vehiculo.placa.numero + ', con la fecha: ' + this.rnaTramiteInscripcionLimitacion.fechaExpedicion + ', expedido por la entidad judicial: ' + eJudicial+' ya se encuentra registrado',
            type: 'error',
            confirmButtonText: 'Aceptar'
          })
        }
        error => {
          this.errorMessage = <any>error;

          if (this.errorMessage != null) {
            console.log(this.errorMessage);
            alert("Error en la petición");
          }
        }

      });


  }

  capturar() {

    this.verSeleccion = this.opcionSeleccionado;
  }

  onKeyPlaca() {
    let token = this._loginService.getToken();
    let datos = {
      'placa': this.placa,
      'moduloId': 2,
    };
    this._VehiculoService.showVehiculoModuloPlaca(token, datos).subscribe(
      response => {
        this.respuesta = response;
        if (this.respuesta.status == 'success') {
          this.vehiculo = this.respuesta.data;
          this.placaEncontrada = 2;
        } else {
          this.placaEncontrada = 3;
        }
        error => {
          this.errorMessage = <any>error;

          if (this.errorMessage != null) {
            console.log(this.errorMessage);
            alert("Error en la petición");
          }
        }
      });
  }

  onKeyCiudadanoDemandado() {
    let token = this._loginService.getToken();
    let identificacion = {
      'numeroIdentificacion': this.identificacionDemandado,
    };
    this._CiudadanoService.searchByIdentificacion(token, identificacion).subscribe(
      response => {
        this.respuesta = response;
        if (this.respuesta.status == 'success') {
          this.ciudadanoDemandado = this.respuesta.data;
          this.ciudadanoDemandadoEncontrado = 2;
          console.log(this.ciudadanoDemandado);
        } else {
          this.ciudadanoDemandadoEncontrado = 3;
        }
        error => {
          this.errorMessage = <any>error;

          if (this.errorMessage != null) {
            console.log(this.errorMessage);
            alert("Error en la petición");
          }
        }
      });
  }

  onKeyCiudadanoDemandante() {
    let token = this._loginService.getToken();
    let identificacion = {
      'numeroIdentificacion': this.identificacionDemandante,
    };
    this._CiudadanoService.searchByIdentificacion(token, identificacion).subscribe(
      response => {
        this.respuesta = response;
        if (this.respuesta.status == 'success') {
          this.ciudadanoDemandante = this.respuesta.data;
          this.ciudadanoDemandanteEncontrado = 2;
        } else {
          this.ciudadanoDemandanteEncontrado = 3;
        }
        error => {
          this.errorMessage = <any>error;

          if (this.errorMessage != null) {
            console.log(this.errorMessage);
            alert("Error en la petición");
          }
        }
      });
  }

  delete(vehiculo: any): void {
    this.datos2.vehiculos = this.datos2.vehiculos.filter(h => h !== vehiculo);
    if (this.datos2.vehiculos.length === 0) {
      this.listaVehiculosPlacas = false;
    }
  }

  deleteCiudadanoDemandado(ciudadanoDemandado: any): void {
    this.datos2.cDemandado = this.datos2.cDemandado.filter(h => h !== ciudadanoDemandado);
    if (this.datos2.cDemandado.length === 0) {
      this.demandado = false;
      this.ciudadanoDemandadoEncontrado = 1;
    }
  }

  deleteCiudadanoDemandante(ciudadanoDemandante: any): void {
    this.datos2.cDemandante = this.datos2.cDemandante.filter(h => h !== ciudadanoDemandante);
    if (this.datos2.cDemandante.length === 0) {
      this.demandante = false;
      this.ciudadanoDemandanteEncontrado = 1;
    }
  }

  changedDepartamento(e) {
    if (this.departamentoSelected) {
      let token = this._loginService.getToken();
      this._MunicipioService.getMunicipioPorDepartamentoSelect(this.departamentoSelected).subscribe(
        response => {
          
          if (response != null) {
            this.municipios = response;
          } else {
            this.municipios = [];
          }
        },
        error => {
          this.errorMessage = <any>error;

          if (this.errorMessage != null) {
            console.log(this.errorMessage);
            alert("Error en la petición");
          }
        }
      );
    }
  }

  btnNewVehiculo() {

    this.datos2.vehiculos.push(
      {
        'placa': this.vehiculo.placa.numero,
        'sedeOperativa': this.vehiculo.sedeOperativa.nombre
      }
    );

    this.placaEncontrada = 1;
    this.listaVehiculosPlacas = true;
  }

  btnNewDemandado() {
    this.datos2.cDemandado.push(
      {
        'nombres': this.ciudadanoDemandado.primerNombre,
        'identificacion': this.ciudadanoDemandado.identificacion
      }
    );

    this.ciudadanoDemandadoEncontrado = 5;
    this.demandado = true;
  }
  btnNewDemandante() {
    this.datos2.cDemandante.push(
      {
        'nombres': this.ciudadanoDemandante.primerNombre,
        'identificacion': this.ciudadanoDemandante.identificacion
      }
    );

    this.ciudadanoDemandanteEncontrado = 5;
    this.demandante = true;
  }


  btnCancelarVehiculo() {
    this.placaEncontrada = 1
  }

  btnCancelarDemandado() {
    this.ciudadanoDemandadoEncontrado = 1
  }

  btnCancelarDemandante() {
    this.ciudadanoDemandanteEncontrado = 1
  }

}
import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { UserCiudadano } from '../../userCiudadano/userCiudadano.modelo';
import { VhloRnaTramiteInscripcionLimitacion } from '../vhloRnaTramiteInscripcionLimitacion.modelo';
import { TramiteLimitacionService } from '../../../services/tramiteLimitacion.service';
import { VehiculoLimitacionService } from '../../../services/vehiculoLimitacion.service';
import { VhloVehiculoService } from '../../../services/vhloVehiculo.service';
import { UserCiudadanoService } from '../../../services/userCiudadano.service';
import { UserCfgTipoIdentificacionService } from '../../../services/userCfgTipoIdentificacion.service';
import { CfgMunicipioService } from '../../../services/cfgMunicipio.service';
import { CfgDepartamentoService } from '../../../services/cfgDepartamento.service';
import { CfgEntidadJudicialService } from '../../../services/cfgEntidadJudicial.service';
import { CfgTipoProcesoService } from '../../../services/cfgTipoProceso.service';
import { CfgCausalLimitacionService } from '../../../services/cfgCausalLimitacion.service';
import { LimitacionService } from '../../../services/cfgLimitacion.service';
import { LoginService } from '../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
  @Output() ready = new EventEmitter<any>();
  public vhloRnaTramiteInscripcionLimitacion: VhloRnaTramiteInscripcionLimitacion;
  public errorMessage;

  public vehiculoLimitacion: any;
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
    private _VehiculoService: VhloVehiculoService,
    private _UserCiudadanoService: UserCiudadanoService,
    private _CfgDepartamentoService: CfgDepartamentoService,
    private _MunicipioService: CfgMunicipioService,
    private _CfgEntidadJuducialService: CfgEntidadJudicialService,
    private _LimitacionService: LimitacionService,
    private _CfgTipoProcesoService: CfgTipoProcesoService,
    private _CfgCausalLimitacionService: CfgCausalLimitacionService,
    private _TipoIdentificacionService: UserCfgTipoIdentificacionService,
    private _loginService: LoginService,
  ) { }

  ngOnInit() {
    this.vhloRnaTramiteInscripcionLimitacion = new VhloRnaTramiteInscripcionLimitacion(null, null, null, null, null, null, null, null, null, null, null, null, null);

    this._TipoIdentificacionService.select().subscribe(
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

    this._TipoIdentificacionService.select().subscribe(
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

    this._CfgDepartamentoService.select().subscribe(
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

    this._CfgEntidadJuducialService.select().subscribe( 
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

    this.vhloRnaTramiteInscripcionLimitacion.departamentoId = this.departamentoSelected;
    this.vhloRnaTramiteInscripcionLimitacion.entidadJudicialId = this.entidadJudicialSelected;
    this.vhloRnaTramiteInscripcionLimitacion.limitacionId = this.limitacionSelected;
    this.vhloRnaTramiteInscripcionLimitacion.municipioId = this.municipioSelected;
    this.vhloRnaTramiteInscripcionLimitacion.tipoProcesoId = this.tipoProcesoSelected;
    this.vhloRnaTramiteInscripcionLimitacion.causalLimitacionId = this.causalLimitacionSelected;
    this.vhloRnaTramiteInscripcionLimitacion.ciudadanoDemandadoId = this.ciudadanoDemandado.id;
    this.vhloRnaTramiteInscripcionLimitacion.ciudadanoDemandanteId = this.ciudadanoDemandante.id;
    let data =[
      {'datosLimitacion': this.vhloRnaTramiteInscripcionLimitacion},

      {'vehiculosLimitacionArray': this.datos2}
    ]
    this._TramiteInscripcionLimitacionService.register(data, token).subscribe(
      response => {
        if (response.status == 'success') {
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
            text: 'La limitacion a la propiedad ' + this.vehiculo.placa.numero + ', con la fecha: ' + this.vhloRnaTramiteInscripcionLimitacion.fechaExpedicion + ', expedido por la entidad judicial: ' + eJudicial+' ya se encuentra registrado',
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

  onSearchByPlaca() {
    swal({
      title: 'Buscando vehiculo!',
      text: 'Solo tardara unos segundos por favor espere.',
      onOpen: () => {
        swal.showLoading()
      }
    });

    let token = this._loginService.getToken();

    this._VehiculoService.searchByFilter({ 'filtro': this.placa }, token).subscribe(
      response => {
        swal.close();
        if (response.status == 'success') {
          this.vehiculo = response.data;
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

    this._UserCiudadanoService.searchByIdentificacion(identificacion,token).subscribe(
      response => {
        if (response.status == 'success') {
          this.ciudadanoDemandado = response.data;
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

    this._UserCiudadanoService.searchByIdentificacion(identificacion,token).subscribe(
      response => {
        if (response.status == 'success') {
          this.ciudadanoDemandante = response.data;
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
      this._MunicipioService.selectByDepartamento({'idDepartamento':this.departamentoSelected}, token).subscribe(
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
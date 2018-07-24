import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { LoginService } from '../../../services/login.service';
import { RnmaTramiteLimitacionService } from '../../../services/rnmaTramiteLimitacion.service';
import { VehiculoLimitacionService } from '../../../services/vehiculoLimitacion.service';
import { MunicipioService } from '../../../services/municipio.service';
import { DepartamentoService } from '../../../services/departamento.service';
import { CfgEntidadJudicialService } from '../../../services/cfgEntidadJudicial.service';
import { LimitacionService } from '../../../services/cfgLimitacion.service';
import { CfgTipoProcesoService } from '../../../services/cfgTipoProceso.service';
import { RnmaTramiteInscripcionLimitacion } from '../rnmaTramiteInscripcionLimitacion.modelo';
import { Ciudadano } from '../../ciudadano/ciudadano.modelo';
import swal from 'sweetalert2';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
  @Output() ready = new EventEmitter<any>();
  public rnmaTramiteInscripcionLimitacion: RnmaTramiteInscripcionLimitacion;
  public errorMessage;
  public respuesta;
  public ciudadanoDemandado: Ciudadano = null;
  public ciudadanoDemandante: Ciudadano = null;
  public municipios;
  public municipioSelected;
  public departamentos;
  public departamentoSelected;
  public entidadesJudiciales;
  public entidadJudicialSelected;
  public limitaciones;
  public limitacionSelected;
  public tiposProceso;
  public tipoProcesoSelected;
  public datos = {
  }
  public datos2 = {
    'vehiculos': [],
    'ciudadanoDemandante': null,
    'ciudadanoDemandado': null,
  }

  constructor(
    private _RnmaTramiteInscripcionLimitacionService: RnmaTramiteLimitacionService,
    private _VehiculoLimitacionService: VehiculoLimitacionService,
    private _loginService: LoginService,
    private _MunicipioService: MunicipioService,
    private _DepartamentoService: DepartamentoService,
    private _CfgEntidadJuducialService: CfgEntidadJudicialService,
    private _LimitacionService: LimitacionService,
    private _CfgTipoProcesoService: CfgTipoProcesoService,
  ) { }

  ngOnInit() {
    this.rnmaTramiteInscripcionLimitacion = new RnmaTramiteInscripcionLimitacion(null, null, null, null, null, null, null, null, null, null, null, null);

    this._MunicipioService.getMunicipioSelect().subscribe(
      response => {
        this.municipios = response;
      },
      error => {
        this.errorMessage = <any>error;

        if (this.errorMessage != null) {
          console.log(this.errorMessage);
          alert("Error en la petición");
        }
      }
    );
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
    this._CfgTipoProcesoService.getTipoProceso().subscribe(
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
  onCancelar() {
    this.ready.emit(true);
  }
  onEnviar() {
    let token = this._loginService.getToken();
    this.rnmaTramiteInscripcionLimitacion.ciudadanoDemandadoId = this.datos2.ciudadanoDemandado.id;
    this.rnmaTramiteInscripcionLimitacion.ciudadanoDemandanteId = this.datos2.ciudadanoDemandante.id;
    this.rnmaTramiteInscripcionLimitacion.departamentoId = this.departamentoSelected;
    this.rnmaTramiteInscripcionLimitacion.entidadJudicialId = this.entidadJudicialSelected;
    this.rnmaTramiteInscripcionLimitacion.limitacionId = this.limitacionSelected;
    this.rnmaTramiteInscripcionLimitacion.municipioId = this.municipioSelected;
    this.rnmaTramiteInscripcionLimitacion.tipoProcesoId = this.tipoProcesoSelected;
    console.log(this.rnmaTramiteInscripcionLimitacion);
    this._RnmaTramiteInscripcionLimitacionService.register(this.rnmaTramiteInscripcionLimitacion, token).subscribe(
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
          swal({
            title: 'Error!',
            text: 'La placa ya se encuentra registrado',
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

}
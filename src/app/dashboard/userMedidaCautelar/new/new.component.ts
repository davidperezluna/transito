import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { UserMedidaCautelar } from '../userMedidaCautelar.modelo';
import { VhloCfgLimitacionTipoProcesoService } from '../../../services/vhloCfgLimitacionTipoProceso.service';
import { VhloCfgLimitacionCausalService } from '../../../services/vhloCfgLimitacionCausal.service';
import { VhloVehiculoService } from '../../../services/vhloVehiculo.service';
import { VhloPropietarioService } from '../../../services/vhloPropietario.service';
import { UserMedidaCautelarService } from '../../../services/userMedidaCautelar.service';
import { UserCiudadanoService } from '../../../services/userCiudadano.service';
import { UserCfgTipoIdentificacionService } from '../../../services/userCfgTipoIdentificacion.service';
import { CfgMunicipioService } from '../../../services/cfgMunicipio.service';
import { CfgDepartamentoService } from '../../../services/cfgDepartamento.service';
import { CfgEntidadJudicialService } from '../../../services/cfgEntidadJudicial.service';
import { LoginService } from '../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
  @Output() onReady = new EventEmitter<any>();
  public medidaCautelar: UserMedidaCautelar;
  public errorMessage;

  public idTipoIdentificacionDemandante:any;
  public idTipoIdentificacionDemandado:any;
  public identificacionDemandado: any;
  public identificacionDemandante: any;

  public entidadesJudiciales;
  public municipios;
  public departamentos;
  public medidasCautelares;
  public tiposProceso;
  public causalesLimitacion;
  public tiposIdentificacion;
  public demandado:any;
  public vehiculos:any;

  constructor(
    private _VehiculoService: VhloVehiculoService,
    private _PropietarioService: VhloPropietarioService,
    private _UserCiudadanoService: UserCiudadanoService,
    private _DepartamentoService: CfgDepartamentoService,
    private _MunicipioService: CfgMunicipioService,
    private _EntidadJuducialService: CfgEntidadJudicialService,
    private _TipoProcesoLimitacionService: VhloCfgLimitacionTipoProcesoService,
    private _CausalLimitacionService: VhloCfgLimitacionCausalService,
    private _MedidaCautelar: UserMedidaCautelarService,
    private _TipoIdentificacionService: UserCfgTipoIdentificacionService,
    private _LoginService: LoginService,
  ) { }

  ngOnInit() {
    this.medidaCautelar = new UserMedidaCautelar(null, null, null, null, null, null, [], null, null, null, null, null);

    this._TipoIdentificacionService.select().subscribe(
      response => {
        this.tiposIdentificacion = response;
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

  onCancelar() {
    this.onReady.emit(true);
  }

  onSearchDemandado() {
    swal({
      title: 'Buscando demandado!',
      text: 'Solo tardara unos segundos por favor espere.',
      onOpen: () => {
        swal.showLoading()
      }
    });

    if (!this.identificacionDemandado) {
      swal({
        title: 'Error!',
        text: 'El número de identificación del demandado no puede estar vacio.',
        type: 'error',
        confirmButtonText: 'Aceptar'
      });
    }else{
      let token = this._LoginService.getToken();

      let datos = {
        'idTipoIdentificacion': this.idTipoIdentificacionDemandado,
        'identificacion': this.identificacionDemandado,
      };

      this._UserCiudadanoService.searchByIdentificacion(datos, token).subscribe(
        response => {
          if (response.code == 200) {
            if (response.data.ciudadano) {
              this.demandado = response.data.ciudadano;

              this._VehiculoService.searchByParameters({ 'propietario': response.data.ciudadano.identificacion }, token).subscribe(
                response => {
                  if (response.code == 200) {
                    this.vehiculos = response.data;

                    this.medidaCautelar.demandados.push(
                      {
                        'ciudadano': this.demandado,
                        'vehiculos': this.vehiculos,
                      }
                    );

                    swal({
                      title: 'Perfecto!',
                      text: response.message,
                      type: 'success',
                      confirmButtonText: 'Aceptar'
                    });
                  } else {
                    this.vehiculos = null;

                    this.medidaCautelar.demandados.push(
                      {
                        'ciudadano': this.demandado,
                        'vehiculos': this.vehiculos,
                      }
                    );
                    
                    swal({
                      title: 'Error!',
                      text: response.message,
                      type: 'error',
                      confirmButtonText: 'Aceptar'
                    });
                  }
                  error => {
                      this.errorMessage = <any>error;
                      if (this.errorMessage != null) {
                          console.log(this.errorMessage);
                          alert('Error en la petición');
                      }
                  }

                  this._CausalLimitacionService.select().subscribe(
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
              
                  this._DepartamentoService.select().subscribe(
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
              
                  this._EntidadJuducialService.select().subscribe( 
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
              
                  this._TipoProcesoLimitacionService.select().subscribe(
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
              ); 
            }else{
              swal({
                title: 'Error!',
                text: 'Ciudadano no encontrado',
                type: 'error',
                confirmButtonText: 'Aceptar'
              });
            }
          } else {
            swal({
              title: 'Error!',
              text: response.message,
              type: 'error',
              confirmButtonText: 'Aceptar'
            });
          }
          error => {
            this.errorMessage = <any>error;

            if (this.errorMessage != null) {
              console.log(this.errorMessage);
              alert("Error en la petición");
            }
          }
        }
      );
    }
  }

  onRemoveDemandado(demandado: any): void {
    this.medidaCautelar.demandados = this.medidaCautelar.demandados.filter(h => h !== demandado);
  }

  onChangedDepartamento(e) {
    if (this.medidaCautelar.idDepartamento) {
      let token = this._LoginService.getToken();
      this._MunicipioService.selectByDepartamento({ 'idDepartamento':this.medidaCautelar.idDepartamento }, token).subscribe(
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
    }
  }

  onEnviar() {
    let token = this._LoginService.getToken();

    this._MedidaCautelar.register(this.medidaCautelar, token).subscribe(
      response => {
        if (response.code == 200) {
          this.onReady.emit(true);

          swal({
            title: response.title,
            text: response.message,
            type: response.message,
            confirmButtonText: 'Aceptar'
          });
        } else {
          swal({
            title: response.title,
            text: response.message,
            type: response.message,
            confirmButtonText: 'Aceptar'
          });
        }
        error => {
          this.errorMessage = <any>error;

          if (this.errorMessage != null) {
            console.log(this.errorMessage);
            alert("Error en la petición");
          }
        }
      }
    );
  }
}
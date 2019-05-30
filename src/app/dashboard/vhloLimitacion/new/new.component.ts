import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { VhloLimitacion } from '../vhloLimitacion.modelo';
import { VhloCfgLimitacionTipoProcesoService } from '../../../services/vhloCfgLimitacionTipoProceso.service';
import { VhloCfgLimitacionCausalService } from '../../../services/vhloCfgLimitacionCausal.service';
import { VhloCfgLimitacionTipoService } from '../../../services/vhloCfgLimitacionTipo.service';
import { VhloLimitacionService } from '../../../services/vhloLimitacion.service';
import { VhloVehiculoService } from '../../../services/vhloVehiculo.service';
import { VhloPropietarioService } from '../../../services/vhloPropietario.service';
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
  public limitacion: VhloLimitacion;
  public errorMessage;

  public idTipoIdentificacionDemandante:any;
  public idTipoIdentificacionDemandado:any;
  public identificacionDemandado: any;
  public identificacionDemandante: any;

  public entidadesJudiciales;
  public municipios;
  public departamentos;
  public limitaciones;
  public tiposProceso;
  public causalesLimitacion;
  public tiposIdentificacion;

  public vehiculos: any;
  public idVehiculo: any;
  public demandado:any;
  public demandante:any;

  constructor(
    private _LimitacionService: VhloLimitacionService,
    private _VehiculoService: VhloVehiculoService,
    private _PropietarioService: VhloPropietarioService,
    private _UserCiudadanoService: UserCiudadanoService,
    private _DepartamentoService: CfgDepartamentoService,
    private _MunicipioService: CfgMunicipioService,
    private _EntidadJuducialService: CfgEntidadJudicialService,
    private _TipoLimitacionService: VhloCfgLimitacionTipoService,
    private _TipoProcesoLimitacionService: VhloCfgLimitacionTipoProcesoService,
    private _CausalLimitacionService: VhloCfgLimitacionCausalService,
    private _TipoIdentificacionService: UserCfgTipoIdentificacionService,
    private _LoginService: LoginService,
  ) { }

  ngOnInit() {
    this.limitacion = new VhloLimitacion(null, null, null, null, [], [], null, null, null, null, null, null, null);

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
              this.limitacion.idDemandado = response.data.ciudadano.id;

              this._VehiculoService.searchByParameters({ 'propietario': response.data.ciudadano.identificacion }, token).subscribe(
                response => {
                    if (response.code == 200) {
                      this.vehiculos = response.data;

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
                  
                      this._TipoLimitacionService.select().subscribe(
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

                      swal({
                        title: 'Perfecto!',
                        text: response.message,
                        type: 'success',
                        confirmButtonText: 'Aceptar'
                      });
                    } else {
                      this.vehiculos = null;
                      
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
                }
              ); 
            }else{
              this.demandado = null;
              this.limitacion.idDemandado = null;

              swal({
                title: 'Error!',
                text: 'Ciudadano no encontrado',
                type: 'error',
                confirmButtonText: 'Aceptar'
              });
            }

            swal.close();
          } else {
            this.demandado = null;
            this.limitacion.idDemandado = null;

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

  onVehiculoSelect(e: any, idVehiculo: any){
    if (e.target.checked) {
      this.limitacion.vehiculos.push(idVehiculo);
    }else{
      this.limitacion.vehiculos =  this.limitacion.vehiculos.filter(h => h !== idVehiculo);
    }
  }

  onSearchDemandante() {
    swal({
      title: 'Buscando demandante!',
      text: 'Solo tardara unos segundos por favor espere.',
      onOpen: () => {
        swal.showLoading()
      }
    });

    if (!this.idTipoIdentificacionDemandante) {
      swal({
        title: 'Error!',
        text: 'El número de identificación del demandante no puede estar vacio.',
        type: 'error',
        confirmButtonText: 'Aceptar'
      });
    }else{
      let token = this._LoginService.getToken();
  
      let identificacion = {
        'identificacion': this.identificacionDemandante,
        'idTipoIdentificacion': this.idTipoIdentificacionDemandante,
      };
  
      this._UserCiudadanoService.searchByIdentificacion(identificacion,token).subscribe(
        response => {
          if (response.code == 200) {
            if (response.data.ciudadano) {
              this.demandante = response.data.ciudadano;

              this.limitacion.demandantes.push(
                {
                  'id': this.demandante.id,
                  'nombre': this.demandante.primerNombre,
                  'identificacion': this.demandante.identificacion,
                  'tipo': 'CIUDADANO'
                }
              );
            }else if(response.data.empresa) {
              this.demandante = response.data.empresa;
  
              this.limitacion.demandantes.push(
                {
                  'id': this.demandante.id,
                  'nombre': this.demandante.nombre,
                  'identificacion': this.demandante.nit,
                  'tipo': 'EMPRESA'
                }
              );
            }
  
            swal.close();
          } else {
            this.demandante = null;
  
            swal({
              title: 'Error!',
              text: response.messsage,
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

  onRemoveDemandante(demandante: any): void {
    this.limitacion.demandantes = this.limitacion.demandantes.filter(h => h !== demandante);
  }

  onChangedDepartamento(e) {
    if (this.limitacion.idDepartamento) {
      let token = this._LoginService.getToken();
      this._MunicipioService.selectByDepartamento({ 'idDepartamento':this.limitacion.idDepartamento }, token).subscribe(
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

    this._LimitacionService.register(this.limitacion, token).subscribe(
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
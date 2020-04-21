import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';

import { FroTrteCarpeta } from '../froTrteCarpeta.modelo';
import { FroTrteSolicitudService } from '../../../../../services/froTrteSolicitud.service';
import { FroTrtePrecioService } from '../../../../../services/froTrtePrecio.service';
import { CfgOrganismoTransitoService } from '../../../../../services/cfgOrganismoTransito.service';
import { VhloVehiculoService } from '../../../../../services/vhloVehiculo.service';
import { UserCiudadanoService } from '../../../../../services/userCiudadano.service';
import { CfgModuloService } from '../../../../../services/cfgModulo.service';
import { UserCfgTipoIdentificacionService } from 'app/services/userCfgTipoIdentificacion.service';
import { FroTrteCarpetaService } from 'app/services/froTrteCarpeta.service';

import { LoginService } from '../../../../../services/login.service';
import swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-new-frotrtecarpeta',
  templateUrl: './new.component.html'
})

export class NewComponent implements OnInit, AfterViewInit {
  @Output() ready = new EventEmitter<any>();

  public errorMessage;

  public organismosTransito;
  public modulos;
  public tramitesPrecio;
  public placa;
  public identificacion;
  public tipoIdentificacionSelected;
  public tiposIdentificacion: any;
  public vehiculo: any = null;
  public ciudadano: any = null;
  public empresa: any = null;

  public tramiteCarpeta: FroTrteCarpeta;

  constructor(
    private _FroTrteSolicitudService: FroTrteSolicitudService,
    private _FroTrtePrecioService: FroTrtePrecioService,
    private _FroTrteCarpetaService: FroTrteCarpetaService,
    private _OrganismoTransitoService: CfgOrganismoTransitoService,
    private _ModuloService: CfgModuloService,
    private _TipoIdentificacionService: UserCfgTipoIdentificacionService,
    private _VhloVehiculoService: VhloVehiculoService,
    private _UserCiudadanoService: UserCiudadanoService,
    private _LoginService: LoginService,
  ) { }

  ngOnInit() {
    this.tramiteCarpeta = new FroTrteCarpeta(null, null, null, null, null, null, null, null, null);

    this._OrganismoTransitoService.selectSedes().subscribe(
      response => {
        this.organismosTransito = response;
      },
      error => {
        this.errorMessage = <any>error;
        if (this.errorMessage != null) {
          console.log(this.errorMessage);
          alert("Error en la petición");
        }
      }
    );
    this._ModuloService.select().subscribe(
      response => {
        this.modulos = response;
      },
      error => {
        this.errorMessage = <any>error;

        if (this.errorMessage != null) {
          console.log(this.errorMessage);
          alert("Error en la petición");
        }
      }
    );
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

  ngAfterViewInit() {
    swal.close();
  }

  onEnviar() {
    let token = this._LoginService.getToken();
    let identity = this._LoginService.getIdentity();

    this.tramiteCarpeta.identificacionCiudadano = identity.identificacion;
    if(this.ciudadano) {
      this.tramiteCarpeta.idSolicitante = this.ciudadano.id;
    } else if(this.empresa) {
      this.tramiteCarpeta.idSolicitante = this.empresa.id;
    }

    if(this.vehiculo) {
      this.tramiteCarpeta.idVehiculo = this.vehiculo.id;
    }

    this._FroTrteCarpetaService.register(this.tramiteCarpeta, token).subscribe(
      response => {
        if(response.code == 200) {
          this.ready.emit(true);
          
          swal({
            title: response.title,
            text: response.message,
            type: response.status,
            confirmButtonText: 'Aceptar'
          });
        } else {
          swal({
            title: response.title,
            text: response.message,
            type: response.status,
            confirmButtonText: 'Aceptar'
          });
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

  onCancelar(){
    this.ready.emit(true);
  }

  onChangedModulo(e) {
    if (e) {
      swal({
        title: 'Cargando trámites disponibles!',
        text: 'Solo tardara unos segundos por favor espere.',
        onOpen: () => {
          swal.showLoading()
        }
      });

      let token = this._LoginService.getToken();

      this._FroTrtePrecioService.selectByModulo({ 'idModulo': e }, token).subscribe(
        response => {
          swal.close();
          this.tramitesPrecio = response.data;

          if (response.code == 400) {
            swal({
              title: response.title,
              text: response.message,
              type: response.status,
              confirmButtonText: 'Aceptar'
            });
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

  onSearchVehiculo() {
    let token = this._LoginService.getToken();

    swal({
      title: 'Buscando vehículo!',
      text: 'Solo tardará unos segundos, por favor espere.',
      onOpen: () => {
        swal.showLoading()
      }
    });

    if(this.tramiteCarpeta.idModulo) {
      if (this.placa) {
        this._VhloVehiculoService.searchByPlacaModuloAndSede({ 'idOrganismoTransito': this.tramiteCarpeta.idOrganismoTransito, 'idModulo': this.tramiteCarpeta.idModulo, 'numero': this.placa }, token).subscribe(
          response => {
            swal.close();

            if (response.code == 200) {
              this.vehiculo = response.data;
              swal({
                title: response.title,
                text: response.message,
                type: response.status,
              });
            } else {
              swal({
                title: response.title,
                text: response.message,
                type: response.status,
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
      }
    } else {
      swal({
        title: 'Atención!',
        text: 'Aún no se ha seleccionado un módulo, por favor seleccione uno para poder buscar el vehículo.',
        type: 'warning',
        confirmButtonText: 'Aceptar'
      });
    }
  }

  onSearchSolicitante() {
    let token = this._LoginService.getToken();

    if (this.identificacion) {
      this._UserCiudadanoService.searchByIdentificacion({ 'idTipoIdentificacion': this.tipoIdentificacionSelected, 'identificacion': this.identificacion }, token).subscribe(
        response => {
          if (response.code == 200) {
            if(response.data.ciudadano != null) {
              this.empresa = null;
              this.tramiteCarpeta.tipoSolicitante = null;
              this.tramiteCarpeta.tipoSolicitante = 'ciudadano';
              this.ciudadano = response.data.ciudadano;
            } else if (response.data.empresa != null) {
              this.ciudadano = null;
              this.tramiteCarpeta.tipoSolicitante = null;
              this.tramiteCarpeta.tipoSolicitante = 'empresa';
              this.empresa = response.data.empresa;
            }
            swal({
              title: response.title,
              text: response.message,
              type: response.status,
            });
          } else {
            swal({
              title: response.title,
              text: response.message,
              type: response.status,
              confirmButtonText: 'Aceptar'
            });
          }
        }
      );
    }
  }
}

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FroTrteSolicitudService } from '../../../../services/froTrteSolicitud.service';
import { FroFacTramiteService } from '../../../../services/froFacTramite.service';
import { CfgMunicipioService } from '../../../../services/cfgMunicipio.service';
import { UserCfgTipoIdentificacionService } from '../../../../services/userCfgTipoIdentificacion.service';
import { PnalFuncionarioService } from '../../../../services/pnalFuncionario.service';
import { LoginService } from '../../../../services/login.service';

import swal from 'sweetalert2';

@Component({
    selector: 'appRna-radicado-cuenta',
    templateUrl: './newRna.radicadoCuenta.html'
})
export class NewRnaRadicadoCuentaComponent implements OnInit {
    @Output() readyTramite = new EventEmitter<any>();
    @Output() cancelarTramite = new EventEmitter<any>();
    @Input() vehiculo: any = null;
    @Input() tramiteFactura: any = null;
    public errorMessage; 
    
    public autorizado: any = true;
    public tramiteSolicitud: any = null;
    public municipios:any;
    public tiposIdentificacion: any;
    
    public datos = {
      'numeroDocumento': null,
      'fechaIngreso': null,
      'guiaLlegada': null,
      'empresaEnvio': null,
      'runt': null,
      'idFuncionario': null,
      'idMunicipio': null,
      'idTipoIdentificacion': null,
      'idTramiteFactura': null,
    };

    constructor(
        private _TramiteSolicitudService: FroTrteSolicitudService,
        private _TramiteFacturaService: FroFacTramiteService,
        private _MunicipioService: CfgMunicipioService,
        private _TipoIdentificacionService: UserCfgTipoIdentificacionService,
        private _FuncionarioService: PnalFuncionarioService,
        private _LoginService: LoginService,
    ) { }
 
    ngOnInit() {
      let token = this._LoginService.getToken();

      let identity = this._LoginService.getIdentity();

      this._FuncionarioService.searchLogin({ 'identificacion': identity.identificacion }, token).subscribe(
        response => {
          if (response.status == 'success') {
            this.datos.idFuncionario = response.data.id;
            this.autorizado = true;

            if (this.vehiculo.tipoMatricula == 'RADICADO') {

              this._TramiteFacturaService.show({ 'id': this.tramiteFactura.id }, token).subscribe(
                response => {
                  if (response.code == 200) {
                    this.tramiteFactura = response.data;

                    swal.close();
                  } else {
                    this.tramiteFactura = null;

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

              if (this.tramiteFactura.realizado) {
                this._TramiteSolicitudService.showByTamiteFactura({ 'idTramiteFactura': this.tramiteFactura.id }, token).subscribe(
                  response => {
                    if (response.code == 200) {
                      this.tramiteSolicitud = response.data;
                    } else {
                      this.tramiteSolicitud = null;

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
              } else {
                this._MunicipioService.select().subscribe(
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
            } else {
              this.autorizado = false;
              
              swal({
                title: 'Error!',
                text: 'El vehiculo no se registro para radicado de cuenta.',
                type: 'error',
                confirmButtonText: 'Aceptar'
              });
            }
          } else {
            this.autorizado = false;

            swal({
              title: 'Error!',
              text: 'Usted no tiene permisos para realizar tramites',
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
    }
    
   
    onEnviar(){     
      let token = this._LoginService.getToken();

      this.datos.idTramiteFactura = this.tramiteFactura.id;

      let resumen = "<b>No. factura: </b>" + this.tramiteFactura.factura.numero;

      this.readyTramite.emit({'foraneas':this.datos, 'resumen': resumen});
    }
    onCancelar(){
        this.cancelarTramite.emit(true);
    }

}
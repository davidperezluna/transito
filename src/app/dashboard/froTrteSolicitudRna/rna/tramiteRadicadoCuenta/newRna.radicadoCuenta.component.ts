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
    @Output() onReadyTramite = new EventEmitter<any>();
    @Input() vehiculo: any = null;
    @Input() tramiteFactura: any = null;
    @Input() funcionario: any = null;
    @Input() tramitesRealizados: any = null;
    public errorMessage; 
    
    public realizado: any = false;
    public tramiteSolicitud: any = null;
    public municipios:any;
    public tiposIdentificacion: any;
    
    public datos = {
      'numeroDocumento': null,
      'fechaIngreso': null,
      'guiaLlegada': null,
      'empresaEnvio': null,
      'idFuncionario': null,
      'idVehiculo': null,
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
      if (this.vehiculo.tipoMatricula == 'RADICADO') {
        this.datos.idFuncionario  = this.funcionario.id;
          
        if ( this.tramitesRealizados.length > 0) {
            this.tramitesRealizados.forEach(tramiteRealizado => {
                tramiteRealizado = Object.keys(tramiteRealizado).map(function(key) {
                    return tramiteRealizado[key];
                });
                
                if (tramiteRealizado.includes(this.tramiteFactura.id, 2)) {
                    this.realizado = true;
                }
            });
        }

        if (this.realizado) {
            swal({
                title: 'Atención!',
                text: 'El trámite seleccionado ya fue realizado.',
                type: 'warning',
                confirmButtonText: 'Aceptar'
            });
        } else{
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
        swal({
          title: 'Error!',
          text: 'El vehiculo no se registro para radicado de cuenta.',
          type: 'error',
          confirmButtonText: 'Aceptar'
        });
      }
    }
    
   
    onEnviar(){     
      let token = this._LoginService.getToken();

      this.datos.idTramiteFactura = this.tramiteFactura.id;
      this.datos.idVehiculo = this.vehiculo.id;

      let resumen = "<b>No. factura: </b>" + this.tramiteFactura.factura.numero;

      this.realizado = true;

      this.onReadyTramite.emit(
        {
          'foraneas':this.datos, 
          'resumen': resumen
        }
      );
    }


}
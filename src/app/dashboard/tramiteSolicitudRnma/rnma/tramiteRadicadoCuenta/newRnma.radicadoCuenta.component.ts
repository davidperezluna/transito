import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { TramiteSolicitud } from '../../tramiteSolicitudRnma.modelo';
import { TramiteSolicitudService } from '../../../../services/tramiteSolicitud.service';
import { TramiteFacturaService } from '../../../../services/tramiteFactura.service';
import {LoginService} from '../../../../services/login.service';
import {VehiculoService} from '../../../../services/vehiculo.service';
import {CfgMunicipioService} from '../../../../services/municipio.service';
import { UserCfgTipoIdentificacionService } from '../../../../services/userCfgTipoIdentificacion.service';

import swal from 'sweetalert2';
import { Factura } from '../../../factura/factura.modelo';

@Component({
    selector: 'appRnma-radicado-cuenta',
    templateUrl: './newRnma.radicadoCuenta.html'
})
export class NewRnmaRadicadoCuentaComponent implements OnInit {
    @Output() readyTramite = new EventEmitter<any>();
    @Output() cancelarTramite = new EventEmitter<any>();
    @Input() vehiculo: any = null;
    @Input() factura: any = null;
    @Input() tramitesFactura: any = null;

    public errorMessage;
    public tramiteFacturaSelected: any;
    public tramiteRealizado: any;
    public municipios:any;
    public municipio:any;
    public municipioSelected:any;
    public tiposIdentificacion: any;
    public tipoIdentificacion: any;
    public tipoIdentificacionSelected:any;
    public numeroDocumento: any;
    public fechaIngreso: any;
    public guiaLlegada: any;
    public empresaEnvio: any;
    public runt: any;
    public resumen = {};     public datos = {
        'municipioSelected': null,
        'tipoIdentificacionSelected': null,
        'numeroDocumento': null,
        'fechaIngreso': null,
        'guiaLlegada': null,
        'empresaEnvio': null,
        'runt': null,
        'tramiteFormulario': null,
        'idFactura': null,
    };

    constructor(
        private _TramiteSolicitudService: TramiteSolicitudService,
        private _loginService: LoginService,
        private _tramiteFacturaService: TramiteFacturaService,
        private _VehiculoService: VehiculoService,
        private _CfgMunicipioService: CfgMunicipioService,
        private _TipoIdentificacionService: UserCfgTipoIdentificacionService,
    ) { }
 
    ngOnInit() {
        
         let token = this._loginService.getToken();
       
        this._CfgMunicipioService.getMunicipioSelect().subscribe(
            response => {
              this.municipios = response;
            }, 
            error => {
              this.errorMessage = <any>error;
      
              if(this.errorMessage != null){
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
    
   
    enviarTramite(){     
        let token = this._loginService.getToken();

        this.datos.municipioSelected = this.municipioSelected;
        this.datos.tipoIdentificacionSelected = this.tipoIdentificacionSelected;
        this.datos.numeroDocumento = this.numeroDocumento;
        this.datos.fechaIngreso = this.fechaIngreso;
        this.datos.guiaLlegada = this.guiaLlegada;
        this.datos.empresaEnvio = this.empresaEnvio;
        this.datos.runt = this.runt;
        this.datos.idFactura = this.factura.id;
        this.datos.tramiteFormulario = 'rnma-radicadocuenta';
        this.readyTramite.emit({'foraneas':this.datos, 'resumen':this.resumen});

        

    }
    onCancelar(){
        this.cancelarTramite.emit(true);
    }

}
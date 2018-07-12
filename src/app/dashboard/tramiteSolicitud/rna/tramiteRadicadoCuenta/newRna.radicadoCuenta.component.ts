import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { TramiteSolicitud } from '../../tramiteSolicitud.modelo';
import { TramiteSolicitudService } from '../../../../services/tramiteSolicitud.service';
import { TramiteFacturaService } from '../../../../services/tramiteFactura.service';
import {LoginService} from '../../../../services/login.service';
import {VehiculoService} from '../../../../services/vehiculo.service';
import {MunicipioService} from '../../../../services/municipio.service';
import { TipoIdentificacionService } from '../../../../services/tipoIdentificacion.service';

import swal from 'sweetalert2';
import { Factura } from '../../../factura/factura.modelo';

@Component({
    selector: 'appRna-radicado-cuenta',
    templateUrl: './newRna.radicadoCuenta.html'
})
export class NewRnaRadicadoCuentaComponent implements OnInit {
    @Output() readyTramite = new EventEmitter<any>();
    @Output() cancelarTramite = new EventEmitter<any>();
    @Input() vehiculo: any = null;
    @Input() factura: any = null;
    @Input() tramitesFactura: any = null;
    public errorMessage;
    public respuesta;
    public tramiteFacturaSelected: any;
    public tramiteRealizado: any;
    public numeroDocumento: any;
    public fechaIngreso: any;
    public guiaLlegada: any;
    public empresaEnvio: any;
    public rut: any;
    public municipios:any;
    public municipio:any;
    public municipioSelected:any;
    public tiposIdentificacion: any;
    public tipoIdentificacion: any;
    public tipoIdentificacionSelected:any;
    public datos = {
        'municipioSelected': null,
        'tipoIdentificacionSelected': null,
        'numeroDocumento': null,
        'fechaIngreso': null,
        'guiaLlegada': null,
        'empresaEnvio': null,
        'rut': null,
        'tramiteFactura': null,
    };

    constructor(
        private _TramiteSolicitudService: TramiteSolicitudService,
        private _loginService: LoginService,
        private _tramiteFacturaService: TramiteFacturaService,
        private _VehiculoService: VehiculoService,
        private _MunicipioService: MunicipioService,
        private _tipoIdentificacionService: TipoIdentificacionService,
    ) { }
 
    ngOnInit() {
        
         let token = this._loginService.getToken();
       
        this._MunicipioService.getMunicipioSelect().subscribe(
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

          this._tipoIdentificacionService.getTipoIdentificacionSelect().subscribe(
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
        this.datos.rut = this.rut;
        this.datos.tramiteFactura = 4;
        console.log(this.datos);
        this.readyTramite.emit(this.datos);

        

    }
    onCancelar(){
        this.cancelarTramite.emit(true);
    }

}
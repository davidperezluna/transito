import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { FroTrteSolicitudService } from '../../../../services/froTrteSolicitud.service';
import { FroFacTramiteService } from '../../../../services/froFacTramite.service';
import { VhloCfgServicioService } from '../../../../services/vhloCfgServicio.service';
import { VhloVehiculoService } from '../../../../services/vhloVehiculo.service';
import { PnalFuncionarioService } from '../../../../services/pnalFuncionario.service';
import { LoginService } from '../../../../services/login.service';

import swal from 'sweetalert2';

@Component({
    selector: 'app-cambio-servicio',
    templateUrl: './new.cambioServicio.html'
})
export class NewCambioServicioComponent implements OnInit {
    @Output() onReadyTramite = new EventEmitter<any>();
    
    @Input() vehiculo: any = null;
    @Input() tramiteFactura: any = null;
    @Input() funcionario: any = null;
    @Input() tramitesRealizados: any = null;
    public errorMessage; 
    
    public realizado: any = false;
    public tramiteSolicitud: any = null;
    public servicios: any;
    public servicioSelected: any;
    public datos = {
        'documentacion': true,
        'observacion': null,
        'cantidad': null,
        'campos': null,
        'idFuncionario': null,
        'idVehiculo': null,
        'idServicio': null,
        'idTramiteFactura': null,
    };

    constructor(
        private _TramiteSolicitudService: FroTrteSolicitudService,
        private _TramiteFacturaService: FroFacTramiteService,
        private _VehiculoService: VhloVehiculoService,
        private _ServicioService: VhloCfgServicioService,
        private _FuncionarioService: PnalFuncionarioService,
        private _LoginService: LoginService,
    ) { }

    ngOnInit() {
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
            this._ServicioService.select().subscribe(
                response => {
                    this.servicios = response;
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
    }
    
    onEnviar(){
        let token = this._LoginService.getToken();

        this._ServicioService.show({ 'id': this.servicioSelected }, token).subscribe(
            servicioResponse => {
                this.datos.campos = ['servicio'];
                this.datos.idTramiteFactura = this.tramiteFactura.id;
                this.datos.idServicio = this.servicioSelected;
                this.datos.idVehiculo = this.vehiculo.id;

                let resumen = "No. factura: " + this.tramiteFactura.factura.numero +
                    ', Servicio anterior ' + this.vehiculo.servicio.nombre +
                    ', Servicio nuevo: ' + servicioResponse.data.nombre +
                    ', Cantidad: ' + this.datos.cantidad;

                this.realizado = true;

                this.onReadyTramite.emit(
                    {
                        'documentacion':this.datos.documentacion, 
                        'observacion':this.datos.observacion, 
                        'foraneas':this.datos, 
                        'resumen':resumen,
                        'idTramiteFactura': this.tramiteFactura.id,
                    }
                );
            }
        );
    }
}
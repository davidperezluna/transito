import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { FroTrteSolicitudService } from '../../../../../../services/froTrteSolicitud.service';
import { FroFacTramiteService } from '../../../../../../services/froFacTramite.service';
import { PnalFuncionarioService } from '../../../../../../services/pnalFuncionario.service';
import { VhloTpTarjetaOperacionService } from "../../../../../../services/vhloTpTarjetaOperacion.service";
import { VhloCfgServicioService } from "../../../../../../services/vhloCfgServicio.service";
import { DatePipe, CurrencyPipe } from '@angular/common';
import { LoginService } from '../../../../../../services/login.service';

import swal from 'sweetalert2';

@Component({
    selector: 'app-desvinculacion-cambio-servicio',
    templateUrl: './newDesvinculacionCambioServicio.html',
    providers: [DatePipe]
})

export class NewRnetDesvinculacionCambioServicioComponent implements OnInit {
    @Output() onReadyTramite = new EventEmitter<any>();
    @Input() tramiteFactura: any = null;
    @Input() vehiculo: any = null;
    @Input() funcionario: any = null;
    @Input() tramitesRealizados: any = null;
    public errorMessage;

    public tarjetaOperacion;
    public servicios;

    public realizado: any = false;
    public tramiteSolicitud: any = null;

    public datos = {
        'documentacion': true,
        'observacion': null,
        'campos': null,
        'idVehiculo': null,
        'idServicioAnterior': null,
        'idServicioNuevo': null,
        'idFuncionario': null,
        'idTramiteFactura': null,
    };

    constructor(
        private _TramiteSolicitudService: FroTrteSolicitudService,
        private _TramiteFacturaService: FroFacTramiteService,
        private _FuncionarioService: PnalFuncionarioService,
        private _TarjetaOperacionService: VhloTpTarjetaOperacionService,
        private _ServicioService: VhloCfgServicioService,
        private _LoginService: LoginService,
    ) { }

    ngOnInit() {
        console.log(this.vehiculo);

        let token = this._LoginService.getToken();

        this.datos.idFuncionario = this.funcionario.id;
        this.datos.idServicioAnterior = [this.vehiculo.servicio.id];

        console.log(this.datos.idServicioAnterior);

        if (this.tramitesRealizados.length > 0) {
            this.tramitesRealizados.forEach(tramiteRealizado => {
                tramiteRealizado = Object.keys(tramiteRealizado).map(function (key) {
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
        } else {
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


    onEnviar() {
        this.datos.campos = ['desvinculacionCambioServicio'];
        this.datos.idTramiteFactura = this.tramiteFactura.id;
        this.datos.idVehiculo = this.vehiculo.id;

        let resumen = "No. factura: " + this.tramiteFactura.factura.numero +
            ", servicio anterior: " + this.vehiculo.servicio.id;

        this.realizado = true;

        this.onReadyTramite.emit(
            {
                'documentacion': this.datos.documentacion,
                'observacion': this.datos.observacion,
                'foraneas': this.datos,
                'resumen': resumen,
                'idTramiteFactura': this.tramiteFactura.id,
            }
        );
    }
}
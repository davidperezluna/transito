import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FroTrteSolicitudService } from '../../../../services/froTrteSolicitud.service';
import { FroFacTramiteService } from '../../../../services/froFacTramite.service';
import { PnalFuncionarioService } from '../../../../services/pnalFuncionario.service';
import { VhloCfgServicioService } from '../../../../services/vhloCfgServicio.service';
import { CfgPaisService } from '../../../../services/cfgPais.service';
import { UserLcCfgCategoriaService } from '../../../../services/userLcCfgCategoria.service';
import { VhloTpAsignacionService } from '../../../../services/vhloTpAsignacion.service';
import { LoginService } from '../../../../services/login.service';

import swal from 'sweetalert2';

@Component({
    selector: 'app-expedicion-tarjeta-operacion-cambio-servicio',
    templateUrl: './newExpedicionTarjetaOperacionCambioServicio.html'
})
export class NewExpedicionTarjetaOperacionCambioServicioComponent implements OnInit {
    @Output() onReadyTramite = new EventEmitter<any>();
    @Input() vehiculo: any = null;
    @Input() funcionario: any = null;
    @Input() tramiteFactura: any = null;
    @Input() tramitesRealizados: any = null;
    public errorMessage;
    
    public realizado: any = false;
    public tramiteSolicitud: any = null;
    public servicios: any;

    public datos = {
        'campos': null,
        'documentacion': true,
        'observacion': null,
        'idFuncionario': null,
        'idTramiteFactura': null,
        'idServicioAnterior': null,
        'fechaVigencia': null,
        'nuevoNumeroTarjetaOperacion': null,
        'idServicioNuevo': null,
        'idVehiculo': null,

    };

    constructor(
        private _TramiteFacturaService: FroFacTramiteService,
        private _TramiteSolicitudService: FroTrteSolicitudService,
        private _FuncionarioService: PnalFuncionarioService,
        private _ServicioService: VhloCfgServicioService,
        private _VhloTpAsignacionService: VhloTpAsignacionService,
        private _CfgPaisService: CfgPaisService,
        private _CategoriaService: UserLcCfgCategoriaService,
        private _LoginService: LoginService,
    ) { }

    ngOnInit() {
        this.datos.idFuncionario = this.funcionario.id;

        let token = this._LoginService.getToken();

        console.log(this.vehiculo);
        this.datos.idServicioAnterior = [this.vehiculo.servicio.id];

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
        this.datos.campos = ['cambioServicio'];
        this.datos.idTramiteFactura = this.tramiteFactura.factura.id;
        this.datos.idVehiculo = this.vehiculo.id;

        let resumen = "<b>No. factura</b>" + this.tramiteFactura.factura.numero +
         ", servicio anterior:" + this.vehiculo.servicio.id;

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
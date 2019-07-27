import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FroTrteSolicitudService } from '../../../../services/froTrteSolicitud.service';
import { FroFacTramiteService } from '../../../../services/froFacTramite.service';
import { PnalFuncionarioService } from '../../../../services/pnalFuncionario.service';
import { VhloCfgNivelServicioService } from '../../../../services/vhloCfgNivelServicio.service';
import { VhloTpAsignacionService } from '../../../../services/vhloTpAsignacion.service';
import { LoginService } from '../../../../services/login.service';

import swal from 'sweetalert2';

@Component({
    selector: 'app-expedicion-tarjeta-operacion-cambio-nivel-servicio',
    templateUrl: './newExpedicionTarjetaOperacionCambioNivelServicio.html'
})
export class NewExpedicionTarjetaOperacionCambioNivelServicioComponent implements OnInit {
    @Output() onReadyTramite = new EventEmitter<any>();
    @Input() vehiculo: any = null;
    @Input() funcionario: any = null;
    @Input() tramiteFactura: any = null;
    @Input() tramitesRealizados: any = null;
    public errorMessage;
    
    public cupo;

    public realizado: any = false;
    public tramiteSolicitud: any = null;
    public nivelesServicio: any;
    /* public paises: any;
    public categorias: any; */

    public datos = {
        'campos': null,
        'documentacion': true,
        'observacion': null,
        'idFuncionario': null,
        'idTramiteFactura': null,
        'fechaVigencia': null,
        'idNivelServicioAnterior': null,
        'idNivelServicioNuevo': null,
        'idVehiculo': null,

    };

    constructor(
        private _TramiteFacturaService: FroFacTramiteService,
        private _TramiteSolicitudService: FroTrteSolicitudService,
        private _FuncionarioService: PnalFuncionarioService,
        private _NivelServicioService: VhloCfgNivelServicioService,
        private _VhloTpAsignacionService: VhloTpAsignacionService,
        private _LoginService: LoginService,
    ) { }

    ngOnInit() {
        this.datos.idFuncionario = this.funcionario.id;

        let token = this._LoginService.getToken();

        this._VhloTpAsignacionService.searchCupoByVehiculo({ 'idVehiculo': this.vehiculo.id }, token).subscribe(
            response => {
                this.cupo = response.data;
                this.datos.idNivelServicioAnterior = [this.cupo.nivelServicio.id];

                /* let timeoutId = setTimeout(() => {
                    this.ngOnInit();
                }, 100); */
            },
            error => {
                this.errorMessage = <any>error;

                if (this.errorMessage != null) {
                    console.log(this.errorMessage);
                    alert("Error en la petición");
                }
            }
        );

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
            this._NivelServicioService.select().subscribe(
                response => {
                    this.nivelesServicio = response;
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
        this.datos.campos = ['cambioNivelServicio'];
        this.datos.idTramiteFactura = this.tramiteFactura.factura.id;
        this.datos.idVehiculo = this.vehiculo.id;

        let resumen = "<b>No. factura</b>" + this.tramiteFactura.factura.numero +
         ", nivel servicio anterior:" + this.cupo.nivelServicio.id;

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
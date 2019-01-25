import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { TramiteSolicitud } from '../../tramiteSolicitudRnma.modelo';
import { TramiteSolicitudService } from '../../../../services/tramiteSolicitud.service';
import { TramiteFacturaService } from '../../../../services/tramiteFactura.service';
import { LoginService } from '../../../../services/login.service';
import { DatePipe, CurrencyPipe } from '@angular/common';
import { TipoIdentificacionService } from "../../../../services/tipoIdentificacion.service";
import { MsvRegistroIpatService } from "../../../../services/msvRegistroIpat.service";

import swal from 'sweetalert2';

@Component({
    selector: 'appRnma-prorroga-importacion-temporal',
    templateUrl: './newRnma.prorrogaImportacionTemporal.component.html'
})
export class NewRnmaProrrogaImportacionTemporalComponent implements OnInit {
    @Output() readyTramite = new EventEmitter<any>();
    @Output() cancelarTramite = new EventEmitter<any>();
    @Input() vehiculo: any = null;
    @Input() factura: any = null;
    public errorMessage;
    public tipoId: boolean = true;
    public tramitesFactura: any = null;
    public tramiteFacturaSelected: any;
    public tiposIdentificacion: any;
    public tipoIdentificacionSelected;

    public numeroRunt: any;
    public numeroCoutas: any;
    public licenciaTransito: any;
    public fechaSolicitudProrroga: any;
    public date: any;

    public vhl: any;
    public vehiculoProrroga: any;
    public vehiculoEncontrado: any;

    public tramiteRealizado: any;
    public datos = {
        'idFactura': null,
        'idVehiculo': null,
        'tramiteFormulario': null,
        'placa': null,
    };

    public datos2 = {
        'cPropietario': [],
        'vehiculos': [],
    };

    constructor(
        private _TipoIdentificacionService: TipoIdentificacionService,
        private _TramiteSolicitudService: TramiteSolicitudService,
        private _loginService: LoginService,
        private _TramiteFacturaService: TramiteFacturaService,
        private _MsvRegistroIpatService: MsvRegistroIpatService,

    ) { }

    ngOnInit() {

        this.date = new Date();
        var datePiper = new DatePipe(this.date);
        this.fechaSolicitudProrroga = datePiper.transform(this.date, 'yyyy-MM-dd');

        this._TramiteFacturaService.getTramitesByFacturaSelect(this.factura.id).subscribe(
            response => {
                this.tramitesFactura = response;

                this.tramitesFactura.forEach(tramiteFactura => {
                    if (tramiteFactura.realizado == 1) {
                        if (tramiteFactura.tramitePrecio.tramite.id == 3) {
                            this.tramiteRealizado = tramiteFactura;
                            console.log(this.tramiteRealizado);
                        }
                    }
                });
                error => {
                    this.errorMessage = <any>error;
                    if (this.errorMessage != null) {
                        console.log(this.errorMessage);
                        alert("Error en la petición");
                    }
                }
            }
        );

        //consultar tramite solicitud con tramiterealizado.id
        let token = this._loginService.getToken();
        if (this.tramiteRealizado) {
            this._TramiteSolicitudService.showTramiteSolicitudByTamiteFactura(token, this.tramiteRealizado.id).subscribe(
                response => {
                    this.datos = response.data.datos
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

        this._TipoIdentificacionService.getTipoIdentificacionSelect().subscribe(
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

    enviarTramite() {
        let token = this._loginService.getToken();

        this.datos.idFactura = this.factura.id;
        this.datos.tramiteFormulario = 'rnma-prorroga-importacion-temporal';
        this.datos.idVehiculo = this.vehiculo.id;
        let resumen = {
            'fecha solicitud prorroga': this.fechaSolicitudProrroga,
            'numero runt': this.numeroRunt,
            'numero cuotas': this.numeroCoutas,
            'numero licencia transito': this.licenciaTransito,
        };
        this.readyTramite.emit({ 'foraneas': this.datos, 'resumen': resumen });
    }

    onCancelar() {
        this.cancelarTramite.emit(true);
    }
}
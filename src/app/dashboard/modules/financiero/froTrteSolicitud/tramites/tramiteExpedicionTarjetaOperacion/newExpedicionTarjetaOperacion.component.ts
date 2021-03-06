import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { FroTrteSolicitudService } from "../../../../../../services/froTrteSolicitud.service";
import { ImoInsumoService } from "../../../../../../services/imoInsumo.service";
import { DatePipe, CurrencyPipe } from '@angular/common';
import { LoginService } from '../../../../../../services/login.service';
import swal from 'sweetalert2';

@Component({
    selector: 'app-expedicion-tarjeta-operacion',
    templateUrl: './newExpedicionTarjetaOperacion.html',
    providers: [DatePipe]
})

export class NewRnetExpedicionTarjetaOperacionComponent implements OnInit, AfterViewInit {
    @Output() onReadyTramite = new EventEmitter<any>();
    @Input() tramiteFactura: any = null;
    @Input() vehiculo: any = null;
    @Input() funcionario: any = null;
    @Input() tramitesRealizados: any = null;
    public errorMessage;

    public tarjetaOperacion;

    public realizado: any = false;
    public tramiteSolicitud: any = null;
    public motivoList: string[];
    public motivoSelected: any;

    public datos = {
        'documentacion': true,
        'observacion': null,
        'campos': null,
        'numeroTarjetaOperacion': null,
        'numeroTarjetaControl': null,
        'fechaVencimiento': null,
        'idVehiculo': null,
        'idFuncionario': null,
        'idTramiteFactura': null,
    };

    constructor(
        private _FroTrteSolicitudService: FroTrteSolicitudService,
        private _ImoInsumoService: ImoInsumoService,
        private _LoginService: LoginService,
    ) { }

    ngOnInit() {
        let token = this._LoginService.getToken();

        this.datos.idFuncionario = this.funcionario.id;

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
            swal({
                title: 'Buscando consecutivos!',
                text: 'Solo tardará unos segundos, por favor espere.',
                onOpen: () => {
                    swal.showLoading()
                }
            });
           
            this._FroTrteSolicitudService.calcularFechaVencimiento().subscribe(
                response => {
                    this.datos.fechaVencimiento = response.data;

                    var datePiper = new DatePipe('en-US');
                    var date = new Date();

                    date.setTime(this.datos.fechaVencimiento.timestamp * 1000);

                    this.datos.fechaVencimiento = datePiper.transform(
                        date, 'yyyy-MM-dd'
                    );
                },
                error => {
                    this.errorMessage = <any>error;

                    if (this.errorMessage != null) {
                        console.log(this.errorMessage);
                        alert("Error en la petición");
                    }
                }
            );

            this._ImoInsumoService.searchFirstInsumoByModulo({ 'idModulo': 6 }, token).subscribe(
                response => {
                    if (response.code == 200) {
                        this.datos.numeroTarjetaOperacion = response.data.numero;
                    } else {
                        swal({
                            title: response.title,
                            text: response.message,
                            type: response.status,
                            confirmButtonText: 'Aceptar'
                        })
                    }
                    error => {
                        this.errorMessage = <any>error;

                        if (this.errorMessage != null) {
                            console.log(this.errorMessage);
                            alert("Error en la petición");
                        }
                    }
                });

            this._ImoInsumoService.searchFirstNumeroTarjetaControl({ 'idModulo': 6 }, token).subscribe(
                response => {
                    if (response.code == 200) {
                        this.datos.numeroTarjetaControl = response.data.numero;
                    } else {
                        swal({
                            title: response.title,
                            text: response.message,
                            type: response.status,
                            confirmButtonText: 'Aceptar'
                        })
                    }
                    error => {
                        this.errorMessage = <any>error;

                        if (this.errorMessage != null) {
                            console.log(this.errorMessage);
                            alert("Error en la petición");
                        }
                    }
                });
        }
    }

    ngAfterViewInit() {
        swal.close();
    }

    onEnviar() {
        /* var datePiper = new DatePipe(this.tarjetaOperacion.fechaVencimiento.timestamp);
        this.tarjetaOperacion.fechaVencimiento = datePiper.transform(this.tarjetaOperacion.fechaVencimiento.timestamp, 'yyyy-MM-dd'); */

        this.datos.campos = ['expedicionTarjetaOperacion'];
        this.datos.idTramiteFactura = this.tramiteFactura.id;
        this.datos.idVehiculo = this.vehiculo.id;

        let resumen = "No. factura: " + this.tramiteFactura.factura.numero +
            ', número Tarjeta Operación: ' + this.datos.numeroTarjetaOperacion;

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
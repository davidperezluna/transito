import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { TramiteSolicitud } from '../../tramiteSolicitud.modelo';
import { TramiteSolicitudService } from '../../../../services/tramiteSolicitud.service';
import { TramiteFacturaService } from '../../../../services/tramiteFactura.service';
import { LoginService } from '../../../../services/login.service';
import { TipoIdentificacionService } from "../../../../services/tipoIdentificacion.service";
import { MsvRegistroIpatService } from "../../../../services/msvRegistroIpat.service";
import { DatePipe, CurrencyPipe } from '@angular/common';
import { PaisService } from "../../../../services/pais.service";

import swal from 'sweetalert2';

@Component({
    selector: 'appRna-importacion-temporal',
    templateUrl: './newRna.importacionTemporal.component.html',
    providers: [DatePipe]
})
export class NewRnaImportacionTemporalComponent implements OnInit {
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
    
    public vhl = false;
    public date: any;
    public paises: any;
    public paisSelected: any;

    public numeroRunt: any;
    public numeroCoutas: any;

    public tramiteRealizado: any;
    public datos = {
        'idFactura': null,
        'idVehiculo': null,
        'tramiteFormulario': null,
        'fechaSolicitud': null,
        'numeroIdentificacion': null,
        'nombreSolicitante': null,
        'apellidoSolicitante': null,
        'placa': null,
        'marca': null,
        'linea': null,
        'color': null,
        'modelo': null,
        'pais': null,
        'serie': null,
        'motor': null,
        'chasis': null,
        'vin': null,
    };

    constructor(
        private _TipoIdentificacionService: TipoIdentificacionService,
        private _TramiteSolicitudService: TramiteSolicitudService,
        private _loginService: LoginService,
        private _TramiteFacturaService: TramiteFacturaService,
        private _MsvRegistroIpatService: MsvRegistroIpatService,
        private _PaisService: PaisService,

    ) { }

    ngOnInit() {
        this.date = new Date;
        var datePiper = new DatePipe(this.date);
        this.datos.fechaSolicitud = datePiper.transform(this.date, 'yyyy-MM-dd');
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
                    console.log(response.data.datos);
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
        this._PaisService.select().subscribe(
            response => {
                this.paises = response;
            },
            error => {
                this.errorMessage = <any>error;

                if (this.errorMessage != null) {
                    console.log(this.errorMessage);
                    alert("Error en la petición");
                }
            }
        );
    }

    enviarTramite() {
        let token = this._loginService.getToken();
        this.datos.pais = this.paisSelected;
        this.datos.idFactura = this.factura.id;
        this.datos.tramiteFormulario = 'rna-importacion-temporal';
        this.datos.idVehiculo = this.vehiculo.id;
        let resumen = {
            'numero runt': this.numeroRunt,
            'numero cuotas': this.numeroCoutas,
        };
        this.readyTramite.emit({ 'foraneas': this.datos, 'resumen': resumen });
    }

    onCancelar() {
        this.cancelarTramite.emit(true);
    }
    onBuscarCiudadano() {
        let token = this._loginService.getToken();
        this._MsvRegistroIpatService.getBuscarConductor({ 'identificacion': this.datos.numeroIdentificacion }, token).subscribe(

            response => {

                if (response.status == 'success') {
                    console.log(response);
                    this.tipoIdentificacionSelected = [response.data[0].tipoIdentificacion.id];
                    this.datos.nombreSolicitante = response.data[0].primerNombre + " " + response.data[0].segundoNombre;
                    this.datos.apellidoSolicitante = response.data[0].primerApellido + " " + response.data[0].segundoApellido;
                    //swal.close();
                } else {
                    swal({
                        title: 'Alerta!',
                        text: response.message,
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

    onBuscarVehiculo() {
        let token = this._loginService.getToken();
        this._MsvRegistroIpatService.getBuscarVehiculo({ 'placa': this.datos.placa }, token).subscribe(
            response => {
                if (response.status == 'success') {
                    console.log(response);
                    this.vhl = true;
                    this.datos.serie = response.data.serie;
                    this.datos.motor = response.data.motor;
                    this.datos.motor = response.data.motor;
                    this.datos.chasis = response.data.chasis;
                    this.datos.chasis = response.data.chasis;
                    this.datos.vin = response.data.vin;
                    this.datos.vin = response.data.vin;
                    this.datos.linea = response.data.linea.nombre;
                    this.datos.modelo = response.data.modelo;
                    this.datos.color = response.data.color.nombre;
                    this.datos.marca = response.data.linea.marca.nombre;
                    //swal.close();
                } else {
                    swal({
                        title: 'Alerta!',
                        text: response.message,
                        type: 'error',
                        confirmButtonText: 'Aceptar'
                    }).then((result) => {
                        if (result.value) {
                            this.vhl = false;
                            this.datos.serie = '';
                            this.datos.motor = '';
                            this.datos.motor = '';
                            this.datos.chasis = '';
                            this.datos.chasis = '';
                            this.datos.vin = '';
                            this.datos.vin = '';
                            this.datos.linea = '';
                            this.datos.modelo = '';
                            this.datos.color = '';
                            this.datos.marca = '';
                        }
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
}
import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { FroTrteSolicitudRna } from '../../froTrteSolicitudRna.modelo';
import { TramiteSolicitudService } from '../../../../services/tramiteSolicitud.service';
import { TramiteFacturaService } from '../../../../services/tramiteFactura.service';
import { LoginService } from '../../../../services/login.service';
import { UserCfgTipoIdentificacionService } from "../../../../services/userCfgTipoIdentificacion.service";
import { MsvRegistroIpatService } from "../../../../services/msvRegistroIpat.service";
import { DatePipe, CurrencyPipe } from '@angular/common';
import { CfgPaisService } from "../../../../services/cfgPais.service";

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
    @Input() tramiteFactura: any = null;
    public errorMessage;
    public tipoId: boolean = true;
    public tramitesFactura: any = null;
    public tramiteFacturaSelected: any;
    public tiposIdentificacion: any;
    public tipoIdentificacionSelected;
    
    public vhl = false;
    public cdno = false;

    public resumen: any;
    public ciudadano: any;
    public propietario: any;
    public vehiculoImportacion: any;
    public vehiculoEncontrado: any;


    public date: any;
    public paises: any;
    public paisSelected: any;

    public numeroRunt: any;
    public numeroCuotas: any;

    public tramiteRealizado: any;
    /* public datos = {
        'idTramiteFactura': null,
        'idVehiculo': null,
        'tramiteFormulario': null,
        'fechaSolicitud': null,
        'numeroIdentificacion': null,
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
        'numeroAceptacion': null,
    }; */
    public datos = {
        'idTramiteFactura': null,
        'idVehiculo': null,
        'tramiteFormulario': null,
        'fechaSolicitud': null,
        'numeroAceptacion': null,
        'pais': null,
        'numeroIdentificacion': null,
    };

    public datos2 = {
        'cPropietario': [],
        'vehiculos': [],
    };

    constructor(
        private _TipoIdentificacionService: UserCfgTipoIdentificacionService,
        private _TramiteSolicitudService: TramiteSolicitudService,
        private _loginService: LoginService,
        private _TramiteFacturaService: TramiteFacturaService,
        private _MsvRegistroIpatService: MsvRegistroIpatService,
        private _CfgPaisService: CfgPaisService,

    ) { }

    ngOnInit() {
        this.date = new Date;
        var datePiper = new DatePipe(this.date);
        this.datos.fechaSolicitud = datePiper.transform(this.date, 'yyyy-MM-dd');
        this._TramiteFacturaService.getTramitesByFacturaSelect(this.tramiteFactura.id).subscribe(
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
                    this.datos = response.data.datos;
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
        this._CfgPaisService.select().subscribe(
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

    onEnviar() {
        let token = this._loginService.getToken();
        this.datos.pais = this.paisSelected;
        this.datos.idTramiteFactura = this.tramiteFactura.id;
        this.datos.tramiteFormulario = 'rna-importacion-temporal';
        this.datos.idVehiculo = this.vehiculo.id;
        let resumen = {
            'numero runt': this.numeroRunt,
            'numero cuotas': this.numeroCuotas,
            'fecha solicitud': this.datos.fechaSolicitud,
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
                    this.cdno = true;
                    this.ciudadano = response.data[0];
                    this.tipoIdentificacionSelected = [response.data[0].tipoIdentificacion.id];
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

    /* onBuscarVehiculo() {
        let token = this._loginService.getToken();
        this._MsvRegistroIpatService.getBuscarVehiculo({ 'placa': this.datos.placa }, token).subscribe(
            response => {
                if (response.status == 'success') {
                    this.vhl = true;
                    this.vehiculoImportacion = response.data;
                    console.log(this.vehiculoImportacion);
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
 */
    btnNewPropietario() {
        this.datos2.cPropietario.push(
            {
                'nombre': this.ciudadano.primerNombre,
                'apellido': this.ciudadano.primerApellido,
                'identificacion': this.datos.numeroIdentificacion,
            }
        );
        this.propietario = true;
        this.cdno = false;
    }

    deleteCiudadanoPropietario(ciudadanoPropietario: any): void {
        this.datos2.cPropietario = this.datos2.cPropietario.filter(h => h !== ciudadanoPropietario);
        if (this.datos2.cPropietario.length === 0) {
            this.propietario = false;
            this.cdno = false;
        }
    }

    /* btnNewVehiculo() {
        this.datos2.vehiculos.push(
            {
                'placa': this.datos.placa,
                'marca': this.vehiculoImportacion.linea.marca.nombre,
                'modelo': this.vehiculoImportacion.modelo,
                'chasis': this.vehiculoImportacion.chasis,
            }
        );
        this.vehiculoEncontrado = true;
        this.vhl = false;
    }

    deleteVehiculo(vehiculo: any): void {
        this.datos2.vehiculos = this.datos2.vehiculos.filter(h => h !== vehiculo);
        if (this.datos2.vehiculos.length === 0) {
            this.vehiculoEncontrado = false;
            this.vhl = false;
        }
    } */
}
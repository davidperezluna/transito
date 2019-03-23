import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { DatePipe, CurrencyPipe } from '@angular/common';
import { CfgPaisService } from "../../../../services/cfgPais.service";
import { FroTrteSolicitudService } from '../../../../services/froTrteSolicitud.service';
import { FroFacTramiteService } from '../../../../services/froFacTramite.service';
import { VhloPropietarioService } from '../../../../services/vhloPropietario.service';
import { UserCiudadanoService } from '../../../../services/userCiudadano.service'
import { UserCfgTipoIdentificacionService } from "../../../../services/userCfgTipoIdentificacion.service";
import { PnalFuncionarioService } from '../../../../services/pnalFuncionario.service';
import { LoginService } from '../../../../services/login.service';

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
    
    public autorizado: any = true;
    public tramiteSolicitud: any;
    public tramitesFactura: any = null;

    public identificacion: any;
    public tiposIdentificacion: any;
    public tipoIdentificacionSelected;
    

    public ciudadano: any;
    public empresa: any;
    public propietario: any;
    public vehiculoImportacion: any;
    public vehiculoEncontrado: any;


    public date: any;
    public paises: any;
    public paisSelected: any;

    public numeroRunt: any;
    public numeroCuotas: any;

    public datos = {
        'fechaSolicitud': null,
        'numeroRunt': null,
        'numeroCuotas': null,
        'pais': null,
        'licenciaConduccion': null,
        'idFuncionario': null,
        'idPropietario': null,
        'idVehiculo': null,
        'idTramiteFactura': null,
    };

    constructor(
        private _TramiteSolicitudService: FroTrteSolicitudService,
        private _TramiteFacturaService: FroFacTramiteService,
        private _CfgPaisService: CfgPaisService,
        private _PropietarioService: VhloPropietarioService,
        private _CiudadanoService: UserCiudadanoService,
        private _TipoIdentificacionService: UserCfgTipoIdentificacionService,
        private _FuncionarioService: PnalFuncionarioService,
        private _LoginService: LoginService,

    ) { }

    ngOnInit() {
        if (this.vehiculo.tipoMatricula == 'IMPORTACION') {
            this.date = new Date;
            var datePiper = new DatePipe(this.date);
            this.datos.fechaSolicitud = datePiper.transform(this.date, 'yyyy-MM-dd');

            let token = this._LoginService.getToken();

            let identity = this._LoginService.getIdentity();

            this._FuncionarioService.searchLogin({ 'identificacion': identity.identificacion }, token).subscribe(
                response => {
                    if (response.status == 'success') {
                        this.datos.idFuncionario = response.data.id;
                        this.autorizado = true;

                        this._TramiteFacturaService.show({ 'id': this.tramiteFactura.id }, token).subscribe(
                            response => {
                                if (response.code == 200) {
                                    this.tramiteFactura = response.data;

                                    swal.close();
                                } else {
                                    this.tramiteFactura = null;

                                    swal({
                                        title: 'Error!',
                                        text: response.message,
                                        type: 'error',
                                        confirmButtonText: 'Aceptar'
                                    });
                                }
                                error => {
                                    this.errorMessage = <any>error;
                                    if (this.errorMessage != null) {
                                        console.log(this.errorMessage);
                                        alert("Error en la petición");
                                    }
                                }
                            }
                        );

                        if (this.tramiteFactura.realizado) {
                            this._TramiteSolicitudService.showByTamiteFactura({ 'idTramiteFactura': this.tramiteFactura.id }, token).subscribe(
                                response => {
                                    if (response.code == 200) {
                                        this.tramiteSolicitud = response.data;
                                    } else {
                                        this.tramiteSolicitud = null;

                                        swal({
                                            title: 'Error!',
                                            text: response.message,
                                            type: 'error',
                                            confirmButtonText: 'Aceptar'
                                        });
                                    }
                                    error => {
                                        this.errorMessage = <any>error;
                                        if (this.errorMessage != null) {
                                            console.log(this.errorMessage);
                                            alert("Error en la petición");
                                        }
                                    }
                                }
                            );
                        } else {
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
                    } else {
                        this.autorizado = false;

                        swal({
                            title: 'Error!',
                            text: 'Usted no tiene permisos para realizar tramites',
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
        }else{
            this.autorizado = false;

            swal({
                title: 'Error!',
                text: 'El vehiculo no se registro para radicado de cuenta.',
                type: 'error',
                confirmButtonText: 'Aceptar'
            });
        }
    }

    onSearchPropietario() {
        swal({
            title: 'Buscando propietario!',
            text: 'Solo tardara unos segundos por favor espere.',
            onOpen: () => {
                swal.showLoading()
            }
        });

        let token = this._LoginService.getToken();

        let datos = {
            'identificacion': this.identificacion,
            'idTipoIdentificacion': this.tipoIdentificacionSelected,
        }

        this._CiudadanoService.searchByIdentificacion(datos, token).subscribe(
            response => {
                if (response.code == 200) {
                    if (response.data.ciudadano) {
                        this.ciudadano = response.data.ciudadano;
                        this.empresa = null;

                        this._PropietarioService.searchByCiudadanoOrEmpresaAndVehiculo({ 'id': this.ciudadano.id, 'tipo': 'CIUDADANO', 'idVehiculo': this.vehiculo.id }, token).subscribe(
                            response => {
                                if (response.code == 200) {
                                    this.propietario = response.data;
                                    this.datos.idPropietario = this.propietario.id;
                                } else {
                                    this.propietario = null;
                                    this.datos.idPropietario = null;

                                    swal({
                                        title: 'Error!',
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

                        swal.close();
                    } else if (response.data.empresa) {
                        this.empresa = response.data.empresa;
                        this.ciudadano = null;

                        this._PropietarioService.searchByCiudadanoOrEmpresaAndVehiculo({ 'id': this.empresa.id, 'tipo': 'EMPRESA', 'idVehiculo': this.vehiculo.id }, token).subscribe(
                            response => {
                                if (response.code == 200) {
                                    this.propietario = response.data;
                                    this.datos.idPropietario = this.propietario.id;
                                } else {
                                    this.propietario = null;
                                    this.datos.idPropietario = null;

                                    swal({
                                        title: 'Error!',
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

                        swal.close();
                    }else{
                        this.propietario = null;
                        this.datos.idFuncionario = null;

                        swal({
                            title: 'Error!',
                            text: response.message,
                            type: 'error',
                            confirmButtonText: 'Aceptar'
                        });
                    }
                } else {
                    this.ciudadano = null;
                    this.empresa = null;

                    swal({
                        title: 'Error!',
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

    onEnviar() {
        let token = this._LoginService.getToken();
        this.datos.pais = this.paisSelected;
        this.datos.idTramiteFactura = this.tramiteFactura.id;
        this.datos.idVehiculo = this.vehiculo.id;

        let resumen = "<b>No. factura: " + this.tramiteFactura.factura.numero +
            'numero runt' + this.numeroRunt +
            'numero cuotas' + this.numeroCuotas +
            'fecha solicitud' + this.datos.fechaSolicitud;

        this.readyTramite.emit({ 'foraneas': this.datos, 'resumen': resumen });
    }
}
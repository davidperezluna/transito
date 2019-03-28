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
    
    public autorizado: any = false;
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
        'propietarios': null,
        'fechaSolicitud': null,
        'numeroRunt': null,
        'numeroCuotas': null,
        'licenciaConduccion': null,
        'idFuncionario': null,
        'idPais': null,
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
                text: 'El vehiculo no se registro para importación temporal.',
                type: 'error',
                confirmButtonText: 'Aceptar'
            });
        }
    }

    onEnviar() {
        let token = this._LoginService.getToken();
        
        this.datos.idVehiculo = this.vehiculo.id;
        this.datos.idTramiteFactura = this.tramiteFactura.id;

        this._TramiteSolicitudService.validations(this.datos, token).subscribe(
            response => {
              if (response.code == 200) {
                let resumen = "No. factura: " + this.tramiteFactura.factura.numero +
                    'No. solicitud RUNT' + this.numeroRunt +
                    'No. cuotas' + this.numeroCuotas +
                    'Fecha solicitud' + this.datos.fechaSolicitud;

                this.readyTramite.emit({ 'foraneas': this.datos, 'resumen': resumen });
              }else{
                swal({
                  title: 'Error!',
                  text: response.message,
                  type: 'error',
                  confirmButtonText: 'Aceptar'
                });
              }
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
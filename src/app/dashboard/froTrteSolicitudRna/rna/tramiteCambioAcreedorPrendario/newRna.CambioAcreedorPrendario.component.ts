import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FroTrteSolicitudService } from '../../../../services/froTrteSolicitud.service';
import { FroFacTramiteService } from '../../../../services/froFacTramite.service';
import { VhloCfgPlaca } from '../../../vhloCfgPlaca/vhloCfgPlaca.modelo';
import { VhloAcreedorService } from '../../../../services/vhloAcreedor.service';
import { VhloPropietarioService } from '../../../../services/vhloPropietario.service';
import { LoginService } from '../../../../services/login.service';
import { CfgTipoAlertaService } from '../../../../services/cfgTipoAlerta.service';
import { UserCiudadanoService } from '../../../../services/userCiudadano.service';
import { UserEmpresaService } from "../../../../services/userEmpresa.service";
import { UserCfgTipoIdentificacionService } from '../../../../services/userCfgTipoIdentificacion.service';
import { PnalFuncionarioService } from '../../../../services/pnalFuncionario.service';
import { Router } from "@angular/router";


import swal from 'sweetalert2';

@Component({
    selector: 'appRna-cambio-acreedor-prendario',
    templateUrl: './newRna.CambioAcreedorPrendario.html'
})
export class NewRnaTramiteCambioAcreedorPrendarioComponent implements OnInit {
    @Output() readyTramite = new EventEmitter<any>();
    @Output() cancelarTramite = new EventEmitter<any>();
    @Input() vehiculo: any = null;
    @Input() tramiteFactura: any = null;
    @Input() idPropietario: any = null;
    public errorMessage; 
    
    public autorizado: any = false;
    public placa: VhloCfgPlaca = null;;
    public cfgTiposAlerta: any;
    public tramiteSolicitud: any = null;
    public ciudadano: any = null;
    public empresa: any = null;
    public acreedoresActuales: any = null;

    public identificacionOld: any;
    public identificacionNew: any;
    public tipoIdentificacionSelectedOld = null;
    public tipoIdentificacionSelectedNew = null;

    public table: any;

    public datos = {
        'tipo': 'ACREEDOR',
        'idFuncionario': null,
        'idAcreedor': null,
        'idCiudadano': null,
        'idEmpresa': null,
        'idVehiculo': null,
        'idTramiteFactura': null,
    };

    public tiposIdentificacion: any;
    public ciudadanoAcreedorNew:any;
    public empresaAcreedorNew:any;
    public identificacionNuevoAcreedor:any;

    constructor(
        private _TramiteSolicitudService: FroTrteSolicitudService,
        private _TramiteFacturaService: FroFacTramiteService,
        private _CfgTipoAlertaService: CfgTipoAlertaService,
        private _AcreedorService: VhloAcreedorService,
        private _PropietarioService: VhloPropietarioService,
        private _TipoIdentificacionService: UserCfgTipoIdentificacionService,
        private _CiudadanoService: UserCiudadanoService,
        private _EmpresaService: UserEmpresaService,
        private _FuncionarioService: PnalFuncionarioService,
        private _LoginService: LoginService,
        private router: Router,
    ) { }
 
    ngOnInit() {
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
                        swal({
                            title: 'Cargando prendarios actuales!',
                            text: 'Solo tardara unos segundos por favor espere.',
                            onOpen: () => {
                                swal.showLoading()
                            }
                        });

                        this._AcreedorService.searchByVehiculo({ 'idVehiculo': this.vehiculo.id }, token).subscribe(
                            response => {
                                if (response.code == 200) {
                                    this.acreedoresActuales = response.data;

                                    swal.close();
                                }else{
                                    this.acreedoresActuales = null;

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

                        this._CfgTipoAlertaService.getAlertaSelect().subscribe(
                            response => {
                                this.cfgTiposAlerta = response;
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
    }

    onSearchAcreedorNew() {
        swal({
            title: 'Buscando nuevo prendario!',
            text: 'Solo tardara unos segundos por favor espere.',
            onOpen: () => {
                swal.showLoading()
            }
        });

        if (this.identificacionNew) {
            let token = this._LoginService.getToken();
    
            let datos = {
                'identificacion': this.identificacionNew,
                'idTipoIdentificacion': this.tipoIdentificacionSelectedNew,
            }
    
            this._CiudadanoService.searchByIdentificacion(datos, token).subscribe(
                response => {
                    if (response.code == 200) {
                        if (response.data.ciudadano) {
                            this.ciudadano = response.data.ciudadano;
                            this.datos.idCiudadano = this.ciudadano.id;
                            this.empresa = null;
                            this.datos.idEmpresa = null;
                        } else if (response.data.empresa) {
                            this.empresa = response.data.empresa;
                            this.datos.idEmpresa = this.empresa.id;
                            this.ciudadano = null;
                            this.datos.idCiudadano = null;
                        }
    
                        swal.close();
                    } else {
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
        }else{
            swal({
                title: 'Alerta!',
                text: 'La identificación no puede estar vacia.',
                type: 'warning',
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
                    this._AcreedorService.update(this.datos, token).subscribe(
                        response => {
                            if (response.code == 200) {
                                let resumen = "<b>No. factura: </b>" + this.tramiteFactura.factura.numero;
            
                                this.readyTramite.emit({ 'foraneas': this.datos, 'resumen': resumen });
                            }else{
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
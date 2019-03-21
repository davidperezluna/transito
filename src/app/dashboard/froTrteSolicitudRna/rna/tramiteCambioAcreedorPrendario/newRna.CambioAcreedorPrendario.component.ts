import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FroTrteSolicitudService } from '../../../../services/froTrteSolicitud.service';
import { FroFacTramiteService } from '../../../../services/froFacTramite.service';
import { VhloCfgPlaca } from '../../../vhloCfgPlaca/vhloCfgPlaca.modelo';
import { LoginService } from '../../../../services/login.service';
import { CfgTipoAlertaService } from '../../../../services/cfgTipoAlerta.service';
import { VhloAcreedorService } from '../../../../services/vhloAcreedor.service';
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
    public errorMessage; public autorizado: any = true;

    public placa: VhloCfgPlaca = null;;
    public cfgTiposAlerta: any;
    public tramiteSolicitud: any = null;
    public ciudadano: any = null;
    public empresa: any = null;
    public acreedor: any = null;

    public identificacionOld: any;
    public nitOld: any;
    public identificacionNew: any;
    public nitNew: any;
    public tipoIdentificacionSelectedOld = null;
    public tipoIdentificacionSelectedNew = null;

    public cfgTipoAlertaSelected: any;
    public gradoSelected: any;
    public acreedorSelected: any;

    public ciudadanoSelected: any;

    public table: any;

    public datos = {
        'acreedoresOld': [],
        'acreedoresNew': [],
        'idEmpresaNew': null,
        'idFuncionario': null,
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
        private _VehiculoAcreedorService: VhloAcreedorService,
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

                        /*this._VehiculoAcreedorService.index().subscribe(
                            response => {
                                if (response.status == 'success') {
                                    this.vehiculosAcreedor = response.data;
                                } else {
                                    this.acreedorEncontrado = 3;
                                    this.acreedorNew = true;
                                }
                                error => {
                                    this.errorMessage = <any>error;

                                    if (this.errorMessage != null) {
                                        console.log(this.errorMessage);
                                        alert("Error en la petición");
                                    }
                                }
                            }
                        );*/
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

    onSearchAcreedorCiudadano() {
        swal({
            title: 'Buscando ciudadano!',
            text: 'Solo tardara unos segundos por favor espere.',
            onOpen: () => {
                swal.showLoading()
            }
        });

        let token = this._LoginService.getToken();

        let datos = {
            'identificacion': this.identificacionOld,
            'idTipoIdentificacion': this.tipoIdentificacionSelectedOld,
        }

        this._CiudadanoService.searchByIdentificacion(datos, token).subscribe(
            response => {
                if (response.code == 200) {
                    if (response.data.ciudadano) {
                        this.ciudadano = response.data.ciudadano;

                        this._VehiculoAcreedorService.searchByCiudadanoOrEmpresa({ 'idCiudadano': this.ciudadano.id, 'tipo': 'CIUDADANO' },token).subscribe(
                            response => {
                                if (response.code == 200) {
                                    this.acreedor = response.data;
                                   
                                    this.datos.acreedoresOld.push(
                                        {
                                            'idAcreedor': this.acreedor.id,
                                            'identificacion': this.acreedor.ciudadano.identificacion,
                                            'nombre': this.acreedor.ciudadano.primerNombre + " " + this.acreedor.ciudadano.segundoNombre,
                                            'tipoAlerta': this.acreedor.tipoAlerta.nombre,
                                            'gradoAlerta': this.acreedor.gradoAlerta,
                                            'tipo': 'CIUDADANO'
                                        }
                                    );
                                    
                                    swal.close();
                                } else {
                                    this.acreedor = null;

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
                    }
                } else {
                    this.ciudadano = null;

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

    onSearchAcreedorEmpresa() {
        swal({
            title: 'Buscando empresa!',
            text: 'Solo tardara unos segundos por favor espere.',
            onOpen: () => {
                swal.showLoading()
            }
        });

        let token = this._LoginService.getToken();

        let datos = {
            'identificacion': this.nitOld,
            'idTipoIdentificacion': this.tipoIdentificacionSelectedOld,
        }
        
        this._CiudadanoService.searchByIdentificacion(datos, token).subscribe(
            response => {
                if (response.code == 200) {
                    if (response.data.empresa) {
                        this.empresa = response.data.empresa;

                        this._VehiculoAcreedorService.searchByCiudadanoOrEmpresa({ 'idCiudadano': this.empresa.id, 'tipo': 'EMPRESA' }, token).subscribe(
                            response => {
                                if (response.status == 'success') {
                                    this.acreedor = response.data;

                                    this.datos.acreedoresOld.push(
                                        {
                                            'idAcreedor': this.acreedor.id,
                                            'identificacion': this.acreedor.empresa.nit,
                                            'nombre': this.acreedor.empresa.nombre,
                                            'tipoAlerta': this.acreedor.tipoAlerta.nombre,
                                            'gradoAlerta': this.acreedor.gradoAlerta,
                                            'tipo': 'EMPRESA'
                                        }
                                    );

                                    swal.close();
                                } else {
                                    this.acreedor = null;

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
                    }
                } else {
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

    onSearchCiudadano() {
        swal({
            title: 'Buscando ciudadano!',
            text: 'Solo tardara unos segundos por favor espere.',
            onOpen: () => {
                swal.showLoading()
            }
        });

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

                        this.datos.acreedoresNew.push(
                            {
                                'id': this.ciudadano.id,
                                'identificacion': this.ciudadano.identificacion,
                                'nombre': this.ciudadano.primerNombre + " " + this.ciudadano.segundoNombre,
                                'tipo': 'CIUDADANO'
                            }
                        );
                    }
                } else {
                    this.ciudadano = null;

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

    onSearchEmpresa() {
        swal({
            title: 'Buscando empresa!',
            text: 'Solo tardara unos segundos por favor espere.',
            onOpen: () => {
                swal.showLoading()
            }
        });

        let token = this._LoginService.getToken();

        let datos = {
            'identificacion': this.nitOld,
            'idTipoIdentificacion': this.tipoIdentificacionSelectedOld,
        }

        this._CiudadanoService.searchByIdentificacion(datos, token).subscribe(
            response => {
                if (response.code == 200) {
                    if (response.data.empresa) {
                        this.empresa = response.data.empresa;

                        this.datos.acreedoresNew.push(
                            {
                                'id': this.empresa.id,
                                'identificacion': this.empresa.nit,
                                'nombre': this.empresa.nombre,
                                'tipo': 'EMPRESA'
                            }
                        );
                    }
                } else {
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

    onDeleteAcreedorOld(acreedor:any): void{
        this.datos.acreedoresOld = this.datos.acreedoresOld.filter(h => h !== acreedor);
    }

    onDeleteAcreedorNew(acreedor: any): void {
        this.datos.acreedoresNew = this.datos.acreedoresNew.filter(h => h !== acreedor);
    }

    enviarTramite() {
        let token = this._LoginService.getToken();
        
        this.datos.idVehiculo = this.vehiculo.id;
        this.datos.idTramiteFactura = this.tramiteFactura.id;


        this._VehiculoAcreedorService.update(this.datos, token).subscribe(
            response => {
                response = response;
                if (response.code == 200) {
                    let resumen = "<b>No. factura: </b>" + this.tramiteFactura.factura.numero;

                    this.readyTramite.emit({ 'foraneas': this.datos, 'resumen': resumen });
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
    }
}
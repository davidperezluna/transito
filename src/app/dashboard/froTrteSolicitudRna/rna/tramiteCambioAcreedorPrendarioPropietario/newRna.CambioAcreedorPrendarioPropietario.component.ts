import { Component , OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FroTrteSolicitudService } from '../../../../services/froTrteSolicitud.service';
import { FroFacTramiteService } from '../../../../services/froFacTramite.service';
import { VhloAcreedorService } from '../../../../services/vhloAcreedor.service';
import { VhloPropietarioService } from '../../../../services/vhloPropietario.service';
import { UserCiudadanoService } from '../../../../services/userCiudadano.service';
import { UserCfgTipoIdentificacionService } from '../../../../services/userCfgTipoIdentificacion.service';
import { PnalFuncionarioService } from '../../../../services/pnalFuncionario.service';
import { LoginService } from '../../../../services/login.service';
import { Router } from "@angular/router";

import swal from 'sweetalert2';

@Component({
    selector: 'appRna-cambio-acreedor-prendario-propietario',
    templateUrl: './newRna.CambioAcreedorPrendarioPropietario.html'
})
export class NewRnaTramiteCambioAcreedorPrendarioPropietarioComponent implements OnInit {
    @Output() readyTramite = new EventEmitter<any>();
    @Output() cancelarTramite = new EventEmitter<any>();
    @Input() vehiculo: any = null;
    @Input() tramiteFactura: any = null;
    public errorMessage; 
    
    public autorizado: any = false;
    public tramiteSolicitud: any = null;
    public tipoPropiedadSelected:any;

    public ciudadano:any = null;
    public empresa:any = null;
    public acreedor:any = null;
    public propietarioOld:any = null;
    public propietarioNew:any = null;
   
    public tiposIdentificacion;
    public identificacionOld:any;
    public identificacionNew:any;
    public nit:any;

    public tipoIdentificacionSelectedOld: any;
    public tipoIdentificacionSelectedNew: any;

    public formCiudadano = false;
    
    public datos = {
        'tipo': 'PROPIETARIO',
        'idFuncionario': null,
        'idPropietarioOld': null,
        'idPropietarioNew': null,
        'idAcreedor': null,
        'idVehiculo': null,
        'idTramiteFactura': null,
    };

    constructor(
        private _TramiteSolicitudService: FroTrteSolicitudService,
        private _TramiteFacturaService: FroFacTramiteService,
        private _TipoIdentificacionService: UserCfgTipoIdentificacionService,
        private _AcreedorService: VhloAcreedorService,
        private _PropietarioService: VhloPropietarioService,
        private _CiudadanoService: UserCiudadanoService,
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

    onSearchPropietarioOld() {
        swal({
            title: 'Buscando propietario con prenda actual!',
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
                        this._PropietarioService.searchByCiudadanoOrEmpresaAndVehiculo({ 'id': response.data.ciudadano.id, 'tipo': 'CIUDADANO', 'idVehiculo': this.vehiculo.id }, token).subscribe(
                            response => {
                                if (response.code == 200) {
                                    this.propietarioOld = response.data;
                                    this.datos.idPropietarioOld = this.propietarioOld.id;

                                    this._AcreedorService.searchByPropietario({ 'id': this.propietarioOld.id }, token).subscribe(
                                        response => {
                                            if (response.code == 200) {
                                                this.acreedor = response.data;
                                                this.datos.idAcreedor = this.acreedor.id;
            
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

                                    swal.close();
                                } else {
                                    this.propietarioOld = null;
                                    this.datos.idPropietarioOld = null;

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
                    } else if (response.data.empresa) {
                        this._PropietarioService.searchByCiudadanoOrEmpresaAndVehiculo({ 'id': response.data.empresa.id, 'tipo': 'EMPRESA', 'idVehiculo': this.vehiculo.id }, token).subscribe(
                            response => {
                                if (response.code == 200) {
                                    this.propietarioOld = response.data;
                                    this.datos.idPropietarioOld = this.propietarioOld.id;

                                    this._AcreedorService.searchByPropietario({ 'id': this.propietarioOld.id }, token).subscribe(
                                        response => {
                                            if (response.code == 200) {
                                                this.acreedor = response.data;
                                                this.datos.idAcreedor = this.acreedor.id;
            
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
                                                    alert('Error en la petición');
                                                }
                                            }
                                        }
                                    );

                                    swal.close();
                                } else {
                                    this.propietarioOld = null;
                                    this.datos.idPropietarioOld = null;

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
                    }else {
                        this.acreedor = null;
                        this.datos.idAcreedor = null;
                    }
                } else {
                    this.propietarioOld = null;
                    this.datos.idPropietarioOld = null;

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
    
    onSearchPropietarioNew(){
        swal({
            title: 'Buscando propietario nuevo!',
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
                        this._PropietarioService.searchByCiudadanoOrEmpresaAndVehiculo({ 'id': response.data.ciudadano.id, 'tipo': 'CIUDADANO', 'idVehiculo': this.vehiculo.id }, token).subscribe(
                            response => {
                                if (response.code == 200) {
                                    this.propietarioNew = response.data;
                                    this.datos.idPropietarioNew = this.propietarioNew.id;

                                    swal.close();
                                } else {
                                    this.propietarioNew = null;
                                    this.datos.idPropietarioNew = null;

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
                    } else if (response.data.empresa){
                        this._PropietarioService.searchByCiudadanoOrEmpresaAndVehiculo({ 'id': response.data.empresa.id, 'tipo': 'EMPRESA', 'idVehiculo': this.vehiculo.id }, token).subscribe(
                            response => {
                                if (response.code == 200) {
                                    this.propietarioNew = response.data;
                                    this.datos.idPropietarioNew = this.propietarioNew.id;

                                    swal.close();
                                } else {
                                    this.propietarioNew = null;
                                    this.datos.idPropietarioNew = null;

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

                    swal.close();
                } else {
                    this.propietarioNew = null;
                    this.datos.idPropietarioNew = null;

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

        this.datos.idVehiculo = this.vehiculo.id;
        this.datos.idTramiteFactura = this.tramiteFactura.id;

        this._AcreedorService.update(this.datos, token).subscribe(
            response => {

                let resumen = "<b>No. factura: </b>" + this.tramiteFactura.factura.numero;

                this.readyTramite.emit({ 'foraneas': this.datos, 'resumen': resumen });
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
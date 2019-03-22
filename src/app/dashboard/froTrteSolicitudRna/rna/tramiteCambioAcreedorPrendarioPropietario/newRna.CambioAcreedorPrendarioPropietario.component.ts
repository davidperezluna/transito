import { Component , OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FroTrteSolicitudService } from '../../../../services/froTrteSolicitud.service';
import { FroFacTramiteService } from '../../../../services/froFacTramite.service';
import { VhloAcreedorService } from '../../../../services/vhloAcreedor.service';
import { VhloPropietarioService } from '../../../../services/vhloPropietario.service';
import { VhloVehiculoService } from '../../../../services/vhloVehiculo.service';
import { UserCiudadanoService } from '../../../../services/userCiudadano.service';
import { UserEmpresaService } from "../../../../services/userEmpresa.service";
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
    public errorMessage; public autorizado: any = true;

    public tramiteSolicitud: any = null;
    public tipoPropiedadSelected:any;

    public ciudadano:any;
    public empresa:any;
    public acreedor:any;
    public propietario:any;
   
    public tiposIdentificacion;
    public identificacionPrendario:any;
    public identificacionPropietario:any;
    public nit:any;

    public tipoIdentificacionSelectedPrendario: any;
    public tipoIdentificacionSelectedPropietario: any;

    public formCiudadano = false;
    
    public datos = {
        'idFuncionario': null,
        'idAcreedor': null,
        'idPropietario': null,
        'idVehiculo': null,
        'idTramiteFactura': null,
    };

    constructor(
        private _TramiteSolicitudService: FroTrteSolicitudService,
        private _TramiteFacturaService: FroFacTramiteService,
        private _VehiculoService: VhloVehiculoService,
        private _TipoIdentificacionService: UserCfgTipoIdentificacionService,
        private _CiudadanoService: UserCiudadanoService,
        private _AcreedorService: VhloAcreedorService,
        private _PropietarioService: VhloPropietarioService,
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

    onSearchPrendario() {
        swal({
            title: 'Buscando prendario!',
            text: 'Solo tardara unos segundos por favor espere.',
            onOpen: () => {
                swal.showLoading()
            }
        });

        let token = this._LoginService.getToken();

        let datos = {
            'identificacion': this.identificacionPrendario,
            'idTipoIdentificacion': this.tipoIdentificacionSelectedPrendario,
        }

        this._CiudadanoService.searchByIdentificacion(datos, token).subscribe(
            response => {
                if (response.code == 200) {
                    if (response.data.ciudadano) {
                        this.ciudadano = response.data.ciudadano;

                        this._AcreedorService.searchByCiudadanoOrEmpresaAndVehiculo({ 'id': this.ciudadano.id, 'tipo': 'CIUDADANO', 'idVehiculo': this.vehiculo.id }, token).subscribe(
                            response => {
                                if (response.code == 200) {
                                    this.acreedor = response.data;
                                    this.datos.idAcreedor = this.acreedor.id;
                                } else {
                                    this.acreedor = null;
                                    this.datos.idAcreedor = null;

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
                        this.empresa = response.data.empresa;

                        this._AcreedorService.searchByCiudadanoOrEmpresaAndVehiculo({ 'id': this.empresa.id, 'tipo': 'EMPRESA', 'idVehiculo': this.vehiculo.id }, token).subscribe(
                            response => {
                                if (response.code == 200) {
                                    this.acreedor = response.data;
                                    this.datos.idAcreedor = this.acreedor.id;
                                } else {
                                    this.acreedor = null;
                                    this.datos.idAcreedor = null;

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
    
    onSearchPropietario(){
        swal({
            title: 'Buscando propietario!',
            text: 'Solo tardara unos segundos por favor espere.',
            onOpen: () => {
                swal.showLoading()
            }
        });

        let token = this._LoginService.getToken();

        let datos = {
            'identificacion': this.identificacionPropietario,
            'idTipoIdentificacion': this.tipoIdentificacionSelectedPropietario,
        }

        this._CiudadanoService.searchByIdentificacion(datos, token).subscribe(
            response => {
                if (response.code == 200) {
                    if (response.data.ciudadano) {
                        this.ciudadano = response.data.ciudadano;

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
                    } else if (response.data.empresa){
                        this.empresa = response.data.empresa;

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
                    }

                    swal.close();
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

        this.datos.idVehiculo = this.vehiculo.id;

        this._AcreedorService.update(this.datos, token).subscribe(
            response => {
                this.datos.idTramiteFactura = this.tramiteFactura.id;

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

    /*
    delete(ciudadano:any): void {
        this.datos.propietariosCiudadanos =  this.datos.propietariosCiudadanos.filter(h => h !== ciudadano);
        if (this.datos.propietariosCiudadanos.length === 0) {
            this.listaPropietariosCiudadanos = false;
        }
        if(ciudadano.permisoTramite){
            this.propietario = true;
        }
    }
    deleteEmpresa(empresa:any): void {
        this.datos.propietariosEmpresas =  this.datos.propietariosEmpresas.filter(h => h !== empresa);
        if (this.datos.propietariosEmpresas.length === 0) {
            this.listaPropietariosEmpresas = false;
        }
        if(empresa.permisoTramite){
            this.propietario = true;
        }
    }

    ready(isCreado:any){
        if(isCreado) {
            console.log(isCreado);
          this.onKeyCiudadano();
        }else{
           this.ciudadanoNew = false; 
        }
    }
    
    agregarApoderadoCiudadano(ciudadano:any){
        this.apoderado = 'ciudadano';
        this.ciudadanoSelected = this.datos.propietariosCiudadanos.filter(h => h == ciudadano);
    }

    agregarApoderadoEmpresa(empresa:any){
        this.apoderado = 'empresa';
        this.empresaSelected = this.datos.propietariosEmpresas.filter(h => h == empresa);
    }
    onCancelarApoderado(){
        this.apoderado = 'false'
        this.tipoIdentificacionSelected = [this.tipoIdentificacionSelected];
    }*/


}
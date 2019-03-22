import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FroTrteSolicitudService } from '../../../../services/froTrteSolicitud.service';
import { FroFacTramiteService } from '../../../../services/froFacTramite.service';
import { VhloCfgTipoAlertaService } from '../../../../services/vhloCfgTipoAlerta.service';
import { VhloVehiculoService } from '../../../../services/vhloVehiculo.service';
import { VhloAcreedorService } from '../../../../services/vhloAcreedor.service';
import { UserCiudadanoService } from '../../../../services/userCiudadano.service';
import { UserEmpresaService } from "../../../../services/userEmpresa.service";
import { UserCfgTipoIdentificacionService } from '../../../../services/userCfgTipoIdentificacion.service';
import { CfgEntidadJudicialService } from '../../../../services/cfgEntidadJudicial.service';
import { PnalFuncionarioService } from '../../../../services/pnalFuncionario.service';
import { LoginService } from '../../../../services/login.service';
import { Router } from "@angular/router";
import { DatePipe  } from '@angular/common';

import swal from 'sweetalert2';

@Component({
    selector: 'appRna-inscripcion-alerta-prenda',
    templateUrl: './newRna.inscripcionAlertaPrenda.html'
})
export class NewRnaTramiteInscripcionAlertaPrendaComponent implements OnInit {
    @Output() readyTramite = new EventEmitter<any>();
    @Output() cancelarTramite = new EventEmitter<any>();
    @Input() vehiculo: any = null;
    @Input() tramiteFactura: any = null;
    public errorMessage; 
      
    public autorizado: any = true;
    public tramiteSolicitud: any = null;

    public entidadesJudiciales: any;
    public tiposAlerta: any;

    public ciudadano: any;
    public empresa: any;

    public identificacion: any;
    public nit: any;

    public tipoIdentificacionSelected = null;
    public tipoAlertaSelected:any = null;

    public table: any;
    public formIndex = true;
    public formCiudadano = false;

    public date:any;

    public gradosAlerta = [
        { 'value': 1, 'label': "UNO" },
        { 'value': 2, 'label': "DOS" },
        { 'value': 3, 'label': "TRES" },
        { 'value': 4, 'label': "CUATRO" },
        { 'value': 5, 'label': "CINCO" },
        { 'value': 6, 'label': "SEIS" },
        { 'value': 7, 'label': "SIETE" },
        { 'value': 8, 'label': "OCHO" },
        { 'value': 9, 'label': "NUEVE" }
    ];
       
    public datos = {
        'acreedores': [],
        'campos': null,
        'gradoAlerta': null,
        'fechaExpedicion':null,
        'idFuncionario': null,
        'idTipoAlerta': null,
        'idEntidadJudicial':null,
        'idVehiculo': null,
        'idTramiteFactura': null,
    };

    public datos2 = {
        'vehiculoId': null,
        'bancoId': null,
    }
    public tiposIdentificacion = [];

    constructor(
        private _TramiteSolicitudService: FroTrteSolicitudService,
        private _TramiteFacturaService: FroFacTramiteService,
        private _EntidadJudicialService: CfgEntidadJudicialService,
        private _TipoAlertaService: VhloCfgTipoAlertaService,
        private _VehiculoService: VhloVehiculoService,
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
                        this.date = new Date();
                        var datePiper = new DatePipe(this.date);
                        this.datos.fechaExpedicion = datePiper.transform(this.date, 'yyyy-MM-dd');

                        this._EntidadJudicialService.select().subscribe(
                            response => {
                                this.entidadesJudiciales = response;
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

                        this._TipoAlertaService.select().subscribe(
                            response => {
                                this.tiposAlerta = response;
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
            'identificacion': this.identificacion,
            'idTipoIdentificacion': 1,
        }
        
        this._CiudadanoService.searchByIdentificacion(datos, token).subscribe(
            response => {
                if (response.code == 200) {
                    if (response.data.ciudadano) {
                        this.ciudadano = response.data.ciudadano;

                        this._TipoAlertaService.show({ 'id': this.datos.idTipoAlerta }, token).subscribe(
                            response => {
                                if (response.code == 200) {
                                    this.tipoAlertaSelected = response.data;
                                }else{
                                    this.tipoAlertaSelected = null;
                                    
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
                                    alert("Error en la petición");
                                }
                            }
                        );

                        this.datos.acreedores.push(
                            {
                                'id': this.ciudadano.id,
                                'identificacion': this.ciudadano.identificacion,
                                'nombre': this.ciudadano.primerNombre + " " + this.ciudadano.segundoNombre,
                                'gradoAlerta': this.datos.gradoAlerta,
                                'idTipoAlerta': this.datos.idTipoAlerta,
                                'tipoAlerta': this.tipoAlertaSelected.nombre,
                                'tipo': 'CIUDADANO'
                            }
                        );
                    }

                    swal.close();
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
            });
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
            'identificacion': this.nit,
            'idTipoIdentificacion': 4,
        }

        this._CiudadanoService.searchByIdentificacion(datos, token).subscribe(
            response => {
                if (response.code == 200) {
                    if (response.data.empresa) {
                        this.empresa = response.data.empresa;

                        this._TipoAlertaService.show({ 'id': this.datos.idTipoAlerta }, token).subscribe(
                            response => {
                                if (response.code == 200) {
                                    this.tipoAlertaSelected = response.data;
                                } else {
                                    this.tipoAlertaSelected = null;

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
                                    alert("Error en la petición");
                                }
                            }
                        );

                        this.datos.acreedores.push(
                            {
                                'id': this.empresa.id,
                                'identificacion': this.empresa.nit,
                                'nombre': this.empresa.nombre,
                                'gradoAlerta': this.datos.gradoAlerta,
                                'idTipoAlerta': this.datos.idTipoAlerta,
                                'tipoAlerta': this.tipoAlertaSelected.nombre,
                                'tipo': 'EMPRESA'
                            }
                        );
                    }

                    swal.close();
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

    onDeleteAcreedor(acreedor:any): void{
        this.datos.acreedores = this.datos.acreedores.filter(h => h !== acreedor);
    }

    onEnviar() {
        this.datos.idVehiculo = this.vehiculo.id;
        let token = this._LoginService.getToken();

        this.datos.idTramiteFactura = this.tramiteFactura.id;

        this._VehiculoAcreedorService.register(this.datos, token).subscribe(
            response => {
                if (response.status == 'success') {
                    this.datos.campos = ['pignorado'];

                    this._VehiculoService.update(this.datos, token).subscribe(
                        response => {
                            if (response.status == 'success') {
                                let resumen = "<b>No. factura: </b>" + this.tramiteFactura.factura.numero;

                                this.readyTramite.emit({ 'foraneas': this.datos, 'resumen': resumen });
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
                                    alert("Error en la petición");
                                }
                            }
                        }
                    );
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
                        alert("Error en la petición");
                    }
                }
            }
        );
    }
}
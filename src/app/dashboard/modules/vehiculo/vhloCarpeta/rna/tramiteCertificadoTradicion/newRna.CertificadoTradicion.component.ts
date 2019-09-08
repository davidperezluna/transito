import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { FroTrteSolicitudService } from '../../../../../../services/froTrteSolicitud.service';
import { FroFacTramiteService } from '../../../../../../services/froFacTramite.service';
import { UserCiudadanoService } from '../../../../../../services/userCiudadano.service';
import { PnalFuncionarioService } from '../../../../../../services/pnalFuncionario.service';
import { LoginService } from '../../../../../../services/login.service';
import { environment } from 'environments/environment';

import swal from 'sweetalert2';

@Component({
    selector: 'appRna-certificado-tradicion',
    templateUrl: './newRna.certificadoTradicion.html'
})
export class NewRnaCertificadoTradicionComponent implements OnInit {
    @Output() readyTramite = new EventEmitter<any>();
    @Output() cancelarTramite = new EventEmitter<any>();
    @Input() vehiculo: any = null;
    @Input() tramiteFactura: any = null;
    public errorMessage; 
    
    public autorizado: any = false;
    public apiUrl = environment.apiUrl + 'financiero/frotrtesolicitud';
    public tramiteSolicitud: any = null;
    public identificacion: any;
 
    public ciudadano:any = null;
    public entregado:any = false;
   
    public datos = {
        'numeroRunt': null,
        'observacion': null,                  
        'campos': null,
        'idFuncionario': null,
        'idCiudadano': null,
        'idVehiculo': null,
        'idTramiteFactura': null,
    };

    constructor(
        private _TramiteFacturaService: FroFacTramiteService,
        private _TramiteSolicitudService: FroTrteSolicitudService,
        private _CiudadanoService: UserCiudadanoService,
        private _FuncionarioService: PnalFuncionarioService,
        private _LoginService: LoginService,
    ) { }

    ngOnInit() {
        let token = this._LoginService.getToken();

        let identity = this._LoginService.getIdentity();

        this._FuncionarioService.searchLogin({ 'identificacion': identity.identificacion }, token).subscribe(
            response => {
                if (response.code == 200) {
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
                        let token = this._LoginService.getToken();

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

                        swal({
                            title: 'Perfecto!',
                            text: response.message,
                            type: 'success',
                            confirmButtonText: 'Aceptar'
                        });
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

    onEnviar() {      
        let token = this._LoginService.getToken();
        
        this.datos.idTramiteFactura = this.tramiteFactura.id;
        this.datos.idVehiculo = this.vehiculo.id;
        this.datos.idCiudadano = this.ciudadano.id;

        this._TramiteSolicitudService.validations(this.datos, token).subscribe(
            response => {
              if (response.code == 200) {
                let resumen = "<b>No. factura: </b>" + this.tramiteFactura.factura.numero + 
                "<b>No. solicitud RUNT: </b>" + this.datos.numeroRunt +
                "<b>Ciudadano que recibe: </b>" + this.ciudadano.primerNombre + " " + this.ciudadano.primerApellido;

                this.entregado = true;

                this.readyTramite.emit({'foraneas': this.datos, 'resumen': resumen});
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
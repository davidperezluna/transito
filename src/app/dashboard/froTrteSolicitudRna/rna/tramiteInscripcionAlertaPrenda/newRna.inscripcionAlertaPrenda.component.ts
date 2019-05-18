import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FroTrteSolicitudService } from '../../../../services/froTrteSolicitud.service';
import { FroFacTramiteService } from '../../../../services/froFacTramite.service';
import { VhloCfgTipoAlertaService } from '../../../../services/vhloCfgTipoAlerta.service';
import { VhloAcreedorService } from '../../../../services/vhloAcreedor.service';
import { VhloPropietarioService } from '../../../../services/vhloPropietario.service';
import { UserCiudadanoService } from '../../../../services/userCiudadano.service';
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
    @Output() onReadyTramite = new EventEmitter<any>();
    
    @Input() idPropietario: any = null;
    @Input() vehiculo: any = null;
    @Input() tramiteFactura: any = null;
    @Input() funcionario: any = null;
    @Input() tramitesRealizados: any = null;
    public errorMessage; 
      
    public realizado: any = false;
    public tramiteSolicitud: any = null;
    
    public entidadesJudiciales: any;
    public tiposIdentificacion: any;
    public tiposAlerta: any;

    public ciudadano: any = null;
    public empresa: any = null;
    public propietario: any = null;

    public identificacionAcreedor: any;
    public identificacionPropietario: any;

    public tipoIdentificacionSelectedAcreedor = null;
    public tipoIdentificacionSelectedPropietario = null;
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
        'documentacion': true,
        'observacion': null,
        'campos': null,
        'gradoAlerta': null,
        'fechaExpedicion':null,
        'idFuncionario': null,
        'idTipoAlerta': null,
        'idCiudadano': null,
        'idEmpresa': null,
        'idPropietario': null,
        'idEntidadJudicial':null,
        'idVehiculo': null,
        'idTramiteFactura': null,
    };

    constructor(
        private _TramiteSolicitudService: FroTrteSolicitudService,
        private _TramiteFacturaService: FroFacTramiteService,
        private _EntidadJudicialService: CfgEntidadJudicialService,
        private _TipoAlertaService: VhloCfgTipoAlertaService,
        private _AcreedorService: VhloAcreedorService,
        private _PropietarioService: VhloPropietarioService,
        private _TipoIdentificacionService: UserCfgTipoIdentificacionService,
        private _CiudadanoService: UserCiudadanoService,
        private _FuncionarioService: PnalFuncionarioService,
        private _LoginService: LoginService,
        private router: Router,
    ) { }
 
    ngOnInit() {
        this.datos.idFuncionario  = this.funcionario.id;
        
        if ( this.tramitesRealizados.length > 0) {
            this.tramitesRealizados.forEach(tramiteRealizado => {
                tramiteRealizado = Object.keys(tramiteRealizado).map(function(key) {
                    return tramiteRealizado[key];
                });
                
                if (tramiteRealizado.includes(this.tramiteFactura.id, 2)) {
                    this.realizado = true;
                }
            });
        }

        if (this.realizado) {
            swal({
                title: 'Atención!',
                text: 'El trámite seleccionado ya fue realizado.',
                type: 'warning',
                confirmButtonText: 'Aceptar'
            });
        } else{
            let token = this._LoginService.getToken();
            
            this.date = new Date();
            var datePiper = new DatePipe(this.date);
            this.datos.fechaExpedicion = datePiper.transform(this.date, 'yyyy-MM-dd');

            this._PropietarioService.show({ 'id': this.idPropietario }, token ).subscribe(
                response => {
                    this.propietario = response.data;
                },
                error => {
                    this.errorMessage = <any>error;

                    if (this.errorMessage != null) {
                        console.log(this.errorMessage);
                        alert('Error en la petición');
                    }
                }
            );

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
    }    
    
    onSearchAcreedor() {
        swal({
            title: 'Buscando acreedor!',
            text: 'Solo tardara unos segundos por favor espere.',
            onOpen: () => {
                swal.showLoading()
            }
        });
        
        let token = this._LoginService.getToken();

        let datos = {
            'identificacion': this.identificacionAcreedor,
            'idTipoIdentificacion': this.tipoIdentificacionSelectedAcreedor,
        }
        
        this._CiudadanoService.searchByIdentificacion(datos, token).subscribe(
            response => {
                if (response.code == 200) {
                    if (response.data.ciudadano) {
                        this.ciudadano = response.data.ciudadano;
                        this.datos.idCiudadano = this.ciudadano.id;
                        this.empresa = null;

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
                    } else if (response.data.empresa) {
                        this.empresa = response.data.empresa;
                        this.datos.idEmpresa = this.empresa.id;
                        this.ciudadano = null;

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
                    }             swal.close();
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
        this.datos.idVehiculo = this.vehiculo.id;
        let token = this._LoginService.getToken();

        this.datos.campos = ['pignorado'];
        this.datos.idPropietario = this.propietario.id;
        this.datos.idTramiteFactura = this.tramiteFactura.id;

        this._TramiteSolicitudService.validations(this.datos, token).subscribe(
            response => {
              if (response.code == 200) {
                this._AcreedorService.register(this.datos, token).subscribe(
                    response => {
                        if (response.status == 'success') {
                            let resumen = "<b>No. factura: </b>" + this.tramiteFactura.factura.numero;
        
                            this.onReadyTramite.emit(
                                {
                                    'documentacion':this.datos.documentacion, 
                                    'observacion':this.datos.observacion, 
                                    'foraneas':this.datos, 
                                    'resumen':resumen,
                                    'idTramiteFactura': this.tramiteFactura.id,
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
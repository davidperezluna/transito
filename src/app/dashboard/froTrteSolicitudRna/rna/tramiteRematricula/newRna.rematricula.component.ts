import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { FroTrteSolicitudService } from '../../../../services/froTrteSolicitud.service';
import { FroFacTramiteService } from '../../../../services/froFacTramite.service';
import { VhloVehiculoService } from '../../../../services/vhloVehiculo.service';
import { CfgMunicipioService } from '../../../../services/cfgMunicipio.service';
import { UserCfgTipoIdentificacionService } from '../../../../services/userCfgTipoIdentificacion.service';
import { PnalFuncionarioService } from '../../../../services/pnalFuncionario.service';
import { LoginService } from '../../../../services/login.service';

import swal from 'sweetalert2';

@Component({
    selector: 'appRna-rematricula',
    templateUrl: './newRna.rematricula.html'
})
export class NewRnaRematriculaComponent implements OnInit {
    @Output() onReadyTramite = new EventEmitter<any>();
    
    @Input() tramiteFactura: any = null;
    @Input() funcionario: any = null;
    @Input() tramitesRealizados: any = null;
    @Input() vehiculo: any = null;
    public errorMessage; 
    
    public realizado: any = false;
    public tramiteSolicitud: any = null;
    public municipios: any;
    public tiposIdentificacion: any;
    public matriculaCancelada: any = null;

    public datos = {
        'documentacion': true,
        'observacion': null,
        'numeroActa': null,
        'fechaActa': null,
        'campos': null,
        'fechaEntrega': null,
        'numeroIdentificacionEntrega': null,
        'nombreEntrega': null,
        'estado': null,
        'idFuncionario': null,
        'idEntidad': null,
        'idMunicipioActa': null,
        'idMunicipioEntrega': null,
        'idTipoIdentificacionEntrega': null,
        'idVehiculo': null,
        'idTramiteFactura': null,
    };

    public entidades = [
        { value: 'FISCALIA', label: 'FISCALIA' },
        { value: 'SIJIN', label: 'SIJIN' },
        { value: 'DIJIN', label: 'DIJIN' },
    ];

    constructor(
        private _TramiteSolicitudService: FroTrteSolicitudService,
        private _TramiteFacturaService: FroFacTramiteService,
        private _VehiculoService: VhloVehiculoService,
        private _MunicipioService: CfgMunicipioService,
        private _TipoIdentificacionService: UserCfgTipoIdentificacionService,
        private _FuncionarioService: PnalFuncionarioService,
        private _LoginService: LoginService,
    ) { }

    ngOnInit() {
        let token = this._LoginService.getToken();

        let identity = this._LoginService.getIdentity();

        this._FuncionarioService.searchLogin({ 'identificacion': identity.identificacion }, token).subscribe(
            response => {
                if (response.status == 'success') {
                    this.datos.idFuncionario = response.data.id;
                    this.realizado = true;

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
                        this._MunicipioService.select().subscribe(
                            response => {
                                this.municipios = response;
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
                    }
                } else {
                    this.realizado = false;

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

    onEnviar() {
        let token = this._LoginService.getToken();

        this.datos.campos = ['rematricula'];
        this.datos.idTramiteFactura = this.tramiteFactura.id;
        this.datos.idVehiculo = this.vehiculo.id;

        this._TramiteSolicitudService.validations(this.datos, token).subscribe(
            response => {
              if (response.code == 200) {
                this._VehiculoService.update(this.datos, token).subscribe(
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
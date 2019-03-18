import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FroTrteSolicitudService } from '../../../../services/froTrteSolicitud.service';
import { FroFacTramiteService } from '../../../../services/froFacTramite.service';
import { UserCfgTipoIdentificacionService } from '../../../../services/userCfgTipoIdentificacion.service';
import { VhloCfgCombustibleService } from '../../../../services/vhloCfgCombustible.service';
import { VhloVehiculoService } from '../../../../services/vhloVehiculo.service';
import { LoginService } from '../../../../services/login.service';

import swal from 'sweetalert2';

@Component({
    selector: 'appRna-cambio-motor',
    templateUrl: './newRna.cambioMotor.html'
})
export class NewRnaCambioMotorComponent implements OnInit {
    @Output() readyTramite = new EventEmitter<any>();
    @Output() cancelarTramite = new EventEmitter<any>();
    @Input() vehiculo: any = null;
    @Input() tramitesFactura: any = null;
    @Input() tramiteFactura: any = null;
    public errorMessage;

    public tramiteSolicitud: any = null;
    public tiposIdentificacion: any;
    public tipoIdentificacionSelected: any;
    public tipoIngresoList: string[];
    public tipoIngresoSelected: any;
    public tipoIdentificacion: any;
    public numeroIdentificacion: any;
    public combustibles: any;
    public combustibleSelected: any;

    public datos = {
        'numeroMotor': null,
        'numeroAceptacion': null,
        'numeroFactura': null,
        'fecha': null,
        'tipoIdentificacion': null,
        'numeroIdentificacion': null,
        'numeroRunt': null,
        'campos': null,
        'idVehiculo': null,
        'idTipoIngreso': null,
        'idCombustible': null,
        'idTramiteFactura': null,
    };

    public tiposIngreso = [
        { value: 'NUEVO', label: 'NUEVO' },
        { value: 'USADO', label: 'USADO' },
    ];

    constructor(
        private _TramiteSolicitudService: FroTrteSolicitudService,
        private _TramiteFacturaService: FroFacTramiteService,
        private _CombustibleService: VhloCfgCombustibleService,
        private _VehiculoService: VhloVehiculoService,
        private _TipoIdentificacionService: UserCfgTipoIdentificacionService,
        private _LoginService: LoginService,
    ) { }

    ngOnInit() {
        let token = this._LoginService.getToken();

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
            this._CombustibleService.select().subscribe(
                response => {
                    this.combustibles = response;
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
    }

    onEnviar() {
        let token = this._LoginService.getToken();

        this.datos.campos = ['motor'];
        this.tipoIdentificacion = this.tipoIdentificacionSelected;
        this.datos.idTipoIngreso = this.tipoIngresoSelected;
        this.datos.idCombustible = this.combustibleSelected;
        this.datos.idVehiculo = this.vehiculo.id;
        this.datos.idTramiteFactura = this.tramiteFactura.id;

        this._VehiculoService.update(this.datos, token).subscribe(
            response => {
                if (response.status == 'success') {
                    let resumen = "<b>No. factura: </b>" + this.tramiteFactura.factura.numero +
                        '<br><b>Motor anterior: </b>' + this.vehiculo.motor.nombre +
                        '<br><b>Motor nuevo: </b>' + this.datos.numeroMotor;

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
    onCancelar(){
        this.cancelarTramite.emit(true);
    }

}
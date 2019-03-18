import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { FroTrteSolicitudService } from '../../../../services/froTrteSolicitud.service';
import { FroFacTramiteService } from '../../../../services/froFacTramite.service';
import { VhloCfgCombustibleService } from '../../../../services/vhloCfgCombustible.service';
import { VhloVehiculoService } from '../../../../services/vhloVehiculo.service';
import { LoginService } from '../../../../services/login.service';

import swal from 'sweetalert2';

@Component({
    selector: 'appRna-cambio-combustible',
    templateUrl: './newRna.cambioCombustible.html'
})
export class NewRnaCambioCombustibleComponent implements OnInit {
    @Output() readyTramite = new EventEmitter<any>();
    @Output() cancelarTramite = new EventEmitter<any>();
    @Input() vehiculo: any = null;
    @Input() tramitesFactura: any = null;
    @Input() tramiteFactura: any = null;
    public errorMessage;

    public tramiteSolicitud: any = null;
    public combustibles: any;
    public combustibleSelected: any;

    public datos = {
        'campos': null,
        'idVehiculo': null,
        'idCombustible': null,
        'idTramiteFactura': null,
    };

    constructor(
        private _CombustibleService: VhloCfgCombustibleService,
        private _VehiculoService: VhloVehiculoService,
        private _TramiteSolicitudService: FroTrteSolicitudService,
        private _TramiteFacturaService: FroFacTramiteService,
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
        }
    }
    
    onEnviar(){
        let token = this._LoginService.getToken();

        this._CombustibleService.show({ 'id': this.combustibleSelected }, token).subscribe(
            combustibleResponse => {
                this.datos.campos = ['combustible'];
                this.datos.idTramiteFactura = this.tramiteFactura.id;
                this.datos.idCombustible = this.combustibleSelected;
                this.datos.idVehiculo = this.vehiculo.id;

                this._VehiculoService.update(this.datos, token).subscribe(
                    response => {
                        if (response.status == 'success') {
                            let resumen = "<b>No. factura: </b>" + this.tramiteFactura.numero +
                                '<br><b>Combustible anterior: </b>' + this.vehiculo.combustible.nombre +
                                '<br><b>Combustible nuevo: </b>' + combustibleResponse.data.nombre;
                            
                            this.readyTramite.emit({ 'foraneas': this.datos, 'resumen': resumen });
                        }
                        error => {
                            this.errorMessage = <any>error;

                            if (this.errorMessage != null) {
                                console.log(this.errorMessage);
                                alert("Error en la petición");
                            }
                        }
                    });
                error => {
                    this.errorMessage = <any>error;

                    if (this.errorMessage != null) {
                        console.log(this.errorMessage);
                        alert("Error en la petición");
                    }
                }
            });
    }
    onCancelar(){
        this.cancelarTramite.emit(true);
    }

}
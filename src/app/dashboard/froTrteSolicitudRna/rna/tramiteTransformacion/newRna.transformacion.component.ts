import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { FroTrteSolicitudService } from '../../../../services/froTrteSolicitud.service';
import { FroFacTramiteService } from '../../../../services/froFacTramite.service';
import { VhloVehiculoService } from '../../../../services/vhloVehiculo.service';
import { VhloCfgCombustibleService } from '../../../../services/vhloCfgCombustible.service';
import { VhloCfgCarroceriaService } from '../../../../services/vhloCfgCarroceria.service';
import { LoginService } from '../../../../services/login.service';

import swal from 'sweetalert2';

@Component({
    selector: 'appRna-transformacion',
    templateUrl: './newRna.transformacion.html'
})
export class NewRnaTransformacionComponent implements OnInit {
    @Output() readyTramite = new EventEmitter<any>();
    @Output() cancelarTramite = new EventEmitter<any>();
    @Input() vehiculo: any = null;
    @Input() tramiteFactura: any = null;
    public errorMessage;

    public tramiteSolicitud: any = null;
    public carrocerias: any = null;
    public combustibles: any = null;
    public modelo: any = null;
    public descripcionModelo: any = null;

    public datos = {
        'tipoTransformacion': null,
        'modelo': null,
        'fichaTecnica': null,
        'descripcionModelo': null,
        'campos': null,
        'idVehiculo': null,
        'idCarroceria': null,
        'idCombustible': null,
        'idTramiteFactura': null,
    };

    public tiposTransformacion = [
        {'value': 1, 'label': 'Cambio de carroceria'},
        {'value': 2, 'label': 'Cambio combustible'},
        {'value': 3, 'label': 'Cambio conjunto'},
        {'value': 4, 'label': 'Repotenciación'},
        {'value': 5, 'label': 'Cambio de troques'},
    ];

    constructor(
        private _CombustibleService: VhloCfgCombustibleService,
        private _CarroceriaService: VhloCfgCarroceriaService,
        private _TramiteSolicitudService: FroTrteSolicitudService,
        private _TramiteFacturaService: FroFacTramiteService,
        private _VehiculoService: VhloVehiculoService,
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
            this._CarroceriaService.select().subscribe(
                response => {
                    this.carrocerias = response;
                },
                error => {
                    this.errorMessage = <any>error;

                    if (this.errorMessage != null) {
                        console.log(this.errorMessage);
                        alert('Error en la petición');
                    }
                }
            );

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

    onChangedTipoTransformacion() {
        this.datos.campos = null;
    }
    
    onEnviar(){
        let token = this._LoginService.getToken();

        this.datos.idTramiteFactura = this.tramiteFactura.id;
        this.datos.idVehiculo = this.vehiculo.id;
        
        if (this.datos.tipoTransformacion == 1) {
            this.datos.campos = ['carroceria'];
        }else{
            if (this.datos.tipoTransformacion == 2) {
                this.datos.campos = ['combustible'];
            }else{
                if (this.datos.tipoTransformacion == 3) {
                    this.datos.campos = ['conjunto'];
                }else{
                    if (this.datos.tipoTransformacion == 4) {
                        this.datos.campos = ['repotenciacion'];
                    }else{
                        if (this.datos.tipoTransformacion == 5) {
                            this.datos.campos = ['troques'];
                        }
                    }
                }
            }
        }     

        this._VehiculoService.update(this.datos, token).subscribe(
            response => {
                if (response.status == 'success') {
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
        error => {
            this.errorMessage = <any>error;

            if (this.errorMessage != null) {
                console.log(this.errorMessage);
                alert("Error en la petición");
            }
        }
    }

    onClose() {
        this.datos.tipoTransformacion = null;
    }
}
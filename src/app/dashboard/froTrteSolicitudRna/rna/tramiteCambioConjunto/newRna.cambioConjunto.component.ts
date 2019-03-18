import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FroTrteSolicitudService } from '../../../../services/froTrteSolicitud.service';
import { FroFacTramiteService } from '../../../../services/froFacTramite.service';
import { VhloCfgCombustibleService } from '../../../../services/vhloCfgCombustible.service';
import { VhloVehiculoService } from '../../../../services/vhloVehiculo.service';
import { LoginService } from '../../../../services/login.service';

import swal from 'sweetalert2';

@Component({
    selector: 'appRna-cambio-conjunto',
    templateUrl: './newRna.cambioConjunto.html'
})
export class NewRnaCambioConjuntoComponent implements OnInit {
    @Output() readyTramite = new EventEmitter<any>();
    @Output() cancelarTramite = new EventEmitter<any>();
    @Input() vehiculo: any = null;
    @Input() tramiteFactura: any = null;
    public errorMessage;

    public tramiteSolicitud: any = null;

    public datos = {
        'idTramiteFactura': null,
        'idVehiculo': null,
        'campos': null,
        'descripcion': null,
        'nuevoModelo': null,
    };

    public tiposPotenciacion = [
        {'value': 'Cambio de motor', 'label': 'Cambio de motor'},
        {'value': 'Reparacion de motor y cambio de conjunto', 'label': 'Reparación de motor y cambio de conjunto'},
        {'value': 'Reparacion de motor', 'label': 'Reparación de motor'},
    ];

    constructor(
        private _CombustibleService: VhloCfgCombustibleService,
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
        }
    }
    
    onEnviar(){
        
        let token = this._LoginService.getToken();
        
        this.datos.campos = ['conjunto'];
        this.datos.idTramiteFactura = this.tramiteFactura.id;
        this.datos.idVehiculo = this.vehiculo.id;

        this._VehiculoService.update(this.datos,token).subscribe(
        response => {
            response = response; 
            if(response.status == 'success'){
                let resumen = "<b>No. factura: </b>" + this.tramiteFactura.factura.numero +
                    '<br><b>Modelo anterior: </b>' + this.vehiculo.modelo;

                this.readyTramite.emit({'foraneas':this.datos, 'resumen': resumen}); 
            }
            error => {
                    this.errorMessage = <any>error;

                    if(this.errorMessage != null){
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
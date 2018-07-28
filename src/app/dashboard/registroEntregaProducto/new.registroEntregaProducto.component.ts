import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { Router } from "@angular/router";
import { VehiculoService } from '../../services/vehiculo.service';
import { LoginService } from '../../services/login.service';
import { TramiteSolicitudService } from '../../services/tramiteSolicitud.service'
import swal from 'sweetalert2';


@Component({
    selector: 'app-registroEntregaProducto',
    templateUrl: './new.registroEntregaProducto.html',
})
export class NewRegistroEntregaProductoComponent implements OnInit {
    public errorMessage = false;
    public error = false;
    public msj = '';
    public vehiculoSuccess = false;
    public vehiculo: any;
    public tramiteSolicitud: any;
    public idVehiculo;
    public datos = {
        'vehiculo': null,
        'tramiteFactura': null,
        'tipoConsulta': null,
        'numeroPlaca': null,
        'numeroVIN': null,
        'numeroSerie': null,
        'numeroMotor': null,
        'numeroChasis': null,
    };

    constructor(
        private router: Router,
        private _loginService: LoginService,
        private _VehiculoService: VehiculoService,
        private _TramiteSolicitudService: TramiteSolicitudService,
    ) { }

    ngOnInit() {
    }

    buscarVehiculo() {
        let token = this._loginService.getToken();

        this._VehiculoService.showVehiculoParametro(token, this.datos).subscribe(
            response => {
                if (response.status == 'error') {
                    if (response.code == 401) {
                        this.msj = response.msj;
                        swal({
                            type: 'error',
                            title: 'Oops...',
                            text: response.msj
                        })
                    } else if (response.code == 400) {
                        this.msj = response.msj;
                        swal({
                            type: 'error',
                            title: 'Oops...',
                            text: response.msj
                        })
                    }
                    this.error = true;
                    this.vehiculoSuccess = false;
                } else {
                    this.vehiculo = response.data;
                    this.vehiculoSuccess = true;
                    this.vehiculo.forEach(element => {
                        this.idVehiculo = element.id;
                    });
                    this._TramiteSolicitudService.getTramiteSolicitudByIdVehiculo(token, this.idVehiculo).subscribe(
                        response => {
                            this.tramiteSolicitud = response.data;
                            console.log(this.tramiteSolicitud);
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
            });
    }

    onCancelar() {
    }
}
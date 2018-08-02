import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { Router } from "@angular/router";
import { VehiculoService } from '../../services/vehiculo.service';
import { LoginService } from '../../services/login.service';
import { TramiteSolicitudService } from '../../services/tramiteSolicitud.service';
import { Vehiculo } from '../vehiculo/vehiculo.modelo';
import swal from 'sweetalert2';
import { log } from 'util';


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
    public vehiculos: any;
    public tramiteSolicitud: any;
    public idVehiculo;
    public showV:any;
    public datos = {
        'vehiculo': null,
        'tramiteFactura': null,
        'tipoConsulta': null,
        'numeroPlaca': null,
        'numeroVIN': null,
        'numeroSerie': null,
        'numeroMotor': null,
        'numeroChasis': null,
        'propietario': null,
    };

    constructor(
        private router: Router,
        private _loginService: LoginService,
        private _VehiculoService: VehiculoService,
        private _TramiteSolicitudService: TramiteSolicitudService,
    ) { }

    ngOnInit() {
        this.vehiculo = new Vehiculo(null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null);    

    }

    buscarVehiculo() {
        let token = this._loginService.getToken();
        this.showV = false;
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
                    this.vehiculos = response.data;
                    this.vehiculoSuccess = true;
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

    showVehiculo(vehiculo:any){
        this.vehiculo = vehiculo;
        console.log(this.vehiculo);        
        this.showV = true;
      }
}
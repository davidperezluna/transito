import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { CfgTipoVehiculo } from '../cfgTipoVehiculo.modelo';
import { LoginService } from '../../../services/login.service';

import { CfgTipoVehiculoService } from '../../../services/cfgTipoVehiculo.service';
import { ModuloService } from '../../../services/modulo.service';

import swal from 'sweetalert2';

@Component({
    selector: 'app-new',
    templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
    @Output() ready = new EventEmitter<any>();
    public estados: CfgTipoVehiculo;
    public errorMessage;
    public respuesta;

    public modulos: any;
    public moduloSelected: any;

    constructor(
        private _CfgTipoVehiculoService: CfgTipoVehiculoService,
        private _loginService: LoginService,
        private _ModuloService: ModuloService
    ) { }

    ngOnInit() {
        this.estados = new CfgTipoVehiculo(null, null, null);

        this._ModuloService.getModuloSelect().subscribe(
            response => {
                this.modulos = response;
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
    onCancelar() {
        this.ready.emit(true);
    }

    onEnviar() {
        let token = this._loginService.getToken();
        this.estados.moduloId = this.moduloSelected;

        this._CfgTipoVehiculoService.register(this.estados, token).subscribe(
            response => {
                if (response.status == 'success') {
                    this.ready.emit(true);
                    swal({
                        title: 'Perfecto!',
                        text: response.message,
                        type: 'success',
                        confirmButtonText: 'Aceptar'
                    })
                } else {
                    swal({
                        title: 'Error!',
                        text: response.message,
                        type: 'error',
                        confirmButtonText: 'Aceptar'
                    })
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
}

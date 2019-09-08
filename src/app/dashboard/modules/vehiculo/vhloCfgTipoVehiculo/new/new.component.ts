import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { VhloCfgTipoVehiculo } from '../vhloCfgTipoVehiculo.modelo';
import { CfgModuloService } from '../../../../../services/cfgModulo.service';
import { VhloCfgTipoVehiculoService } from '../../../../../services/vhloCfgTipoVehiculo.service';
import { LoginService } from '../../../../../services/login.service';

import swal from 'sweetalert2';

@Component({
    selector: 'app-new',
    templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
    @Output() ready = new EventEmitter<any>();
    public tipoVehiculo: VhloCfgTipoVehiculo;

    public errorMessage;
    public respuesta;

    public modulos: any;

    constructor(
        private _TipoVehiculoService: VhloCfgTipoVehiculoService,
        private _ModuloService: CfgModuloService,
        private _LoginService: LoginService,
    ) { }

    ngOnInit() {
        this.tipoVehiculo = new VhloCfgTipoVehiculo(null, null, null);

        this._ModuloService.select().subscribe(
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
        let token = this._LoginService.getToken();

        this._TipoVehiculoService.register(this.tipoVehiculo, token).subscribe(
            response => {
                if (response.code == 200) {
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

import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { CfgAsignacionPlacaSede } from '../cfgAsignacionPlacaSede.modelo';
import { LoginService } from '../../../services/login.service';

import { SedeOperativaService } from "../../../services/sedeOperativa.service";
import { CfgTipoVehiculoService } from "../../../services/cfgTipoVehiculo.service";
import { ModuloService } from "../../../services/modulo.service";

import swal from 'sweetalert2';
import { CfgAsignacionPlacaSedeService } from '../../../services/cfgAsignacionPlacaSede.service';

@Component({
    selector: 'app-new',
    templateUrl: './new.component.html'
})
export class NewCfgAsignacionPlacaSedeComponent implements OnInit {
    @Output() ready = new EventEmitter<any>();
    public asignacion: CfgAsignacionPlacaSede;
    public errorMessage: any;
    public respuesta: any;

    public sedesOperativas: any;
    public tipos: any;
    public tipoVehiculo: any;
    public modulos: any;

    public sedeOperativaSelected: any;
    public tipoSelected: any = null;
    public moduloSelected: any = null;

    constructor(
        private _loginService: LoginService,
        private _SedeOperativaService: SedeOperativaService,
        private _CfgTipoVehiculoService: CfgTipoVehiculoService,
        private _ModuloService: ModuloService,
        private _CfgAsignacionPlacaSedeService: CfgAsignacionPlacaSedeService
    ) { }

    ngOnInit() {
        this.asignacion = new CfgAsignacionPlacaSede(null, null, null, null, null, null, null, null);

        this._SedeOperativaService.getSedeOperativaSelect().subscribe(
            response => {
                this.sedesOperativas = response;
            },
            error => {
                this.errorMessage = <any>error;

                if (this.errorMessage != null) {
                    console.log(this.errorMessage);
                    alert("Error en la petición");
                }
            }
        );
        this._CfgTipoVehiculoService.getTipoVehiculoSelect().subscribe(
            response => {
                this.tipos = response;
            },
            error => {
                this.errorMessage = <any>error;

                if (this.errorMessage != null) {
                    console.log(this.errorMessage);
                    alert("Error en la petición");
                }
            }
        );

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
        this.asignacion.sedeOperativa = this.sedeOperativaSelected;
        this.asignacion.cfgTipoVehiculo = this.tipoSelected;
        this.asignacion.moduloId = this.moduloSelected;

        this._CfgAsignacionPlacaSedeService.register(this.asignacion, token).subscribe(
            response => {
                if (response.status == 'success') {
                    swal({
                        title: 'Perfecto!',
                        text: response.message,
                        type: 'success',
                        confirmButtonText: 'Aceptar'
                    });
                    this.ready.emit(true);
                } else {
                    swal({
                        title: 'Error!',
                        text: response.message,
                        type: 'error',
                        confirmButtonText: 'Aceptar'
                    });
                } error => {
                    this.errorMessage = <any>error;

                    if (this.errorMessage != null) {
                        console.log(this.errorMessage);
                        alert("Error en la petición");
                    }
                }
            });
    }

    changedTipoVehiculo(e) {
        if (this.tipoSelected) {
            let token = this._loginService.getToken();

            this._CfgTipoVehiculoService.show({'id': this.tipoSelected}, token).subscribe(
                response => {
                    if (response.status == 'success') {
                        this.tipoVehiculo = response.data;
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
        }
    }
}



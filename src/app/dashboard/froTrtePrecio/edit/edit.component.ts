import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FroTrtePrecioService } from '../../../services/froTrtePrecio.service';

import { FroTramiteService } from "../../../services/froTramite.service";
import { VhloCfgClaseService } from "../../../services/vhloCfgClase.service";
import { ModuloService } from "../../../services/modulo.service";

import { LoginService } from '../../../services/login.service';
import swal from 'sweetalert2';

@Component({
    selector: 'app-edit',
    templateUrl: './edit.component.html'
})
export class EditComponent implements OnInit {
    @Output() ready = new EventEmitter<any>();
    @Input() tramitePrecio: any = null;
    public errorMessage;

    public tramites;
    public modulos;
    public clases;

    public formReady = false;

    constructor(
        private _FroTrtePrecioService: FroTrtePrecioService,

        private _FroTramiteService: FroTramiteService,
        private _ClaseService: VhloCfgClaseService,
        private _ModuloService: ModuloService,

        private _loginService: LoginService,
    ) { }

    ngOnInit() {
        this._FroTramiteService.select().subscribe(
            response => {
                this.tramites = response;
                setTimeout(() => {
                    this.tramitePrecio.idTramite = [this.tramitePrecio.tramite.id];
                });
            },
            error => {
                this.errorMessage = <any>error;

                if (this.errorMessage != null) {
                    console.log(this.errorMessage);
                    alert("Error en la petición");
                }
            }
        );
        this._ClaseService.getClaseSelect().subscribe(
            response => {
                this.clases = response;
                setTimeout(() => {
                    this.tramitePrecio.idClase = [this.tramitePrecio.clase.id];
                });
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
                setTimeout(() => {
                    this.tramitePrecio.idModulo = [this.tramitePrecio.modulo.id];
                });
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

    onCancelar() { this.ready.emit(true); }

    onEnviar() {
        let token = this._loginService.getToken();
        this._FroTrtePrecioService.edit(this.tramitePrecio, token).subscribe(
            response => {
                if (response.status == 'success') {
                    this.ready.emit(true);
                    swal({
                        title: 'Perfecto!',
                        text: response.message,
                        type: 'success',
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
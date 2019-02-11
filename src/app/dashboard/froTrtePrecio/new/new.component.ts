import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { FroTrtePrecio } from '../froTrtePrecio.modelo';
import { FroTrtePrecioService } from '../../../services/froTrtePrecio.service';

import { FroTramiteService } from "../../../services/froTramite.service";
import { ClaseService } from "../../../services/clase.service";
import { ModuloService } from "../../../services/modulo.service";

import { LoginService } from '../../../services/login.service';
import swal from 'sweetalert2';
import { environment } from 'environments/environment'

@Component({
    selector: 'app-new',
    templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
    @Output() ready = new EventEmitter<any>();
    public trtePrecio: FroTrtePrecio;
    public errorMessage;
    public tramites;
    public modulos;
    public clases;

    constructor(
        private _FroTrtePrecioService: FroTrtePrecioService,
        
        private _FroTramiteService: FroTramiteService,
        private _ClaseService: ClaseService,
        private _ModuloService: ModuloService,

        private _loginService: LoginService,
    ) { }

    ngOnInit() {
        this.trtePrecio = new FroTrtePrecio(null, null, null, null, null, null, null, null, null);

        swal({
            title: 'Cargando Tabla!',
            text: 'Solo tardara unos segundos por favor espere.',
            timer: 1500,
            onOpen: () => {
                swal.showLoading();
            }
        }).then((result) => {
            if (
                // Read more about handling dismissals
                result.dismiss === swal.DismissReason.timer
            ) {
            }
        });
        this._FroTramiteService.select().subscribe(
            response => {
                this.tramites = response;
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
        this._FroTrtePrecioService.register(this.trtePrecio, token).subscribe(
            response => {
                if (response.status == 'success') {
                    swal({
                        title: 'Perfecto!',
                        text: response.message,
                        type: 'success',
                        confirmButtonText: 'Aceptar'
                    })
                } else {
                    this.trtePrecio.id = null;
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
            }
        );
    }
}
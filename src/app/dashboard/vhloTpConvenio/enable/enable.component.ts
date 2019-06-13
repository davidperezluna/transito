import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { UserCfgTipoIdentificacionService } from "../../../services/userCfgTipoIdentificacion.service";
import { UserCiudadanoService } from "../../../services/userCiudadano.service";
import { LoginService } from '../../../services/login.service';
import swal from 'sweetalert2';

@Component({
    selector: 'app-enable',
    templateUrl: './enable.component.html'
})
export class EnableComponent implements OnInit {
    @Output() ready = new EventEmitter<any>();
    public errorMessage;
    public ciudadano;
    public empresa;
    public identificacion;

    public tiposIdentificacion;
    public tipoIdentificacionSelected;

    constructor(
        private _TipoIdentificacionService: UserCfgTipoIdentificacionService,
        private _UserCiudadanoService: UserCiudadanoService,
        private _LoginService: LoginService,
    ) { }

    ngOnInit() {
        /* this.disenio = new SvCfgDisenio(null, null); */
        this._TipoIdentificacionService.select().subscribe(
            response => {
                this.tiposIdentificacion = response;
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

    /* onEnviar() {
        let token = this._loginService.getToken();

        this._DisenioService.register(this.disenio, token).subscribe(
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
    } */
    onSearchCiudadano() {
        let token = this._LoginService.getToken();
        this._UserCiudadanoService.searchByIdentificacion({'idTipoIdentificacion': this.tipoIdentificacionSelected, 'identificacion': this.identificacion }, token).subscribe(
            response => {
                if (response.status == 'success') {
                    if(response.data.ciudadano){
                        this.ciudadano = response.data.ciudadano;
                    } else if(response.data.empresa){
                        this.empresa = response.data.empresa;
                    }
                } else {
                    swal({
                        title: 'Alerta!',
                        text: response.message,
                        type: 'error',
                        confirmButtonText: 'Aceptar'
                    })
                }
                error => {
                    this.errorMessage = <any>error;
                    if (this.errorMessage != null) {
                        console.log(this.errorMessage);
                        alert('Error en la petición');
                    }
                }
            }
        );
    }
}

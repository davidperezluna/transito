import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SvCfgDisenio } from '../svCfgDisenio.modelo';
import { SvCfgDisenioService } from '../../../../../services/svCfgDisenio.service';
import { LoginService } from '../../../../../services/login.service';
import swal from 'sweetalert2';

@Component({
    selector: 'app-new-svcfgdisenio',
    templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
    @Output() ready = new EventEmitter<any>();
    public disenio: SvCfgDisenio;
    public errorMessage;
    public respuesta;

    constructor(
        private _DisenioService: SvCfgDisenioService,
        private _loginService: LoginService,
    ) { }

    ngOnInit() {
        this.disenio = new SvCfgDisenio(null, null);
    }

    onCancelar() {
        this.ready.emit(true);
    }

    onEnviar() {
        let token = this._loginService.getToken();

        this._DisenioService.register(this.disenio, token).subscribe(
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

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SvCfgEstadoTiempo } from '../svCfgEstadoTiempo.modelo';
import { SvCfgEstadoTiempoService } from '../../../../../services/svCfgEstadoTiempo.service';
import { LoginService } from '../../../../../services/login.service';
import swal from 'sweetalert2';

@Component({
    selector: 'app-new-svcfgestadotiempo',
    templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
    @Output() ready = new EventEmitter<any>();
    public estadoTiempo: SvCfgEstadoTiempo;
    public errorMessage;
    public respuesta;

    constructor(
        private _EstadoTiempoService: SvCfgEstadoTiempoService,
        private _loginService: LoginService,
    ) { }

    ngOnInit() {
        this.estadoTiempo = new SvCfgEstadoTiempo(null, null);
    }

    onCancelar() {
        this.ready.emit(true);
    }

    onEnviar() {
        let token = this._loginService.getToken();

        this._EstadoTiempoService.register(this.estadoTiempo, token).subscribe(
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

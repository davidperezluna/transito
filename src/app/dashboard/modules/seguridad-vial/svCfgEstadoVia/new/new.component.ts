import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SvCfgEstadoVia } from '../svCfgEstadoVia.modelo';
import { SvCfgEstadoViaService } from '../../../../../services/svCfgEstadoVia.service';
import { LoginService } from '../../../../../services/login.service';
import swal from 'sweetalert2';

@Component({
    selector: 'app-new',
    templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
    @Output() ready = new EventEmitter<any>();
    public estadoVia: SvCfgEstadoVia;
    public errorMessage;
    public respuesta;

    constructor(
        private _EstadoViaService: SvCfgEstadoViaService,
        private _loginService: LoginService,
    ) { }

    ngOnInit() {
        this.estadoVia = new SvCfgEstadoVia(null, null);
    }

    onCancelar() {
        this.ready.emit(true);
    }

    onEnviar() {
        let token = this._loginService.getToken();

        this._EstadoViaService.register(this.estadoVia, token).subscribe(
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

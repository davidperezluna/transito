import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SvCfgHipotesis } from '../svCfgHipotesis.modelo';
import { SvCfgHipotesisService } from '../../../../../services/svCfgHipotesis.service';
import { LoginService } from '../../../../../services/login.service';
import swal from 'sweetalert2';

@Component({
    selector: 'app-new-svcfghipotesis',
    templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
    @Output() ready = new EventEmitter<any>();
    public hipotesis: SvCfgHipotesis;
    public errorMessage;
    public respuesta;

    constructor(
        private _HipotesisService: SvCfgHipotesisService,
        private _loginService: LoginService,
    ) { }

    ngOnInit() {
        this.hipotesis = new SvCfgHipotesis(null, null, null);
    }

    onCancelar() {
        this.ready.emit(true);
    }

    onEnviar() {
        let token = this._loginService.getToken();

        this._HipotesisService.register(this.hipotesis, token).subscribe(
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

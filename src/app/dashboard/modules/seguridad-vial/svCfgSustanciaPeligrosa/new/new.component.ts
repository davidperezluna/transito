import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SvCfgSustanciaPeligrosa } from '../svCfgSustanciaPeligrosa.modelo';
import { SvCfgSustanciaPeligrosaService } from '../../../../../services/svCfgSustanciaPeligrosa.service';
import { LoginService } from '../../../../../services/login.service';
import swal from 'sweetalert2';

@Component({
    selector: 'app-new',
    templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
    @Output() ready = new EventEmitter<any>();
    public sustanciaPeligrosa: SvCfgSustanciaPeligrosa;
    public errorMessage;
    public respuesta;

    constructor(
        private _SustanciaPeligrosaService: SvCfgSustanciaPeligrosaService,
        private _loginService: LoginService,
    ) { }

    ngOnInit() {
        this.sustanciaPeligrosa = new SvCfgSustanciaPeligrosa(null, null);
    }

    onCancelar() {
        this.ready.emit(true);
    }

    onEnviar() {
        let token = this._loginService.getToken();

        this._SustanciaPeligrosaService.register(this.sustanciaPeligrosa, token).subscribe(
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

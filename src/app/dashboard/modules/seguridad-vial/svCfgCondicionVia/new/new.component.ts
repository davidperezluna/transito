import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SvCfgCondicionVia } from '../svCfgCondicionVia.modelo';
import { SvCfgCondicionViaService } from '../../../../../services/svCfgCondicionVia.service';
import { LoginService } from '../../../../../services/login.service';
import swal from 'sweetalert2';

@Component({
    selector: 'app-new-svcfgcondicionvia',
    templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
    @Output() ready = new EventEmitter<any>();
    public condicionVia: SvCfgCondicionVia;
    public errorMessage;
    public respuesta;

    public condicionesVia: any;

    constructor(
        private _CondicionViaService: SvCfgCondicionViaService,
        private _loginService: LoginService,
    ) { }

    ngOnInit() {
        this.condicionVia = new SvCfgCondicionVia(null, null);
    }

    onCancelar() {
        this.ready.emit(true);
    }

    onEnviar() {
        let token = this._loginService.getToken();

        this._CondicionViaService.register(this.condicionVia, token).subscribe(
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

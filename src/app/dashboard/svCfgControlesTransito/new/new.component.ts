import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SvCfgControlesTransito } from '../svCfgControlesTransito.modelo';
import { SvCfgControlesTransitoService } from '../../../services/svCfgControlesTransito.service';
import { LoginService } from '../../../services/login.service';
import swal from 'sweetalert2';
import { SvCfgTipoControlesTransitoService } from '../../../services/svCfgTipoControlesTransito.service';

@Component({
    selector: 'app-new',
    templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
    @Output() ready = new EventEmitter<any>();
    public controlTransito: SvCfgControlesTransito;
    public controlesTransito: any;
    public errorMessage;
    public respuesta;

    constructor(
        private _ControlesTransitoService: SvCfgControlesTransitoService,
        private _TipoControlesTransitoService: SvCfgTipoControlesTransitoService,
        private _loginService: LoginService,
    ) { }

    ngOnInit() {
        this.controlTransito = new SvCfgControlesTransito(null, null, null);
        this._TipoControlesTransitoService.getTipoControlesTransitoSelect().subscribe(
            response => {
                this.controlesTransito = response;
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
        this._ControlesTransitoService.register(this.controlTransito, token).subscribe(
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

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SvCfgTipoVictima } from '../svCfgTipoVictima.modelo';
import { SvCfgTipoVictimaService } from '../../../../../services/svCfgTipoVictima.service';
import { LoginService } from '../../../../../services/login.service';
import swal from 'sweetalert2';

@Component({
    selector: 'app-new-svcfgtipovictima',
    templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
    @Output() ready = new EventEmitter<any>();
    public tipoVictima: SvCfgTipoVictima;
    public errorMessage;
    public respuesta;

    constructor(
        private _TipoVictimaService: SvCfgTipoVictimaService,
        private _loginService: LoginService,
    ) { }

    ngOnInit() {
        this.tipoVictima = new SvCfgTipoVictima(null, null);
    }

    onCancelar() {
        this.ready.emit(true);
    }

    onEnviar() {
        let token = this._loginService.getToken();

        this._TipoVictimaService.register(this.tipoVictima, token).subscribe(
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

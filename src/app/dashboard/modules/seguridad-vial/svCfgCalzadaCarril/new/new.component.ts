import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SvCfgCalzadaCarril } from '../svCfgCalzadaCarril.modelo';
import { SvCfgCalzadaCarrilService } from '../../../../../services/svCfgCalzadaCarril.service';
import { LoginService } from '../../../../../services/login.service';
import swal from 'sweetalert2';

@Component({
    selector: 'app-new-svcfgcalzadacarril',
    templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
    @Output() ready = new EventEmitter<any>();
    public calzada: SvCfgCalzadaCarril;
    public errorMessage;
    public respuesta;

    public calzadas: any;

    constructor(
        private _CalzadaCarrilService: SvCfgCalzadaCarrilService,
        private _loginService: LoginService,
    ) { }

    ngOnInit() {
        this.calzada = new SvCfgCalzadaCarril(null, null);
    }

    onCancelar() {
        this.ready.emit(true);
    }

    onEnviar() {
        let token = this._loginService.getToken();

        this._CalzadaCarrilService.register(this.calzada, token).subscribe(
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

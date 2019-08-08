import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SvCfgLugarImpacto } from '../svCfgLugarImpacto.modelo';
import { SvCfgLugarImpactoService } from '../../../../../services/svCfgLugarImpacto.service';
import { LoginService } from '../../../../../services/login.service';
import swal from 'sweetalert2';

@Component({
    selector: 'app-new-svcfglugarimpacto',
    templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
    @Output() ready = new EventEmitter<any>();
    public lugarImpacto: SvCfgLugarImpacto;
    public errorMessage;
    public respuesta;

    constructor(
        private _LugarImpactoService: SvCfgLugarImpactoService,
        private _loginService: LoginService,
    ) { }

    ngOnInit() {
        this.lugarImpacto = new SvCfgLugarImpacto(null, null);
    }

    onCancelar() {
        this.ready.emit(true);
    }

    onEnviar() {
        let token = this._loginService.getToken();

        this._LugarImpactoService.register(this.lugarImpacto, token).subscribe(
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

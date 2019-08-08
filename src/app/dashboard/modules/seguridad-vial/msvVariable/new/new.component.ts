import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MsvVariable } from '../msvVariable.modelo';
import { MsvVariableService } from '../../../../../services/msvVariable.service';
import { MsvParametroService } from "../../../../../services/msvParametro.service";
import { LoginService } from '../../../../../services/login.service';
import swal from 'sweetalert2';

@Component({
    selector: 'app-new-svvariable',
    templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
    @Output() ready = new EventEmitter<any>();
    public variable: MsvVariable;
    public parametros;
    public parametroSelected;
    public errorMessage;

    constructor(
        private _MsvVariableService: MsvVariableService,
        private _MsvParametroService: MsvParametroService,

        private _loginService: LoginService,
    ) { }

    ngOnInit() {
        this.variable = new MsvVariable(null, null, null);
        this._MsvParametroService.getParametroSelect().subscribe(
            response => {
                this.parametros = response;
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
        this.variable.idParametro = this.parametroSelected;

        this._MsvVariableService.register(this.variable, token).subscribe(
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

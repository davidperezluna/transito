import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SvCfgVariable } from '../svCfgVariable.modelo';
import { SvCfgVariableService } from '../../../../../services/svCfgVariable.service';
import { SvCfgParametroService } from "../../../../../services/svCfgParametro.service";
import { LoginService } from '../../../../../services/login.service';
import swal from 'sweetalert2';

@Component({
    selector: 'app-new-svcfgvariable',
    templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
    @Output() ready = new EventEmitter<any>();
    public errorMessage;

    public variable: SvCfgVariable;
    
    public parametros;
    public parametroSelected;

    constructor(
        private _SvCfgVariableService: SvCfgVariableService,
        private _SvCfgParametroService: SvCfgParametroService,

        private _loginService: LoginService,
    ) { }

    ngOnInit() {
        this.variable = new SvCfgVariable(null, null, null);
        this._SvCfgParametroService.getParametroSelect().subscribe(
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

        this._SvCfgVariableService.register(this.variable, token).subscribe(
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

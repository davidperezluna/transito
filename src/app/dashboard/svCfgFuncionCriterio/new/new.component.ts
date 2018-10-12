import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SvCfgFuncionCriterio } from '../svCfgFuncionCriterio.modelo';
import { SvCfgFuncionCriterioService } from '../../../services/svCfgFuncionCriterio.service';
import { LoginService } from '../../../services/login.service';

import swal from 'sweetalert2';
import { SvCfgFuncionService } from '../../../services/svCfgFuncion.service';

@Component({
    selector: 'app-new',
    templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
    @Output() ready = new EventEmitter<any>();
    public funcionCriterio: SvCfgFuncionCriterio;
    public errorMessage;
    public respuesta;

    public funciones: any;
    public funcionSelected: any;

    constructor(
        private _FuncionCriterioService: SvCfgFuncionCriterioService,
        private _loginService: LoginService,
        private _FuncionService: SvCfgFuncionService,

    ) { }

    ngOnInit() {
        this.funcionCriterio = new SvCfgFuncionCriterio(null, null, null);
        this._FuncionService.getFuncionSelect().subscribe(
            response => {
                this.funciones = response;
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
        this.funcionCriterio.funcionId = this.funcionSelected;

        this._FuncionCriterioService.register(this.funcionCriterio, token).subscribe(
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
            }
        );
    }
}


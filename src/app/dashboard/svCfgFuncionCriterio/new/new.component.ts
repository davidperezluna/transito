import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SvCfgFuncionCriterio } from '../svCfgFuncionCriterio.modelo';
import { SvCfgFuncionCriterioService } from '../../../services/svCfgFuncionCriterio.service';
import { LoginService } from '../../../services/login.service';

import swal from 'sweetalert2';

@Component({
    selector: 'app-new',
    templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
    @Output() ready = new EventEmitter<any>();
    @Input() funcion: any = null;
    public funcionCriterio: SvCfgFuncionCriterio;
    public errorMessage;
    public funciones: any;

    constructor(
        private _FuncionCriterioService: SvCfgFuncionCriterioService,
        private _loginService: LoginService,

    ) { }

    ngOnInit() {
        this.funcionCriterio = new SvCfgFuncionCriterio(null, null, null);
    }

    onCancelar() {
        this.ready.emit(true);
    }

    onEnviar() {
        let token = this._loginService.getToken();


        this.funcionCriterio.funcionId = this.funcion.id;

        swal({
            title: '¿Está seguro?',
            text: "¿Desea guardar la información?",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#15d4be',
            cancelButtonColor: '#ff6262',
            confirmButtonText: 'Confirmar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.value) {
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
        });
    }
}

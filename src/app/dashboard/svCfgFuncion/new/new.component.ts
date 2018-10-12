import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SvCfgFuncion } from '../svCfgFuncion.modelo';
import { SvCfgFuncionService } from '../../../services/svCfgFuncion.service';
import { LoginService } from '../../../services/login.service';

import swal from 'sweetalert2';

@Component({
    selector: 'app-new',
    templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
    @Output() ready = new EventEmitter<any>();
    @Input() vehiculo: any = null;
    public funcion: SvCfgFuncion;
    public errorMessage;
    public funciones: any;

    constructor(
        private _FuncionService: SvCfgFuncionService,
        private _loginService: LoginService,

    ) { }

    ngOnInit() {
        this.funcion = new SvCfgFuncion(null, null);
    }

    onCancelar() {
        this.ready.emit(true);
    }

    onEnviar() {
        let token = this._loginService.getToken();

        this._FuncionService.register(this.funcion, token).subscribe(
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

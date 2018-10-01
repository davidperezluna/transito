import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SvCfgFuncionCriterioService } from '../../../services/svCfgFuncionCriterio.service';
import { LoginService } from '../../../services/login.service';
import swal from 'sweetalert2';

@Component({
    selector: 'app-edit',
    templateUrl: './edit.component.html'
})
export class EditComponent implements OnInit {
    @Output() ready = new EventEmitter<any>();
    @Input() funcionCriterio: any = null;
    public errorMessage;
    public respuesta;
    public formReady = false;

    constructor(
        private _FuncionCriterioService: SvCfgFuncionCriterioService,
        private _loginService: LoginService,
    ) { }

    ngOnInit() {
        console.log(this.funcionCriterio);
    }

    onCancelar() { this.ready.emit(true); }

    onEnviar() {
        let token = this._loginService.getToken();
        this._FuncionCriterioService.edit(this.funcionCriterio, token).subscribe(
            response => {
                if (response.status == 'success') {
                    this.ready.emit(true);
                    swal({
                        title: 'Perfecto!',
                        text: response.message,
                        type: 'success',
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
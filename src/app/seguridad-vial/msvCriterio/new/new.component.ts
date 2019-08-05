import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MsvCriterio } from '../msvCriterio.modelo';
import { MsvCriterioService } from '../../../services/msvCriterio.service';
import { MsvVariableService } from "../../../services/msvVariable.service";
import { LoginService } from '../../../services/login.service';
import swal from 'sweetalert2';

@Component({
    selector: 'app-new',
    templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
    @Output() ready = new EventEmitter<any>();
    public criterio: MsvCriterio;
    public errorMessage;
    public respuesta;
    public variables;
    public variableSelected;

    constructor(
        private _CriterioService: MsvCriterioService,
        private _VariableService: MsvVariableService,
        private _loginService: LoginService,
    ) { }

    ngOnInit() {
        this.criterio = new MsvCriterio(null, null, null);

        this._VariableService.getVariableSelect().subscribe(
            response => {
                this.variables = response;
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
        this.criterio.idVariable = this.variableSelected;
        this._CriterioService.register(this.criterio, token).subscribe(
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

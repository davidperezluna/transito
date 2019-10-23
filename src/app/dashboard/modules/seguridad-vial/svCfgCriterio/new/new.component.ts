import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SvCfgCriterio } from '../svCfgCriterio.modelo';
import { SvCfgCriterioService } from '../../../../../services/svCfgCriterio.service';
import { SvCfgVariableService } from "../../../../../services/svCfgVariable.service";
import { LoginService } from '../../../../../services/login.service';
import swal from 'sweetalert2';

@Component({
    selector: 'app-new-svcfgcriterio',
    templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
    @Output() ready = new EventEmitter<any>();
    public criterio: SvCfgCriterio;
    
    public errorMessage;
    
    public variables;
    public variableSelected;

    constructor(
        private _CriterioService: SvCfgCriterioService,
        private _VariableService: SvCfgVariableService,
        private _LoginService: LoginService,
    ) { }

    ngOnInit() {
        this.criterio = new SvCfgCriterio(null, null, null);

        this._VariableService.select().subscribe(
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
        let token = this._LoginService.getToken();
        this.criterio.idVariable = this.variableSelected;
        this._CriterioService.register(this.criterio, token).subscribe(
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

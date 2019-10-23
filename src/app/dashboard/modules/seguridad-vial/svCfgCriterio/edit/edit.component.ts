import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SvCfgCriterioService } from '../../../../../services/svCfgCriterio.service';
import { SvCfgVariableService } from '../../../../../services/svCfgVariable.service';
import { LoginService } from '../../../../../services/login.service';
import swal from 'sweetalert2';

@Component({
    selector: 'app-edit-svcfgcriterio',
    templateUrl: './edit.component.html'
})
export class EditComponent implements OnInit {
    @Output() ready = new EventEmitter<any>();
    @Input() criterio: any = null;
    
    public errorMessage;
    
    public variables;
    public variableSelected;

    public formReady = false;

    constructor(
        private _CriterioService: SvCfgCriterioService,
        private _VariableService: SvCfgVariableService,
        private _loginService: LoginService,
    ) { }

    ngOnInit() {
        this._VariableService.select().subscribe(
            response => {
                this.variables = response;
                setTimeout(() => {
                    this.variableSelected = [this.criterio.variable.id];
                });
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

    onCancelar() { this.ready.emit(true); }

    onEnviar() {
        let token = this._loginService.getToken();
        this.criterio.idVariable = this.variableSelected
        this._CriterioService.edit(this.criterio, token).subscribe(
            response => {
                if (response.code == 200) {
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
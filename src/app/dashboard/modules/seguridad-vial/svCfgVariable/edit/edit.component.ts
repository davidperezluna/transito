import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SvCfgVariableService } from '../../../../../services/svCfgVariable.service';
import { SvCfgParametroService } from '../../../../../services/svCfgParametro.service';
import { LoginService } from '../../../../../services/login.service';
import swal from 'sweetalert2';

@Component({
    selector: 'app-edit-svcfgvariable',
    templateUrl: './edit.component.html'
})
export class EditComponent implements OnInit {
    @Output() ready = new EventEmitter<any>();
    @Input() variable: any = null;
    public errorMessage;

    public parametros;
    public parametroSelected;

    public formReady = false;

    constructor(
        private _SvCfgVariableService: SvCfgVariableService,
        private _SvCfgParametroService: SvCfgParametroService,
        private _LoginService: LoginService,
    ) { }

    ngOnInit() {
        this._SvCfgParametroService.getParametroSelect().subscribe(
            response => {
                this.parametros = response;
                setTimeout(() => {
                    this.parametroSelected = [this.variable.parametro.id];
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
        let token = this._LoginService.getToken();
        this.variable.idParametro = this.parametroSelected;
        this._SvCfgVariableService.editVariable(this.variable, token).subscribe(
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
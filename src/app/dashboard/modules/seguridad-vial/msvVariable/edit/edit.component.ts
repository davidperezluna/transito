import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MsvVariableService } from '../../../../../services/msvVariable.service';
import { MsvParametroService } from '../../../../../services/msvParametro.service';
import { LoginService } from '../../../../../services/login.service';
import swal from 'sweetalert2';

@Component({
    selector: 'app-edit-svvariable',
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
        private _MsvVariableService: MsvVariableService,
        private _MsvParametroService: MsvParametroService,
        private _loginService: LoginService,
    ) { }

    ngOnInit() {
        this._MsvParametroService.getParametroSelect().subscribe(
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
        let token = this._loginService.getToken();
        this.variable.idParametro = this.parametroSelected;
        this._MsvVariableService.editVariable(this.variable, token).subscribe(
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
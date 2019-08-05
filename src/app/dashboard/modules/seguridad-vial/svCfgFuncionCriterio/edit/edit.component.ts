import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SvCfgFuncionCriterioService } from '../../../../../services/svCfgFuncionCriterio.service';
import { LoginService } from '../../../../../services/login.service';
import swal from 'sweetalert2';
import { SvCfgFuncionService } from '../../../../../services/svCfgFuncion.service';

@Component({
    selector: 'app-edit',
    templateUrl: './edit.component.html'
})
export class EditComponent implements OnInit {
    @Output() ready = new EventEmitter<any>();
    @Input() funcionCriterio: any = null;
    public errorMessage;
    public respuesta;

    public funciones: any;
    public funcionSelected: any;

    public formReady = false;

    constructor(
        private _FuncionCriterioService: SvCfgFuncionCriterioService,
        private _loginService: LoginService,
        private _FuncionService: SvCfgFuncionService,
    ) { }

    ngOnInit() {
        console.log(this.funcionCriterio);
        this._FuncionService.getFuncionSelect().subscribe(
            response => {
                this.funciones = response;
                setTimeout(() => {
                    this.funcionSelected = [this.funcionCriterio.funcion.id];
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
        this.funcionCriterio.funcion = this.funcionSelected;
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

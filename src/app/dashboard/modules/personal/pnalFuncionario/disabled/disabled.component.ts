import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PnalFuncionarioService } from '../../../../../services/pnalFuncionario.service';
import { LoginService } from '../../../../../services/login.service';
import swal from 'sweetalert2';
declare var $: any;

@Component({
    selector: 'app-disabled',
    templateUrl: './disabled.component.html'
})

export class DisabledComponent implements OnInit {
    @Output() ready = new EventEmitter<any>();
    @Input() funcionario: any = null;
    public errorMessage;

    public motivoInhabilidad: any;
    public datos = {
        'motivoInhabilidad': null,
        'idFuncionario' : null,
    }

    constructor(
        private _LoginService: LoginService,
        private _FuncionarioService: PnalFuncionarioService,
    ) { }

    ngOnInit() {}

    onCancelar() {
        this.ready.emit(true);
    }

    onEnviar() {
        let token = this._LoginService.getToken();
        this.datos.idFuncionario = this.funcionario.id;
        this._FuncionarioService.disabled(this.datos, token).subscribe(
            response => {
                if (response.code == 200) {
                    this.ready.emit(true);
                    swal({
                        title: 'Perfecto!',
                        text: 'El fue inhabilitado exitosamente',
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
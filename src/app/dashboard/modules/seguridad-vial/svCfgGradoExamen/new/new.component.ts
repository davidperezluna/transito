import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SvCfgGradoExamen } from '../svCfgGradoExamen.modelo';
import { SvCfgGradoExamenService } from '../../../../../services/svCfgGradoExamen.service';
import { LoginService } from '../../../../../services/login.service';
import swal from 'sweetalert2';

@Component({
    selector: 'app-new-svcfggradoexamen',
    templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
    @Output() ready = new EventEmitter<any>();
    public gradoExamen: SvCfgGradoExamen;
    public errorMessage;
    public respuesta;

    constructor(
        private _GradoExamenService: SvCfgGradoExamenService,
        private _loginService: LoginService,
    ) { }

    ngOnInit() {
        this.gradoExamen = new SvCfgGradoExamen(null, null);
    }

    onCancelar() {
        this.ready.emit(true);
    }

    onEnviar() {
        let token = this._loginService.getToken();

        this._GradoExamenService.register(this.gradoExamen, token).subscribe(
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

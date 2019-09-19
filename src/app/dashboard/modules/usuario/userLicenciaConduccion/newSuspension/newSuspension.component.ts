import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { UserLicenciaConduccionRestriccionService } from '../../../../../services/userLicenciaConduccionRestriccion.service';
import { LoginService } from '../../../../../services/login.service';

import swal from 'sweetalert2';

@Component({
    selector: 'app-newSuspension',
    templateUrl: './newSuspension.component.html'
})
export class newSuspensionComponent implements OnInit {
    @Output() ready = new EventEmitter<any>();
    @Input() licenciaConduccion: any = null;
    formCancelacion = {
        'fechaInicio':null,
        'fechaFin':null,
        'fechaResolucion':null,
        'tipoActo':null,
        'numResolucion':null,
        'tipo':'SUSPENSION',
        'idLicenciaConduccion':null,
    };
    public errorMessage;
    constructor(
        private _LoginService: LoginService,
        private _UserLicenciaConduccionRestriccionService: UserLicenciaConduccionRestriccionService,
    ) { }

    ngOnInit() {
        this.formCancelacion.idLicenciaConduccion = this.licenciaConduccion.id;
    }
    onCancelar() {
        this.ready.emit(true);
    }
    // enviar a guarda
    onEnviar() {
        let token = this._LoginService.getToken();
        this._UserLicenciaConduccionRestriccionService.register(this.formCancelacion, token).subscribe(
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
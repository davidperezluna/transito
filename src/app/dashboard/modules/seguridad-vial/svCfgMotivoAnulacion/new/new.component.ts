import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SvCfgMotivoAnulacion } from '../svCfgMotivoAnulacion.modelo';
import { SvCfgMotivoAnulacionService } from '../../../../../services/svCfgMotivoAnulacion.service';
import { LoginService } from '../../../../../services/login.service';
import swal from 'sweetalert2';

@Component({
    selector: 'app-new-svcfgmotivoanulacion',
    templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
    @Output() ready = new EventEmitter<any>();
    public motivoAnulacion: SvCfgMotivoAnulacion;
    public errorMessage;
    public respuesta;

    constructor(
        private _MotivoAnulacionService: SvCfgMotivoAnulacionService,
        private _loginService: LoginService,
    ) { }

    ngOnInit() {
        this.motivoAnulacion = new SvCfgMotivoAnulacion(null, null);
    }

    onCancelar() {
        this.ready.emit(true);
    }

    onEnviar() {
        let token = this._loginService.getToken();

        this._MotivoAnulacionService.register(this.motivoAnulacion, token).subscribe(
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

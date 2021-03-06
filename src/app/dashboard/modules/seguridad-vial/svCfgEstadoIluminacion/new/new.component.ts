import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SvCfgEstadoIluminacion } from '../svCfgEstadoIluminacion.modelo';
import { SvCfgEstadoIluminacionService } from '../../../../../services/svCfgEstadoIluminacion.service';
import { LoginService } from '../../../../../services/login.service';
import swal from 'sweetalert2';

@Component({
    selector: 'app-new-svcfgestadoiluminacion',
    templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
    @Output() ready = new EventEmitter<any>();
    public estadoIluminacion: SvCfgEstadoIluminacion;
    public errorMessage;

    constructor(
        private _EstadoIluminacionService: SvCfgEstadoIluminacionService,
        private _loginService: LoginService,
    ) { }

    ngOnInit() {
        this.estadoIluminacion = new SvCfgEstadoIluminacion(null, null);
    }

    onCancelar() {
        this.ready.emit(true);
    }

    onEnviar() {
        let token = this._loginService.getToken();

        this._EstadoIluminacionService.register(this.estadoIluminacion, token).subscribe(
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

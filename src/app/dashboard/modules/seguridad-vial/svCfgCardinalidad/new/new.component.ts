import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SvCfgCardinalidad } from '../svCfgCardinalidad.modelo';
import { SvCfgCardinalidadService } from '../../../../../services/svCfgCardinalidad.service';
import { LoginService } from '../../../../../services/login.service';
import swal from 'sweetalert2';

@Component({
    selector: 'app-new-svcfgcardinalidad',
    templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
    @Output() ready = new EventEmitter<any>();
    public cardinalidad: SvCfgCardinalidad;
    public errorMessage;
    public respuesta;

    public cardinalidades: any;

    constructor(
        private _CardinalidadService: SvCfgCardinalidadService,
        private _loginService: LoginService,
    ) { }

    ngOnInit() {
        this.cardinalidad = new SvCfgCardinalidad(null, null);
    }

    onCancelar() {
        this.ready.emit(true);
    }

    onEnviar() {
        let token = this._loginService.getToken();

        this._CardinalidadService.register(this.cardinalidad, token).subscribe(
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

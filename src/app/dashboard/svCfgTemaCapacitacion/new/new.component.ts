import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SvCfgTemaCapacitacion } from '../svCfgTemaCapacitacion.modelo';
import { SvCfgTemaCapacitacionService } from '../../../services/svCfgTemaCapacitacion.service';
import { LoginService } from '../../../services/login.service';

import swal from 'sweetalert2';

@Component({
    selector: 'app-new',
    templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
    @Output() ready = new EventEmitter<any>();
    @Input() vehiculo: any = null;
    public temaCapacitacion: SvCfgTemaCapacitacion;
    public errorMessage;
    public temasCapacitaciones: any;

    constructor(
        private _TemaCapacitacionService: SvCfgTemaCapacitacionService,
        private _loginService: LoginService,

    ) { }

    ngOnInit() {
        this.temaCapacitacion = new SvCfgTemaCapacitacion(null, null);
    }

    onCancelar() {
        this.ready.emit(true);
    }

    onEnviar() {
        let token = this._loginService.getToken();

        this._TemaCapacitacionService.register(this.temaCapacitacion, token).subscribe(
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
            }
        );
    }
}

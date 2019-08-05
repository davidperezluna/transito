import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { VhloCfgMotivoCancelacion } from '../vhloCfgMotivoCancelacion.modelo';
import { VhloCfgMotivoCancelacionService } from '../../../../../services/vhloCfgMotivoCancelacion.service';
import { LoginService } from '../../../../../services/login.service';
import swal from 'sweetalert2';

@Component({
    selector: 'app-new',
    templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
    @Output() ready = new EventEmitter<any>();
    public motivoCancelacion: VhloCfgMotivoCancelacion;
    public errorMessage;

    constructor(
        private _MotivoCancelacionService: VhloCfgMotivoCancelacionService,
        private _LoginService: LoginService,
    ) { }

    ngOnInit() {
        this.motivoCancelacion = new VhloCfgMotivoCancelacion(null, null, null);
    }
    onCancelar() {
        this.ready.emit(true);
    }
    onEnviar() {
        let token = this._LoginService.getToken();

        this._MotivoCancelacionService.register(this.motivoCancelacion, token).subscribe(
            response => {
                if (response.code == 200) {
                    this.ready.emit(true);
                    swal({
                        title: response.title,
                        text: response.message,
                        type: response.status,
                        confirmButtonText: 'Aceptar'
                    })
                } else {
                    swal({
                        title: response.title,
                        text: response.message,
                        type: response.status,
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
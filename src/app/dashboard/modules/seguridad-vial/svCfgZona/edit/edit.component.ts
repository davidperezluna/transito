import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SvCfgZonaService } from '../../../../../services/svCfgZona.service';
import { LoginService } from '../../../../../services/login.service';
import swal from 'sweetalert2';

@Component({
    selector: 'app-edit-svcfgzona',
    templateUrl: './edit.component.html'
})
export class EditComponent implements OnInit {
    @Output() ready = new EventEmitter<any>();
    @Input() zona: any = null;
    public errorMessage;
    public respuesta;

    public formReady = false;

    constructor(
        private _ZonaService: SvCfgZonaService,
        private _loginService: LoginService,
    ) { }

    ngOnInit() { }

    onCancelar() { this.ready.emit(true); }

    onEnviar() {
        let token = this._loginService.getToken();
        this._ZonaService.edit(this.zona, token).subscribe(
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
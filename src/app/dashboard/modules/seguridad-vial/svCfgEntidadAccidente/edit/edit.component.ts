import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SvCfgEntidadAccidenteService } from '../../../../../services/svCfgEntidadAccidente.service';
import { LoginService } from '../../../../../services/login.service';
import swal from 'sweetalert2';

@Component({
    selector: 'app-edit-svcfgentidadaccidente',
    templateUrl: './edit.component.html'
})
export class EditComponent implements OnInit {
    @Output() ready = new EventEmitter<any>();
    @Input() entidadAccidente: any = null;
    public errorMessage;
    public respuesta;

    public formReady = false;

    constructor(
        private _EntidadAccidenteService: SvCfgEntidadAccidenteService,
        private _loginService: LoginService,
    ) { }

    ngOnInit() { }

    onCancelar() { this.ready.emit(true); }

    onEnviar() {
        let token = this._loginService.getToken();
        this._EntidadAccidenteService.edit(this.entidadAccidente, token).subscribe(
            response => {
                if (response.code == 200) {
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
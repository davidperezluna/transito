import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SvCfgControlVia } from '../svCfgControlVia.modelo';
import { SvCfgControlViaService } from '../../../../../services/svCfgControlVia.service';
import { LoginService } from '../../../../../services/login.service';
import swal from 'sweetalert2';
import { SvCfgTipoControlService } from '../../../../../services/svCfgTipoControl.service';

@Component({
    selector: 'app-new-svcfgcontrolvia',
    templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
    @Output() ready = new EventEmitter<any>();
    public controlVia: SvCfgControlVia;
    public errorMessage;
    public respuesta;

    public tiposControl: any;
    public tipoControlSelected: any;

    constructor(
        private _ControlViaService: SvCfgControlViaService,
        private _loginService: LoginService,
        private _TipoControlService: SvCfgTipoControlService,
    ) { }

    ngOnInit() {
        this.controlVia = new SvCfgControlVia(null, null, null);
        this._TipoControlService.getTipoControlSelect().subscribe(
            response => {
                this.tiposControl = response;
            },
            error => {
                this.errorMessage = <any>error;

                if (this.errorMessage != null) {
                    console.log(this.errorMessage);
                    alert("Error en la petición");
                }
            }
        );
    }

    onCancelar() {
        this.ready.emit(true);
    }

    onEnviar() {
        let token = this._loginService.getToken();
        this.controlVia.tipoControl = this.tipoControlSelected;
        this._ControlViaService.register(this.controlVia, token).subscribe(
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

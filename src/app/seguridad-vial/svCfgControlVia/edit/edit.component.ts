import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SvCfgControlViaService } from '../../../services/svCfgControlVia.service';
import { LoginService } from '../../../services/login.service';
import swal from 'sweetalert2';
import { SvCfgTipoControlService } from '../../../services/svCfgTipoControl.service';

@Component({
    selector: 'app-edit',
    templateUrl: './edit.component.html'
})
export class EditComponent implements OnInit {
    @Output() ready = new EventEmitter<any>();
    @Input() controlVia: any = null;
    public errorMessage;
    public respuesta;

    public tiposControl: any;
    public tipoControlSelected: any;

    public formReady = false;

    constructor(
        private _ControlViaService: SvCfgControlViaService,
        private _loginService: LoginService,
        private _TipoControlService: SvCfgTipoControlService,
    ) { }

    ngOnInit() {
        console.log(this.controlVia);
        this._TipoControlService.getTipoControlSelect().subscribe(
            response => {
                this.tiposControl = response;
                setTimeout(() => {
                    this.tipoControlSelected = [this.controlVia.tipoControl.id];
                });
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

    onCancelar() { this.ready.emit(true); }

    onEnviar() {
        let token = this._loginService.getToken();
        this.controlVia.tipoControl = this.tipoControlSelected;
        this._ControlViaService.edit(this.controlVia, token).subscribe(
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
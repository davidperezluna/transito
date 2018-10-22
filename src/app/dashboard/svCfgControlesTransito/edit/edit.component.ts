import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SvCfgControlesTransitoService } from '../../../services/svCfgControlesTransito.service';
import { LoginService } from '../../../services/login.service';
import swal from 'sweetalert2';
import { SvCfgTipoControlesTransitoService } from 'app/services/svCfgTipoControlesTransito.service';

@Component({
    selector: 'app-edit',
    templateUrl: './edit.component.html'
})
export class EditComponent implements OnInit {
    @Output() ready = new EventEmitter<any>();
    @Input() controlTransito: any = null;
    public errorMessage;
    public respuesta;

    public tipoControlTransitoSelected: any;
    public tiposControlTransito: any;

    public formReady = false;

    constructor(
        private _ControlesTransitoService: SvCfgControlesTransitoService,
        private _loginService: LoginService,
        private _TipoControlesTransito: SvCfgTipoControlesTransitoService,
    ) { }

    ngOnInit() {
        this._TipoControlesTransito.getTipoControlesTransitoSelect().subscribe(
            response => {
                console.log(response);
                this.tiposControlTransito = response;
                setTimeout(() => {
                    this.tipoControlTransitoSelected = [this.controlTransito.tipoControlTransito.id];
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
        this._ControlesTransitoService.edit(this.controlTransito, token).subscribe(
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
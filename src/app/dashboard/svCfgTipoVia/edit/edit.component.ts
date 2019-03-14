import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SvCfgTipoViaService } from '../../../services/svCfgTipoVia.service';
import { LoginService } from '../../../services/login.service';
import swal from 'sweetalert2';
import { SvCfgTipoAreaService } from '../../../services/svCfgTipoArea.service';

@Component({
    selector: 'app-edit',
    templateUrl: './edit.component.html'
})
export class EditComponent implements OnInit {
    @Output() ready = new EventEmitter<any>();
    @Input() tipoVia: any = null;
    public errorMessage;
    public respuesta;

    public tiposArea: any;
    public tipoAreaSelected: any;

    public formReady = false;

    constructor(
        private _TipoViaService: SvCfgTipoViaService,
        private _loginService: LoginService,
        private _TipoAreaService: SvCfgTipoAreaService,
    ) { }

    ngOnInit() { 
        this._TipoAreaService.getTipoAreaSelect().subscribe(
            response => {
                this.tiposArea = response;
                setTimeout(() => {
                    this.tipoAreaSelected = [this.tipoVia.tipoArea.id];
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
        this.tipoVia.tipoArea = this.tipoAreaSelected;
        this._TipoViaService.edit(this.tipoVia, token).subscribe(
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
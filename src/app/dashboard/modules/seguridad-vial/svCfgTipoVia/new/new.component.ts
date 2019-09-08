import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SvCfgTipoVia } from '../svCfgTipoVia.modelo';
import { SvCfgTipoViaService } from '../../../../../services/svCfgTipoVia.service';
import { LoginService } from '../../../../../services/login.service';
import swal from 'sweetalert2';
import { SvCfgTipoAreaService } from '../../../../../services/svCfgTipoArea.service';

@Component({
    selector: 'app-new-svcfgtipovia',
    templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
    @Output() ready = new EventEmitter<any>();
    public tipoVia: SvCfgTipoVia;
    public errorMessage;
    public respuesta;

    public tiposArea: any;
    public tipoAreaSelected: any;

    constructor(
        private _TipoViaService: SvCfgTipoViaService,
        private _loginService: LoginService,
        private _TipoAreaService: SvCfgTipoAreaService,
    ) { }

    ngOnInit() {
        this.tipoVia = new SvCfgTipoVia(null, null, null);
        this._TipoAreaService.getTipoAreaSelect().subscribe(
            response => {
                this.tiposArea = response;
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
        this.tipoVia.tipoArea = this.tipoAreaSelected;
        this._TipoViaService.register(this.tipoVia, token).subscribe(
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

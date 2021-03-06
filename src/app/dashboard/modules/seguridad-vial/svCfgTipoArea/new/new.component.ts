import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SvCfgTipoArea } from '../svCfgTipoArea.modelo';
import { SvCfgTipoAreaService } from '../../../../../services/svCfgTipoArea.service';
import { LoginService } from '../../../../../services/login.service';
import swal from 'sweetalert2';

@Component({
    selector: 'app-new-svcfgtipoarea',
    templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
    @Output() ready = new EventEmitter<any>();
    @Input() area: any = null;
    public tipoArea: SvCfgTipoArea;
    public errorMessage;
    public respuesta;

    public tiposAreas: any;

    constructor(
        private _TipoAreaService: SvCfgTipoAreaService,
        private _loginService: LoginService,
    ) { }

    ngOnInit() {
        this.tipoArea = new SvCfgTipoArea(null, null);
    }

    onCancelar() {
        this.ready.emit(true);
    }

    onEnviar() {
        let token = this._loginService.getToken();

        this._TipoAreaService.register(this.tipoArea, token).subscribe(
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

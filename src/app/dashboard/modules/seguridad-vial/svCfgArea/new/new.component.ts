import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SvCfgArea } from '../svCfgArea.modelo';
import { SvCfgAreaService } from '../../../../../services/svCfgArea.service';
import { LoginService } from '../../../../../services/login.service';


import swal from 'sweetalert2';
import { SvCfgTipoAreaService } from '../../../../../services/svCfgTipoArea.service';

@Component({
    selector: 'app-new-svcfgarea',
    templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
    @Output() ready = new EventEmitter<any>();
    public area: SvCfgArea;
    public errorMessage;
    public respuesta;

    public tiposAreas: any;
    public tipoAreaSelected: any;

    constructor(
        private _AreaService: SvCfgAreaService,
        private _loginService: LoginService,
        private _TipoAreaService: SvCfgTipoAreaService,
    ) { }

    ngOnInit() {
        this.area = new SvCfgArea(null, null, null);

        this._TipoAreaService.getTipoAreaSelect().subscribe(
            response => {
                this.tiposAreas = response;
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
        this.area.tipoAreaId = this.tipoAreaSelected;

        this._AreaService.register(this.area, token).subscribe(
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

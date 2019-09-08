import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SvCfgAreaService } from '../../../../../services/svCfgArea.service';
import { LoginService } from '../../../../../services/login.service';
import swal from 'sweetalert2';
import { SvCfgTipoAreaService } from "../../../../../services/svCfgTipoArea.service";

@Component({
    selector: 'app-edit-svcfgarea',
    templateUrl: './edit.component.html'
})
export class EditComponent implements OnInit {
    @Output() ready = new EventEmitter<any>();
    @Input() area: any = null;
    public errorMessage;
    public respuesta;

    public tiposAreas: any;
    public tipoAreaSelected: any;

    public formReady = false;

    constructor(
        private _AreaService: SvCfgAreaService,
        private _loginService: LoginService,
        private _TipoAreaService: SvCfgTipoAreaService,
    ) {}

    ngOnInit() {
        console.log(this.area);
        this._TipoAreaService.getTipoAreaSelect().subscribe(
            response => {
                this.tiposAreas = response;
                setTimeout(() => {
                    this.tipoAreaSelected = [this.area.tipoArea.id];
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
        this.area.tipoArea= this.tipoAreaSelected;
        this._AreaService.edit(this.area, token).subscribe(
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

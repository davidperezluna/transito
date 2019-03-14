import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SvCfgGeometriaService } from '../../../services/svCfgGeometria.service';
import { LoginService } from '../../../services/login.service';
import swal from 'sweetalert2';
import { SvCfgTipoGeometriaService } from '../../../services/svCfgTipoGeometria.service';

@Component({
    selector: 'app-edit',
    templateUrl: './edit.component.html'
})
export class EditComponent implements OnInit {
    @Output() ready = new EventEmitter<any>();
    @Input() geometria: any = null;
    public errorMessage;
    public respuesta;

    public tiposGeometria: any;
    public tipoGeometriaSelected: any;

    public formReady = false;

    constructor(
        private _GeometriaService: SvCfgGeometriaService,
        private _loginService: LoginService,
        private _TipoGeometriaService: SvCfgTipoGeometriaService,
    ) { }

    ngOnInit() {
        this._TipoGeometriaService.getTipoGeometriaSelect().subscribe(
            response => {
                this.tiposGeometria = response;
                setTimeout(() => {
                    this.tipoGeometriaSelected = [this.geometria.tipoGeometria.id];
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
        this.geometria.tipoGeometria = this.tipoGeometriaSelected;
        this._GeometriaService.edit(this.geometria, token).subscribe(
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
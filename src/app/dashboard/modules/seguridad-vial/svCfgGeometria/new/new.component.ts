import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SvCfgGeometria } from '../svCfgGeometria.modelo';
import { SvCfgGeometriaService } from '../../../../../services/svCfgGeometria.service';
import { LoginService } from '../../../../../services/login.service';
import swal from 'sweetalert2';
import { SvCfgTipoGeometriaService } from '../../../../../services/svCfgTipoGeometria.service';

@Component({
    selector: 'app-new-svcfggeometria',
    templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
    @Output() ready = new EventEmitter<any>();
    public geometria: SvCfgGeometria;
    public errorMessage;
    public respuesta;

    public tiposGeometria: any;
    public tipoGeometriaSelected: any;

    constructor(
        private _GeometriaService: SvCfgGeometriaService,
        private _loginService: LoginService,
        private _TipoGeometriaService: SvCfgTipoGeometriaService,
    ) { }

    ngOnInit() {
        this.geometria = new SvCfgGeometria(null, null, null);
        this._TipoGeometriaService.getTipoGeometriaSelect().subscribe(
            response => {
                this.tiposGeometria = response;
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
        this.geometria.tipoGeometria = this.tipoGeometriaSelected;
        this._GeometriaService.register(this.geometria, token).subscribe(
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

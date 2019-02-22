import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FroReporteIngresos } from '../froReporteIngresos.modelo';
import { FroReporteIngresosService } from '../../../services/froReporteIngresos.service';
import { LoginService } from '../../../services/login.service';
import { FroFacturaService } from '../../../services/froFactura.service';
import { CfgOrganismoTransitoService } from '../../../services/cfgOrganismoTransito.service';
import swal from 'sweetalert2';

@Component({
    selector: 'app-new',
    templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
    @Output() ready = new EventEmitter<any>();
    public froReporteIngresos: FroReporteIngresos;
    public errorMessage;
    public organismosTransito: any;
    public sedeOperativaSelected: any;

    constructor(
        private _FroReporteIngresosService: FroReporteIngresosService,
        private _loginService: LoginService,
        private _OrganismoTransitoService: CfgOrganismoTransitoService,
        private _FroFacturaServiceService: FroFacturaService,
    ) { }

    ngOnInit() {
        this.froReporteIngresos = new FroReporteIngresos(null, null, null, null, null);

        this._OrganismoTransitoService.selectSedes().subscribe(
            response => {
                this.organismosTransito = response;
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

    /* onSearchFactura() {
        let token = this._loginService.getToken();
        let datos = {
            'numeroFactura': this.numFactura
        }

        this._FroFacturaServiceService.searchByNumero(token, datos).subscribe(
            response => {
                if (response.status == 'success') {
                    this.disabled = false;
                    this.froFactura = response.data;
                    this.froReporteIngresos.valor = this.froFactura.valor;
                } else {
                    this.disabled = false;
                }
            },
            error => {
                this.errorMessage = <any>error;

                if (this.errorMessage != null) {
                    console.log(this.errorMessage);
                    alert("Error en la petición");
                }
            }
        );
    } */

    onEnviar() {
        /* let token = this._loginService.getToken();
        this.froReporteIngresos.IdSedeOperativa = this.sedeOperativaSelected;
        this.froReporteIngresos.IdFroFactura = this.froFactura.id;

        this._FroReporteIngresosService.register(this.froReporteIngresos, token).subscribe(
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
        ); */
    }
}

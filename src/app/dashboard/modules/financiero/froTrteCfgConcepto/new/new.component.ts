import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { FroTrteCfgConcepto } from '../froTrteCfgConcepto.modelo';
import { FroTrteCfgConceptoService } from '../../../../../services/froTrteCfgConcepto.service';
import { FroTrteCfgCuentaService } from '../../../../../services/froTrteCfgCuenta.service';
import { LoginService } from '../../../../../services/login.service';
import swal from 'sweetalert2';
import { environment } from 'environments/environment'

@Component({
    selector: 'app-new-frotrtecfgconcepto',
    templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
    @Output() ready = new EventEmitter<any>();
    public tramiteConcepto: FroTrteCfgConcepto;
    public errorMessage;
    public cuentas: any;

    public apiUrl = environment.apiUrl + 'financiero';

    constructor(
        private _ConceptoService: FroTrteCfgConceptoService,
        private _CuentaService: FroTrteCfgCuentaService,
        private _loginService: LoginService,
    ) { }

    ngOnInit() {
        this.tramiteConcepto = new FroTrteCfgConcepto(null, null, null, null);

        this._CuentaService.select().subscribe(
            response => {
                this.cuentas = response;
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

        this._ConceptoService.register(this.tramiteConcepto, token).subscribe(
            response => {
                if (response.code == 200) {
                    swal({
                        title: 'Perfecto!',
                        text: response.message,
                        type: 'success',
                        confirmButtonText: 'Aceptar'
                    });

                    this.ready.emit(true);
                } else {
                    swal({
                        title: 'Error!',
                        text: response.message,
                        type: 'error',
                        confirmButtonText: 'Aceptar'
                    });
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
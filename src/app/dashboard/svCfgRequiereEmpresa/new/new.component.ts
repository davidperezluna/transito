import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SvCfgRequiereEmpresa } from '../svCfgRequiereEmpresa.modelo';
import { SvCfgRequiereEmpresaService } from '../../../services/svCfgRequiereEmpresa.service';
import { LoginService } from '../../../services/login.service';
import swal from 'sweetalert2';
import { VhloCfgCarroceriaService } from '../../../services/vhloCfgCarroceria.service';

@Component({
    selector: 'app-new',
    templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
    @Output() ready = new EventEmitter<any>();
    public requiereEmpresa: SvCfgRequiereEmpresa;
    public errorMessage;
    public respuesta;

    public carrocerias: any;
    public carroceriaSelected: any;

    constructor(
        private _RequiereEmpresaService: SvCfgRequiereEmpresaService,
        private _loginService: LoginService,
        private _CarroceriaService: VhloCfgCarroceriaService,
    ) { }

    ngOnInit() {
        this.requiereEmpresa = new SvCfgRequiereEmpresa(null, null, null);
        this._CarroceriaService.getCarroceriaSelect().subscribe(
            response => {
                this.carrocerias = response;
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
        this.requiereEmpresa.carroceria = this.carroceriaSelected;
        this._RequiereEmpresaService.register(this.requiereEmpresa, token).subscribe(
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

            });
    }
}

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SvCfgRequiereEmpresaService } from '../../../services/svCfgRequiereEmpresa.service';
import { LoginService } from '../../../services/login.service';
import swal from 'sweetalert2';
import { VhloCfgCarroceriaService } from '../../../services/vhloCfgCarroceria.service';

@Component({
    selector: 'app-edit',
    templateUrl: './edit.component.html'
})
export class EditComponent implements OnInit {
    @Output() ready = new EventEmitter<any>();
    @Input() requiereEmpresa: any = null;
    public errorMessage;
    public respuesta;

    public carrocerias: any;
    public carroceriaSelected: any;

    public formReady = false;

    constructor(
        private _RequiereEmpresaService: SvCfgRequiereEmpresaService,
        private _loginService: LoginService,
        private _CarroceriaService: VhloCfgCarroceriaService,
    ) { }

    ngOnInit() {
        this._CarroceriaService.getCarroceriaSelect().subscribe(
            response => {
                this.carrocerias = response;
                setTimeout(() => {
                    this.carroceriaSelected = [this.requiereEmpresa.carroceria.id];
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
        this.requiereEmpresa.carroceria = this.carroceriaSelected;
        console.log("enviar: " + this.requiereEmpresa.nombre);
        this._RequiereEmpresaService.edit(this.requiereEmpresa, token).subscribe(
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
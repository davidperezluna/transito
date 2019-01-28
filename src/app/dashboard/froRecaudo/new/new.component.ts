import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FroRecaudo } from '../froRecaudo.modelo';
import { FroRecaudoService } from '../../../services/froRecaudo.service';
import { LoginService } from '../../../services/login.service';
import { FroFacturaService } from '../../../services/froFactura.service';
import { SedeOperativaService } from '../../../services/sedeOperativa.service';
import swal from 'sweetalert2';

@Component({
    selector: 'app-new',
    templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
    @Output() ready = new EventEmitter<any>();
    public froRecaudo: FroRecaudo;
    public errorMessage;
    public respuesta;

    public numFactura: any;
    public disabled: boolean = true;
    public sedesOperativas: any;
    public froFactura: any;
    public sedeOperativaSelected: any;

    constructor(
        private _FroRecaudoService: FroRecaudoService,
        private _loginService: LoginService,
        private _SedeOperativaService: SedeOperativaService,
        private _FroFacturaServiceService: FroFacturaService,
    ) { }

    ngOnInit() {
        this.froRecaudo = new FroRecaudo(null, null, null,null,null,null,null,null,null);

        this._SedeOperativaService.getSedeOperativaSelect().subscribe(
            response => {
                this.sedesOperativas = response;
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

    onSearchFactura() {
        let token = this._loginService.getToken();
        let datos = {
            'numeroFactura': this.numFactura
        }

        this._FroFacturaServiceService.searchByNumero(token, datos).subscribe(
            response => {
                if (response.status == 'success') {
                    this.disabled = false;
                    this.froFactura = response.data;
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
    }

    onEnviar() {
        let token = this._loginService.getToken();
        this.froRecaudo.IdSedeOperativa = this.sedeOperativaSelected;
        this.froRecaudo.IdFroFactura = this.froFactura.id;

        this._FroRecaudoService.register(this.froRecaudo, token).subscribe(
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

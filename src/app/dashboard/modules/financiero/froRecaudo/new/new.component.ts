import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FroRecaudo } from '../froRecaudo.modelo';
import { FroRecaudoService } from '../../../../../services/froRecaudo.service';
import { LoginService } from '../../../../../services/login.service';
import { FroFacturaService } from '../../../../../services/froFactura.service';
import { CfgOrganismoTransitoService } from '../../../../../services/cfgOrganismoTransito.service';
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
    public organismosTransito: any;
    public froFactura: any;
    public sedeOperativaSelected: any;

    constructor(
        private _FroRecaudoService: FroRecaudoService,
        private _loginService: LoginService,
        private _OrganismoTransitoService: CfgOrganismoTransitoService,
        private _FroFacturaServiceService: FroFacturaService,
    ) { }

    ngOnInit() {
        this.froRecaudo = new FroRecaudo(null, null, null,null,null,null,null,null,null);

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

    onSearchFactura() {
        let token = this._loginService.getToken();
        let datos = {
            'numeroFactura': this.numFactura
        }

        this._FroFacturaServiceService.searchByNumero(token, datos).subscribe(
            response => {
                if (response.code == 200) {
                    this.disabled = false;
                    this.froFactura = response.data;
                    this.froRecaudo.valor = this.froFactura.valor;
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
            }
        );
    }
}

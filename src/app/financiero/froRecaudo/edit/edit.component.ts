import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FroRecaudoService } from '../../../services/froRecaudo.service';
import { LoginService } from '../../../services/login.service';
import swal from 'sweetalert2';
import { CfgOrganismoTransitoService } from '../../../services/cfgOrganismoTransito.service';
import { FroFacturaService } from '../../../services/froFactura.service';

@Component({
    selector: 'app-edit',
    templateUrl: './edit.component.html'
})
export class EditComponent implements OnInit {
    @Output() ready = new EventEmitter<any>();
    @Input() froRecaudo: any = null;
    public errorMessage;
    public respuesta;

    public numFactura: any;
    public disabled: boolean = true;
    public organismosTransito: any;
    public froFactura: any;
    public sedeOperativaSelected: any;

    public formReady = false;

    constructor(
        private _FroRecaudoService: FroRecaudoService,
        private _loginService: LoginService,
        private _OrganismoTransitoService: CfgOrganismoTransitoService,
        private _FroFacturaServiceService: FroFacturaService,
    ) {}

    ngOnInit() {
        this.numFactura = this.froRecaudo.froFactura.numero;
        this._OrganismoTransitoService.selectSedes().subscribe(
            response => {
                console.log(response); 
                this.organismosTransito = response;
                setTimeout(() => {
                    this.sedeOperativaSelected = [this.froRecaudo.sedeOperativa.id];
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
        this.froRecaudo.IdSedeOperativa = this.sedeOperativaSelected;
        this.froRecaudo.IdFroFactura = this.froFactura.id;
        this._FroRecaudoService.edit(this.froRecaudo, token).subscribe(
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

    buscarFactura(){
        let token = this._loginService.getToken();
        let datos = {
            'numeroFactura':this.numFactura
        }

        this._FroFacturaServiceService.searchByNumero(token,datos).subscribe(
            response => {
                if (response.status == 'success') {
                    this.disabled = false;
                    this.froFactura = response.data;
                }else{
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
}

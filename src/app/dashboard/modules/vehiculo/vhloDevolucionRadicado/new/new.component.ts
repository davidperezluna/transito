import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { VhloDevolucionRadicado } from '../vhloDevolucionRadicado.modelo';

import { VhloDevolucionRadicadoService } from '../../../../../services/vhloDevolucionRadicado.service';
import { CfgOrganismoTransitoService } from '../../../../../services/cfgOrganismoTransito.service';
import { LoginService } from '../../../../../services/login.service';
import swal from 'sweetalert2';

@Component({
    selector: 'app-new-vhlodevolucionradicado',
    templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
    @Output() ready = new EventEmitter<any>();
    @Input() vehiculo: any = null;
    @Input() propietarios: any = null;
    public devolucion: VhloDevolucionRadicado;

    public organismosTransitoNacional: any;

    public errorMessage;

    constructor(
        private _VhloDevolucionRadicadoService: VhloDevolucionRadicadoService,
        private _OrganismoTransitoService: CfgOrganismoTransitoService,
        private _LoginService: LoginService,
    ) { }

    ngOnInit() {
        this.devolucion = new VhloDevolucionRadicado(null, null, null, null, null, null);

        this._OrganismoTransitoService.select().subscribe(
            response => {
                this.organismosTransitoNacional = response;
                setTimeout(() => {
                    this.devolucion.idOrganismoTransito = [this.vehiculo.organismoTransito.id];
                })
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
        let token = this._LoginService.getToken();

        this.devolucion.idVehiculo = this.vehiculo.id;

        this._VhloDevolucionRadicadoService.register(this.devolucion, token).subscribe(
            response => {
                if (response.code == 200) {
                    this.ready.emit(true);
                    swal({
                        title: response.title,
                        text: response.message,
                        type: response.status,
                        confirmButtonText: 'Aceptar'
                    })
                } else {
                    swal({
                        title: response.title,
                        text: response.message,
                        type: response.status,
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
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { VhloTpTarjetaOperacion } from "../vhloTpTarjetaOperacion.modelo";
import { VhloTpTarjetaOperacionService } from "../../../../../services/vhloTpTarjetaOperacion.service";
import { LoginService } from '../../../../../services/login.service';
import swal from 'sweetalert2';

@Component({
    selector: 'app-new-vhlotptarjetaoperacion',
    templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
    @Output() ready = new EventEmitter<any>();
    @Input() empresaHabilitadaCupo: any = null;
    public errorMessage;
    public tarjetaOperacion: VhloTpTarjetaOperacion;
    public asignacion;

    public placa;

    constructor(
        private _LoginService: LoginService,
        private _VhloTpTarjetaOperacionService: VhloTpTarjetaOperacionService,
    ) { }

    ngOnInit() {
        console.log(this.empresaHabilitadaCupo);
        this.tarjetaOperacion = new VhloTpTarjetaOperacion(null, null, null, null);
    }

    onCancelar() {
        this.ready.emit(true);
    }

    onSearchAsignacion() {
        let token = this._LoginService.getToken();

        this._VhloTpTarjetaOperacionService.searchAsignacion({ 'placa': this.placa }, token).subscribe(
            response => {
                if (response.code == 200) {
                    this.asignacion = response.data;
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

    onEnviar() {
        let token = this._LoginService.getToken();

        this.tarjetaOperacion.idAsignacion = this.asignacion.id;

        this._VhloTpTarjetaOperacionService.register(this.tarjetaOperacion, token).subscribe(
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

            });
    }
}

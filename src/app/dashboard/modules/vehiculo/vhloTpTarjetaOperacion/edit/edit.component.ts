import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { VhloTpTarjetaOperacionService } from "../../../../../services/vhloTpTarjetaOperacion.service";

import { LoginService } from '../../../../../services/login.service';
import { DatePipe, CurrencyPipe } from '@angular/common';
import swal from 'sweetalert2';

@Component({
    selector: 'app-edit-vhlotptarjetaoperacion',
    templateUrl: './edit.component.html',
    providers: [DatePipe]
})
export class EditComponent implements OnInit {
    @Output() ready = new EventEmitter<any>();
    @Input() tarjetaOperacion: any = null;
    @Input() empresaHabilitadaCupo: any = null;
    
    public placa;
    public asignacion;

    public errorMessage;

    constructor(
        private _LoginService: LoginService,
        private _VhloTpTarjetaOperacionService: VhloTpTarjetaOperacionService,
    ) { }

    ngOnInit() {
        this.placa = this.tarjetaOperacion[0].asignacion.vehiculo.placa.numero;

        //busca el vehiculo
        let token = this._LoginService.getToken();

        var datePiper = new DatePipe(this.tarjetaOperacion[0].fechaVencimiento.timestamp);
        this.tarjetaOperacion[0].fechaVencimiento = datePiper.transform(this.tarjetaOperacion[0].fechaVencimiento.timestamp, 'yyyy-MM-dd');

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

        this._VhloTpTarjetaOperacionService.edit(this.tarjetaOperacion, token).subscribe(
            response => {
                if (response.code == 200) {
                    this.ready.emit(true);
                    swal({
                        title: response.title,
                        text: response.message,
                        type: response.status,
                        confirmButtonText: 'Aceptar'
                    })
                    this.ready.emit(true);
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
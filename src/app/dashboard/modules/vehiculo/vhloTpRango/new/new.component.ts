import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { VhloTpRango } from "../vhloTpRango.modelo";
import { VhloTpRangoService } from "../../../../../services/vhloTpRango.service";
import { VhloTpConvenioService } from '../../../../../services/vhloTpConvenio.service';
import { LoginService } from '../../../../../services/login.service';

import { DatePipe, CurrencyPipe } from '@angular/common';
import swal from 'sweetalert2';

@Component({
    selector: 'app-new-vhlotprango',
    templateUrl: './new.component.html',
    providers: [DatePipe]
})
export class NewComponent implements OnInit {
    @Output() ready = new EventEmitter<any>();
    @Input() empresaHabilitada: any = null;
    public errorMessage;
    public rango:  VhloTpRango;
    public convenio: any;

    constructor(
        private _LoginService: LoginService,
        private _VhloTpRangoService: VhloTpRangoService,
        private _VhloTpConvenioService: VhloTpConvenioService,
    ) { }

    ngOnInit() {
        this.rango = new VhloTpRango(null, null, null, null, null, null, null, null);
    }

    onCancelar() {
        this.ready.emit(true);
    }

    onEnviar() {
        let token = this._LoginService.getToken();

        this.rango.idEmpresaTransporte = this.empresaHabilitada.id;
        
        this._VhloTpRangoService.register(this.rango, token).subscribe(
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

    onSearchConvenio() {
        let token = this._LoginService.getToken();
        this._VhloTpConvenioService.searchByNumeroConvenio({ 'numeroConvenio': this.rango.numeroConvenio }, token).subscribe(
            response => {
                if (response.code == 200) {
                    this.convenio = response.data;

                    var datePiper = new DatePipe('en-US');
                    var date = new Date();

                    date.setTime(this.convenio.fechaConvenio.timestamp * 1000);

                    this.convenio.fechaConvenio = datePiper.transform(
                        date, 'yyyy/MM/dd'
                    );

                    date.setTime(this.convenio.fechaActaInicio.timestamp * 1000);

                    this.convenio.fechaActaInicio = datePiper.transform(
                        date, 'yyyy/MM/dd'
                    );

                    date.setTime(this.convenio.fechaActaFin.timestamp * 1000);

                    this.convenio.fechaActaFin = datePiper.transform(
                        date, 'yyyy/MM/dd'
                    );

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
                        alert('Error en la petición');
                    }
                }
            }
        );
    }
}

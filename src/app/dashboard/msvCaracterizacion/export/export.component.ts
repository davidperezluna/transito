import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LoginService } from '../../../services/login.service';
import { MsvCaracterizacion } from '../msvCaracterizacion.modelo';
import { MsvCaracterizacionService } from "../../../services/msvCaracterizacion.service";

import { DatePipe, CurrencyPipe } from '@angular/common';

import swal from 'sweetalert2';
import { Utils } from 'ng2-bootstrap';
declare var $: any;

@Component({
    selector: 'app-index',
    templateUrl: './export.component.html',
    providers: [DatePipe]
})
export class ExportComponent implements OnInit {
    @Output() ready = new EventEmitter<any>();
    public errorMessage;
    public formNew = false;
    public formEdit = false;
    public formIndex = true;
    public table: any = null;

    public ctzn: any;
    public nit: any;

    public empresaEncontrada = false;
    public empresa: any;

    exportCaracterizacion: MsvCaracterizacion;

    constructor(
        private _MsvCaracterizacionService: MsvCaracterizacionService,
        private _LoginService: LoginService,

    ) { }

    ngOnInit() {
        this.exportCaracterizacion = new MsvCaracterizacion(null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
        /* swal({
            title: '¿La empresa solicita asistencia técnica?',
            type: 'info',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Si',
            cancelButtonText: 'No'
            }).then((result) => {
            if (result.value) {
                this.ctzn = true;
            } else if (result.dismiss === swal.DismissReason.cancel) {
                this.ctzn = false;
            }
            }); */
    }

    onBuscarEmpresa() {
        let token = this._LoginService.getToken();
        this._MsvCaracterizacionService.getBuscarEmpresa({ 'nit': this.nit }, token).subscribe(
            response => {
                if (response.status == 'success') {
                    this.empresaEncontrada = true;
                    this.empresa = response.data;
                } else {
                    swal({
                        title: 'Alerta!',
                        text: response.message,
                        type: 'error',
                        confirmButtonText: 'Aceptar'
                    });
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

    onExport(){
        alert("d---------------------");
    }
}
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LoginService } from '../../../../../services/login.service';
import { SvCaracterizacion } from '../svCaracterizacion.modelo';
import { SvCaracterizacionService } from "../../../../../services/svCaracterizacion.service";

import { DatePipe, CurrencyPipe } from '@angular/common';

import swal from 'sweetalert2';
import { Utils } from 'ng2-bootstrap';
declare var $: any;

@Component({
    selector: 'app-export-svcaracterizacion',
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

    public date: any;
    public fecha: any;
    public empresaEncontrada = false;
    public registros: any;

    public exportCaracterizacion: SvCaracterizacion;

    constructor(
        private _MsvCaracterizacionService: SvCaracterizacionService,
        private _LoginService: LoginService,

    ) { }

    ngOnInit() {
        this.exportCaracterizacion = new SvCaracterizacion(null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
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

    iniciarTabla() {
        this.date = new Date();
        var datePiper = new DatePipe(this.date);
        this.fecha = datePiper.transform(this.date, 'yyyy-MM-dd');
        $('#dataTables-example').DataTable({
            responsive: true,
            pageLength: 8,
            sPaginationType: 'full_numbers',
            dom: 'Bfrtip',
            buttons: [
                {
                    extend: 'excel',
                    text: 'Excel',
                    title: 'xls',
                    filename: 'Reporte_caracterizacionEmpresa_' + this.fecha,
                },
                /* {
                    extend: 'pdfHtml5',
                    orientation: 'landscape',
                    pageSize: 'LEGAL',
                    filename: 'Reporte_caracterizacionEmpresaPDF_' + this.fecha,
                } */
            ],
            oLanguage: {
                oPaginate: {
                    sFirst: '<<',
                    sPrevious: '<',
                    sNext: '>',
                    sLast: '>>'
                }
            }
        });
        this.table = $('#dataTables-example').DataTable();
    }

    onSearchRegistros() {
        let token = this._LoginService.getToken();
        this._MsvCaracterizacionService.getBuscarRegistros({ 'nit': this.exportCaracterizacion.nit }, token).subscribe(
            response => {
                if (response.code == 200) {
                    this.empresaEncontrada = true;
                    this.registros = response.data;
                    let timeoutId = setTimeout(() => {
                        this.iniciarTabla();
                    }, 100);
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
}
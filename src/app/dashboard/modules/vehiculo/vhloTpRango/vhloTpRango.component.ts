import { Component, OnInit } from '@angular/core';
import { VhloTpRangoService } from '../../../../services/vhloTpRango.service';
import { UserEmpresaTransporteService } from '../../../../services/userEmpresaTransporte.service';
import { LoginService } from '../../../../services/login.service';
import { VhloTpRango } from './vhloTpRango.modelo';
import { DatePipe, CurrencyPipe } from '@angular/common';

import swal from 'sweetalert2';

declare var $: any;

@Component({
    selector: 'app-index',
    templateUrl: './vhloTpRango.component.html',
    providers: [DatePipe]
})
export class VhloTpRangoComponent implements OnInit {
    public errorMessage;
    public table: any;
    public empresasTransporte;
    public rango: VhloTpRango;

    public fecha;
    public date;

    public nit: any = null;
    public numeroActo: any = null;

    public empresaHabilitada = null;
    public rangos;

    public formIndex: any;
    public formSearch: any;
    public formNew: any;
    public formEdit: any;

    constructor(
        private _VhloTpRangoService: VhloTpRangoService,
        private _UserEmpresaTransporteService: UserEmpresaTransporteService,
        private _LoginService: LoginService,
    ) { }

    ngOnInit() {
        this.onInitForms();
        this.formSearch = true;

        this.date = new Date();
        var datePiper = new DatePipe(this.date);
        this.fecha = datePiper.transform(this.date, 'dd-MM-yyyy');
        

        swal({
            title: 'Cargando Tabla!',
            text: 'Solo tardará unos segundos, por favor espere.',
            timer: 1500,
            onOpen: () => {
                swal.showLoading();
            }
        }).then((result) => {
            if (
                // Read more about handling dismissals
                result.dismiss === swal.DismissReason.timer
            ) {
            }
        });

        if (this.empresaHabilitada != null) {
            let token = this._LoginService.getToken();

            this._VhloTpRangoService.searchRangos({ 'idEmpresa': this.empresaHabilitada.id }, token).subscribe(
                response => {
                    if (response.code == 200) {
                        this.rangos = response.data;
                        this.formIndex = true;
                        
                        let timeoutId = setTimeout(() => {
                            this.onInitTable();
                        }, 100);
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

    onInitForms() {
        this.formIndex = false;
        this.formSearch = false;
        this.formNew = false;
        this.formEdit = false;

        return true;
    }

    onInitTable() {
        if (this.table) {
            this.table.destroy();
        }
        this.table = $('#dataTables-example').DataTable({
            responsive: true,
            pageLength: 10,
            sPaginationType: 'full_numbers',
            dom: 'Bfrtip',
            buttons: [
                {
                    title: 'Nombre Empresa: ' + this.empresaHabilitada.empresa.nombre,
                    messageTop: 'Nit: ' + this.empresaHabilitada.empresa.nit, 
                    extend: 'excel',
                    text: 'Excel',
                    filename: 'Reporte_Rangos_' + this.empresaHabilitada.empresa.nombre + '_' + this.fecha,
                    exportOptions: {
                        columns: [0,1,2,3,4,5]
                    },
                },
            ],
            oLanguage: {
                oPaginate: {
                    sFirst: '<i class="fa fa-step-backward"></i>',
                    sPrevious: '<i class="fa fa-chevron-left"></i>',
                    sNext: '<i class="fa fa-chevron-right"></i>',
                    sLast: '<i class="fa fa-step-forward"></i>'
                }
            }
        });
    }

    onNew(empresaHabilitada: any) {
        this.empresaHabilitada = empresaHabilitada;
        this.onInitForms();
        this.formSearch = true;
        this.formNew = true;
    }

    ready(isCreado: any) {
        if (isCreado) {
            this.ngOnInit();
        }
    }

    onDelete(id: any) {
        swal({
            title: '¿Estás seguro?',
            text: "¡Se eliminará este registro!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#15d4be',
            cancelButtonColor: '#ff6262',
            confirmButtonText: 'Confirmar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.value) {
                let token = this._LoginService.getToken();

                this._VhloTpRangoService.delete({ 'id': id }, token).subscribe(
                    response => {
                        swal({
                            title: response.title,
                            text: response.message,
                            type: response.status,
                            confirmButtonColor: '#15d4be',
                        })
                        this.ngOnInit();
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
        });
    }

    onSearchEmpresa() {
        let token = this._LoginService.getToken();
        this._UserEmpresaTransporteService.searchByNitAndNumeroActo({ 'nit': this.nit, 'numeroActo': this.numeroActo }, token).subscribe(
            response => {
                if (response.code == 200) {
                    this.empresaHabilitada = response.data;

                    this._VhloTpRangoService.searchRangos({ 'idEmpresa': this.empresaHabilitada.id }, token).subscribe(
                        response => {
                            if (response.code == 200) {
                                this.rangos = response.data;
                                let timeoutId = setTimeout(() => {
                                    this.onInitTable();
                                }, 100);
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
                    this.onInitForms();
                    this.formIndex = true;
                    this.formSearch = true;
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

    /* onEdit(habilitacion: any) {
        this.habilitacion = habilitacion;
        this.onInitForms();
        this.formEdit = true;
        this.formSearch = true;
    } */
}

import { Component, OnInit } from '@angular/core';
import { VhloTpTarjetaOperacionService } from '../../../../services/vhloTpTarjetaOperacion.service';
import { LoginService } from '../../../../services/login.service';
import { VhloTpTarjetaOperacion } from './vhloTpTarjetaOperacion.modelo';
import { DatePipe, CurrencyPipe } from '@angular/common';
import swal from 'sweetalert2';
declare var $: any;

@Component({
    selector: 'app-index',
    templateUrl: './vhloTpTarjetaOperacion.component.html',
    providers: [DatePipe]
})
export class VhloTpTarjetaOperacionComponent implements OnInit {
    public errorMessage;
    public table: any;

    public fecha;
    public date;

    public nit;
    public empresaHabilitadaCupo = null;

    public tarjetaOperacion: VhloTpTarjetaOperacion;

    public tarjetasOperacion;

    public formIndex = true;
    public formSearch: any;
    public formNew = false;
    public formEdit = false;

    constructor(
        private _VhloTpTarjetaOperacionService: VhloTpTarjetaOperacionService,
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
        /* this._VhloTpTarjetaOperacionService.index().subscribe(
            response => {
                this.tarjetasOperacion = response.data;
                let timeoutId = setTimeout(() => {
                    this.onInitTable();
                }, 100);
            },
            error => {
                this.errorMessage = <any>error;

                if (this.errorMessage != null) {
                    console.log(this.errorMessage);
                    alert("Error en la petición");
                }
            }
        ); */

        if (this.empresaHabilitadaCupo != null) {
            let token = this._LoginService.getToken();

            this._VhloTpTarjetaOperacionService.searchTarjetasOperacion({ 'idEmpresa': this.empresaHabilitadaCupo.id }, token).subscribe(
                response => {
                    if (response.code == 200) {
                        this.tarjetasOperacion = response.data;
                        this.formIndex = true;

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
        console.log(this.empresaHabilitadaCupo);
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
                    title: 'Nombre Empresa: ' + this.empresaHabilitadaCupo.empresa.nombre,
                    messageTop: 'Nit: ' + this.empresaHabilitadaCupo.empresa.nit,
                    extend: 'excel',
                    text: 'Excel',
                    filename: 'Reporte_tarjetasOperacion_' + this.empresaHabilitadaCupo.empresa.nombre + '_' + this.fecha,
                    exportOptions: {
                        columns: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17]
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

    onNew(empresaHabilitadaCupo: any) {
        this.empresaHabilitadaCupo = empresaHabilitadaCupo;
        this.onInitForms();
        this.formSearch = true;
        this.formNew = true;
    }

    ready(isCreado: any) {
        if (isCreado) {
            this.ngOnInit();
        }
    }

    onSearchEmpresa() {
        let token = this._LoginService.getToken();
        this._VhloTpTarjetaOperacionService.searchEmpresaTransporte(this.nit, token).subscribe(
            response => {
                if (response.code == 200) {
                    this.empresaHabilitadaCupo = response.data;

                    this._VhloTpTarjetaOperacionService.searchTarjetasOperacion({ 'idEmpresa': this.empresaHabilitadaCupo.id }, token).subscribe(
                        response => {
                            if (response.code == 200) {
                                this.tarjetasOperacion = response.data;

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

                this._VhloTpTarjetaOperacionService.delete({ 'id': id }, token).subscribe(
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
    
    onEdit(empresaHabiltiadaCupo: any, tarjetaOperacion: any) {
        this.tarjetaOperacion = tarjetaOperacion;
        this.empresaHabilitadaCupo = this.empresaHabilitadaCupo;
        this.formEdit = true;
        this.formIndex = false;
    }
}

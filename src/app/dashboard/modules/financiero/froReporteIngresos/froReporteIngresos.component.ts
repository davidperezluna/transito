import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { FroReporteIngresos } from "./froReporteIngresos.modelo";
import { FroReporteIngresosService } from '../../../../services/froReporteIngresos.service';
import { FroCfgTipoRecaudoService } from "../../../../services/froCfgTipoRecaudo.service";
import { PnalFuncionarioService } from "../../../../services/pnalFuncionario.service";
import { CfgOrganismoTransitoService } from "../../../../services/cfgOrganismoTransito.service";
import { LoginService } from '../../../../services/login.service';

import swal from 'sweetalert2';

import { DatePipe, CurrencyPipe } from '@angular/common';

declare var $: any;

@Component({
    selector: 'app-index',
    templateUrl: './froReporteIngresos.component.html',
    providers: [DatePipe]
})

export class FroReporteIngresosComponent implements OnInit {
    public errorMessage;
    public reporteIngresoss;
    public formNew = false;
    public formEdit = false;
    public formIndex = true;
    public table: any;
    public tiposRecaudo;
    public tipoRecaudoSelected;
    public froReporteIngresos: FroReporteIngresos;
    public fecha;
    public date;
    public tablaTramites = false;
    public tablaComparendos = false;
    public tablaRetefuente = false;
    public tablaCobroCoactivo = false;
    public tablaAcuerdosPago = false;

    public organismoTransitoSelected;
    public organismosTransito;

    public tramitesPagados;
    public tramitesNoPagados;
    public dataTramites = [];
    public cantPagados;
    public cantNoPagados;

    public comparendos;
    public totalComparendos;

    public tipoArchivoTramite;
    public tipoArchivo;
    public nombreOrganismoTransito;

    //variables para las infracciones
    public infracciones: any = null;
    public totalInfracciones;

    //variables para las inmovilizaciones
    public inmovilizaciones: any = null;
    public totalInmovilizaciones;


    //variables para retefuente
    public arrayRetefuentesExogena: any = null;
    public totalRetefuente;
    public totalRetefuentesExogena;

    //variables para retefuente
    public arrayRetefuentesTesoreria: any = null;
    public totalRetefuentesTesoreria;

    public cobrosCoactivos;
    public totalCobroCoactivo;

    public acuerdosPago;
    public totalAcuerdosPago;

    public arrayExportar = [
        { value: 1, label: 'EXCEL' },
        { value: 2, label: 'PDF' },
    ];

    public exportarSelected;
    public funcionario = null;

    constructor(
        private _FroReporteIngresosService: FroReporteIngresosService,
        private _FroCfgTipoRecaudoService: FroCfgTipoRecaudoService,
        private _OrganismoTransitoService: CfgOrganismoTransitoService,
        private _PnalFuncionarioService: PnalFuncionarioService,
        private _LoginService: LoginService,
    ) { }

    ngOnInit() {
        this.froReporteIngresos = new FroReporteIngresos(null, null, null, null);

        this.date = new Date();
        var datePiper = new DatePipe(this.date);
        this.fecha = datePiper.transform(this.date, 'dd/MM/yyyy HH:mm:ss a');

        let token = this._LoginService.getToken();
        let identity = this._LoginService.getIdentity();

        this._PnalFuncionarioService.searchCargoByIdentificacion({ 'identificacion': identity.identificacion }, token).subscribe(
            response => {
                if (response.code == 200) {
                    this.funcionario = response.data;
                    console.log(this.funcionario);
                    this.organismoTransitoSelected = [this.funcionario.organismoTransito.id];
                } else {
                    swal({
                        title: response.title,
                        text: response.message,
                        type: response.status,
                        confirmButtonText: 'Aceptar'
                    });
                    error => {
                        this.errorMessage = <any>error;

                        if (this.errorMessage != null) {
                            console.log(this.errorMessage);
                            alert("Error en la petición");
                        }
                    }
                }
            }
        );

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
        this._FroCfgTipoRecaudoService.select().subscribe(
            response => {
                this.tiposRecaudo = response;
            },
            error => {
                this.errorMessage = <any>error;

                if (this.errorMessage != null) {
                    console.log(this.errorMessage);
                    alert("Error en la petición");
                }
            }
        );
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

    onInitTable(archivo: any) {
        if (this.table) {
            this.table.destroy();
        }

        this.date = new Date();
        var datePiper = new DatePipe(this.date);
        this.fecha = datePiper.transform(this.date, 'yyyy-MM-dd');

        if(archivo == 'exogena') {
            this.table = $('#dataTables-' + archivo).DataTable({
                responsive: true,
                pageLength: 8,
                sPaginationType: 'full_numbers',
                dom: 'Bfrtip',
                buttons: [
                    {
                        title: 'Reporte Exógena_' + this.nombreOrganismoTransito,
                        messageBottom: 'TOTAL: ' + this.totalRetefuentesExogena,
                        extend: 'excel',
                        text: 'Excel',
                        filename: 'Reporte_Exógena_' + this.nombreOrganismoTransito + '_' + this.fecha,
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
        } else if(archivo == 'tesoreria') {
            this.table = $('#dataTables-' + archivo).DataTable({
                responsive: true,
                pageLength: 8,
                sPaginationType: 'full_numbers',
                dom: 'Bfrtip',
                buttons: [
                    {
                        title: 'Reporte Tesorería_' + this.nombreOrganismoTransito,
                        messageBottom: 'TOTAL: ' + this.totalRetefuentesTesoreria,
                        extend: 'excel',
                        text: 'Excel',
                        filename: 'Reporte_Tesorería_' + this.nombreOrganismoTransito + '_' + this.fecha,
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
        } else if(archivo == 'infracciones') {
            if (this.funcionario.excel == true) {
                this.table = $('#dataTables-' + archivo).DataTable({
                    responsive: true,
                    pageLength: 8,
                    sPaginationType: 'full_numbers',
                    dom: 'Bfrtip',
                    buttons: [
                        {
                            title: 'Reporte Infracciones_' + this.nombreOrganismoTransito,
                            messageBottom: 'TOTAL: ' + this.totalInfracciones,
                            extend: 'excel',
                            text: 'Excel',
                            filename: 'Reporte_Infracciones_' + this.nombreOrganismoTransito + '_' + this.fecha,
                        },
                        {
                            title: 'Reporte Infracciones_' + this.nombreOrganismoTransito,
                            messageBottom: 'TOTAL: ' + this.totalInfracciones,
                            extend: 'pdfHtml5',
                            orientation: 'landscape',
                            text: 'PDF',
                            filename: 'Reporte_Infracciones_' + this.nombreOrganismoTransito + '_' + this.fecha,
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
            } else {
                this.table = $('#dataTables-' + archivo).DataTable({
                    responsive: true,
                    pageLength: 8,
                    sPaginationType: 'full_numbers',
                    dom: 'Bfrtip',
                    buttons: [
                        {
                            title: 'Reporte Infracciones_' + this.nombreOrganismoTransito,
                            messageBottom: 'TOTAL: ' + this.totalInfracciones,
                            extend: 'pdfHtml5',
                            text: 'PDF',
                            filename: 'Reporte_Infracciones_' + this.nombreOrganismoTransito + '_' + this.fecha,
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
        } else if(archivo == 'acuerdosPago') {
            if (this.funcionario.excel == true) {
                this.table = $('#dataTables-' + archivo).DataTable({
                    responsive: true,
                    pageLength: 8,
                    sPaginationType: 'full_numbers',
                    dom: 'Bfrtip',
                    buttons: [
                        {
                            title: 'Reporte Acuerdo_Pago_' + this.nombreOrganismoTransito,
                            messageBottom: 'TOTAL: ' + this.totalAcuerdosPago,
                            extend: 'excel',
                            text: 'Excel',
                            filename: 'Reporte_Acuerdo_Pago_' + this.nombreOrganismoTransito + '_' + this.fecha,
                        },
                        {
                            title: 'Reporte Acuerdo_Pago_' + this.nombreOrganismoTransito,
                            messageBottom: 'TOTAL: ' + this.totalAcuerdosPago,
                            extend: 'pdfHtml5',
                            text: 'PDF',
                            filename: 'Reporte_Acuerdo_Pago_' + this.nombreOrganismoTransito + '_' + this.fecha,
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
            } else {
                this.table = $('#dataTables-' + archivo).DataTable({
                    responsive: true,
                    pageLength: 8,
                    sPaginationType: 'full_numbers',
                    dom: 'Bfrtip',
                    buttons: [
                        {
                            title: 'Reporte Acuerdo_Pago_' + this.nombreOrganismoTransito,
                            messageBottom: 'TOTAL: ' + this.totalAcuerdosPago,
                            extend: 'pdfHtml5',
                            text: 'PDF',
                            filename: 'Reporte_Acuerdo_Pago_' + this.nombreOrganismoTransito + '_' + this.fecha,
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
        } else if(archivo == 'parqueadero') {
            if(this.funcionario.excel == true){
                this.table = $('#dataTables-' + archivo).DataTable({
                    responsive: true,
                    pageLength: 8,
                    sPaginationType: 'full_numbers',
                    dom: 'Bfrtip',
                    buttons: [
                        {
                            title: 'Reporte Parqueadero_' + this.nombreOrganismoTransito,
                            messageBottom: 'TOTAL: ' + this.totalInmovilizaciones,
                            extend: 'excel',
                            text: 'Excel',
                            filename: 'Reporte_Parqueadero_' + this.nombreOrganismoTransito + '_' + this.fecha,
                        },
                        {
                            title: 'Reporte Parqueadero_' + this.nombreOrganismoTransito,
                            messageBottom: 'TOTAL: ' + this.totalInmovilizaciones,
                            extend: 'pdfHtml5',
                            text: 'PDF',
                            filename: 'Reporte_Parqueadero_' + this.nombreOrganismoTransito + '_' + this.fecha,
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
            } else {
                this.table = $('#dataTables-' + archivo).DataTable({
                    responsive: true,
                    pageLength: 8,
                    sPaginationType: 'full_numbers',
                    dom: 'Bfrtip',
                    buttons: [
                        {
                            title: 'Reporte Parqueadero_' + this.nombreOrganismoTransito,
                            messageBottom: 'TOTAL: ' + this.totalInmovilizaciones,
                            extend: 'pdfHtml5',
                            text: 'PDF',
                            filename: 'Reporte_Parqueadero_' + this.nombreOrganismoTransito + '_' + this.fecha,
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
        }
    }

    onNew() {
        this.formNew = true;
        this.formIndex = false;
        if (this.table) {
            this.table.destroy();
        }
    }

    ready(isCreado: any) {
        if (isCreado) {
            this.formNew = false;
            this.formEdit = false;
            this.formIndex = true;
            this.ngOnInit();
        }
    }

    onEnviar() {
        let token = this._LoginService.getToken();
        let identity = this._LoginService.getIdentity();

        this.froReporteIngresos.idOrganismoTransito = this.organismoTransitoSelected;
        this.froReporteIngresos.idTipoRecaudo = this.tipoRecaudoSelected;

        let datos = { 
            'identificacion': identity.identificacion, 
            'filtros': this.froReporteIngresos, 
            'tipoArchivoTramite': this.tipoArchivoTramite, 
            'exportarEn': this.exportarSelected 
        };

        if (this.tipoRecaudoSelected == 1) {
            this._FroReporteIngresosService.pdfTramiteByFecha(datos, token).subscribe(
                response => {
                    console.log(response);
                    if(response.type){
                        var fileURL = URL.createObjectURL(response);
                        window.open(fileURL);
                    } else {
                        swal({
                            title: 'Error!',
                            text: 'No existen registros para la generación de reportes en el rango de las fechas estipuladas.',
                            type: 'error',
                            confirmButtonText: 'Aceptar'
                        });
                        error => {
                            this.errorMessage = <any>error;

                            if (this.errorMessage != null) {
                                console.log(this.errorMessage);
                                alert("Error en la petición");
                            }
                        }
                    }
                }
            );
        } else if (this.tipoRecaudoSelected == 2) {
            this._FroReporteIngresosService.pdfInfraccionByFecha(this.froReporteIngresos, token).subscribe(
                response => {
                    if(response.code = 200){
                        console.log(response);
                        this.nombreOrganismoTransito = null;
                        this.nombreOrganismoTransito = response.data.organismoTransito.nombre;
                        this.infracciones = response.data.arrayInfracciones;
                        this.totalInfracciones = response.data.totalInfracciones;
                        swal({
                            title: 'Perfecto!',
                            text: 'Registros encontrados',
                            type: 'success',
                            confirmButtonText: 'Aceptar'
                        });

                        /* var fileURL = URL.createObjectURL(response);
                        window.open(fileURL); */

                        if (this.table) {
                            this.table.destroy();
                        }

                        let timeoutId = setTimeout(() => {
                            this.onInitTable('infracciones');
                        }, 100);
                    } else {
                        swal({
                            title: 'Error!',
                            text: 'No existen registros para la generación de reportes en el rango de las fechas estipuladas.',
                            type: 'error',
                            confirmButtonText: 'Aceptar'
                        });
                        error => {
                            this.errorMessage = <any>error;

                            if (this.errorMessage != null) {
                                console.log(this.errorMessage);
                                alert("Error en la petición");
                            }
                        }
                    }
                }
            );
        } else if (this.tipoRecaudoSelected == 3) {
            this._FroReporteIngresosService.pdfAcuerdoPagoByFecha(this.froReporteIngresos, token).subscribe(
                response => {
                    if(response.code == 200){
                        this.nombreOrganismoTransito = null;
                        this.nombreOrganismoTransito = response.data.organismoTransito.nombre;
                        this.acuerdosPago = response.data.arrayAcuerdosPago;
                        this.totalAcuerdosPago = response.data.totalAcuerdosPago;
                        swal({
                            title: 'Perfecto!',
                            text: 'Registros encontrados',
                            type: 'success',
                            confirmButtonText: 'Aceptar'
                        });

                        /* var fileURL = URL.createObjectURL(response);
                        window.open(fileURL); */
                        if (this.table) {
                            this.table.destroy();
                        }

                        let timeoutId = setTimeout(() => {
                            this.onInitTable('acuerdosPago');
                        }, 100);
                    } else {
                        swal({
                            title: 'Error!',
                            text: 'No existen registros para la generación de reportes en el rango de las fechas estipuladas.',
                            type: 'error',
                            confirmButtonText: 'Aceptar'
                        });
                        error => {
                            this.errorMessage = <any>error;

                            if (this.errorMessage != null) {
                                console.log(this.errorMessage);
                                alert("Error en la petición");
                            }
                        }
                    }
                }
            );
        } else if (this.tipoRecaudoSelected == 4) {
            this._FroReporteIngresosService.pdfRetefuenteByFecha({ 'datos': this.froReporteIngresos, 'tipoArchivo': this.tipoArchivo }, token).subscribe(
                response => {
                    if (response.status == 'success') {
                        swal({
                            title: 'Perfecto!',
                            text: response.message,
                            type: 'success',
                            confirmButtonText: 'Aceptar'
                        });

                        if (response.dataExogena) {
                            //reinicio de variables
                            this.nombreOrganismoTransito = null;
                            this.arrayRetefuentesTesoreria = null;
                            this.totalRetefuentesTesoreria = null;

                            //reporte para retención exógena
                            this.nombreOrganismoTransito = response.dataExogena.organismoTransito.nombre;
                            this.arrayRetefuentesExogena = response.dataExogena.arrayRetefuentesExogena;
                            this.totalRetefuentesExogena = response.dataExogena.totalRetefuentesExogena;

                            console.log(this.arrayRetefuentesExogena);

                            if (this.table) {
                                this.table.destroy();
                            }

                            let timeoutId = setTimeout(() => {
                                this.onInitTable('exogena');
                            }, 100);
                        } else {
                            //reinicio de variables
                            this.nombreOrganismoTransito = null;
                            this.arrayRetefuentesExogena = null;
                            this.totalRetefuentesExogena = null;

                            //para reporte tesoreria
                            this.nombreOrganismoTransito = response.dataTesoreria.organismoTransito.nombre;
                            this.arrayRetefuentesTesoreria = response.dataTesoreria.arrayRetefuentesTesoreria;
                            this.totalRetefuentesTesoreria = response.dataTesoreria.totalRetefuentesTesoreria;

                            if (this.table) {
                                this.table.destroy();
                            }
                            let timeoutId = setTimeout(() => {
                                this.onInitTable('tesoreria');
                            }, 100);

                        }
                    } else {
                        if (this.table) {
                            this.table.destroy();
                        }

                        this.arrayRetefuentesExogena = null;
                        this.arrayRetefuentesTesoreria = null;

                        swal({
                            title: 'Error!',
                            text: response.message,
                            type: 'error',
                            confirmButtonText: 'Aceptar'
                        });
                        error => {
                            this.errorMessage = <any>error;

                            if (this.errorMessage != null) {
                                console.log(this.errorMessage);
                                alert("Error en la petición");
                            }
                        }
                    }
                }
            );
        } else if (this.tipoRecaudoSelected == 5) {
            this._FroReporteIngresosService.pdfParqueaderoByFecha(this.froReporteIngresos, token).subscribe(
                response => {
                    if(response.code == 200){
                        this.nombreOrganismoTransito = null;
                        this.nombreOrganismoTransito = response.data.organismoTransito.nombre;
                        this.inmovilizaciones = response.data.arrayInmovilizaciones;
                        this.totalInmovilizaciones = response.data.totalInmovilizaciones;

                        swal({
                            title: 'Perfecto!',
                            text: 'Registros encontrados',
                            type: 'success',
                            confirmButtonText: 'Aceptar'
                        });

                        /* var fileURL = URL.createObjectURL(response);
                        window.open(fileURL); */

                    if (this.table) {
                        this.table.destroy();
                    }

                    let timeoutId = setTimeout(() => {
                        this.onInitTable('parqueadero');
                    }, 100);
                        
                    } else {
                        swal({
                            title: 'Error!',
                            text: 'No existen registros para la generación de reportes en el rango de las fechas estipuladas.',
                            type: 'error',
                            confirmButtonText: 'Aceptar'
                        });
                        error => {
                            this.errorMessage = <any>error;

                            if (this.errorMessage != null) {
                                console.log(this.errorMessage);
                                alert("Error en la petición");
                            }
                        }
                    }
                }
            );
        } 
    }
}

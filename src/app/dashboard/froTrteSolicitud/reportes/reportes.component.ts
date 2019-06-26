import { Component, OnInit } from '@angular/core';
import { FroTrteSolicitudReporteService } from '../../../services/froTrteSolicitudReporte.service';
import { CfgModuloService } from "../../../services/cfgModulo.service";
import { CfgOrganismoTransitoService } from "../../../services/cfgOrganismoTransito.service";
import { LoginService } from '../../../services/login.service';

import swal from 'sweetalert2';
declare var $: any;

@Component({
    selector: 'app-reportes',
    templateUrl: './reportes.component.html'
})

export class ReportesComponent implements OnInit {
    public errorMessage;

    public tramitesSolicitud: any = null;
    public propietariosActuales: any = null;
    public tramites: any = null;
    public medidasCautelares: any = null;
    public cancelacionesMatricula: any = null;
    public prendas: any = null;
    public radicadosCuenta: any = null;

    public organismoTransitoSelected;
    public organismosTransito;

    public moduloSelected;
    public modulos;

    public fechaDesde;
    public fechaHasta;

    public formSearch: any;

    public tableVehiculos: any;
    public tablePropietariosActuales: any;
    public tableTramites: any;
    public tableMedidaCautelar: any;
    public tableCancelacionMatricula: any;
    public tablePrendas: any;
    public tableRadicadoCuenta: any;

    public tipoReporteSelected;
    public tiposReporte = [
        { value: '1', label: 'VEHICULOS' },
        { value: '2', label: 'PROPIETARIOS ACTUALES' },
        { value: '3', label: 'TRAMITES' },
        { value: '4', label: 'MEDIDA CAUTELAR' },
        { value: '5', label: 'CANCELACIÓN MATRICULA' },
        { value: '6', label: 'PRENDAS' },
        { value: '7', label: 'RADICADOS DE CUENTA' },
    ];

    public datos = {
        'placa': null,
        'idModulo': null,
        'idOrganismoTransito': null,
        'fechaDesde': null,
        'fechaHasta': null,
        'tipoReporte': null,
    };

    constructor(
        private _TrteSolicitudReporteService: FroTrteSolicitudReporteService,

        private _OrganismoTransitoService: CfgOrganismoTransitoService,
        private _ModuloService: CfgModuloService,

        private _LoginService: LoginService,
    ) { }

    ngOnInit() {
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
        this._ModuloService.select().subscribe(
            response => {
                this.modulos = response;
            },
            error => {
                this.errorMessage = <any>error;

                if (this.errorMessage != null) {
                    console.log(this.errorMessage);
                    alert("Error en la petición");
                }
            }
        );

        this.onInitForms();
    }

    onInitForms() {
        this.formSearch = true;
    }

    onInitDatatables() {
        this.tramitesSolicitud = null;
        this.propietariosActuales = null;
        this.tramites = null;
        this.cancelacionesMatricula = null;
        this.medidasCautelares = null;
        this.prendas = null;
        this.radicadosCuenta = null;


        if (this.tableVehiculos) {
            this.tableVehiculos.destroy();
        }

        if (this.tablePropietariosActuales) {
            this.tablePropietariosActuales.destroy();
        }

        if (this.tableTramites) {
            this.tableTramites.destroy();
        }

        if (this.tableMedidaCautelar) {
            this.tableMedidaCautelar.destroy();
        }

        if (this.tableCancelacionMatricula) {
            this.tableCancelacionMatricula.destroy();
        }

        if (this.tablePrendas) {
            this.tablePrendas.destroy();
        }
        if (this.tableRadicadoCuenta) {
            this.tableRadicadoCuenta.destroy();
        }
    }

    onInitTable(estado) {
        switch (estado) {
            case 'vehiculos':
                this.tableVehiculos = $('#table-vehiculos').DataTable({
                    responsive: true,
                    pageLength: 10,
                    sPaginationType: 'full_numbers',
                    dom: 'Bfrtip',
                    buttons: [
                        {
                            title: 'reporte',
                            extend: 'csvHtml5',
                            text: 'csv',
                            charset: 'utf-8',
                            filename: 'Reporte_' + this.tipoReporteSelected,
                            bom: true,
                            exportOptions: {
                                charset: 'utf-8',
                            }
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
                break;

            case 'propietarios-actuales':
                this.tablePropietariosActuales = $('#table-propietarios-actuales').DataTable({
                    responsive: true,
                    pageLength: 10,
                    sPaginationType: 'full_numbers',
                    dom: 'Bfrtip',
                    buttons: [
                        {
                            title: 'reporte',
                            extend: 'csvHtml5',
                            text: 'csv',
                            charset: 'utf-8',
                            filename: 'Reporte_' + this.tipoReporteSelected,
                            bom: true,
                            exportOptions: {
                                charset: 'utf-8',
                            }
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
                break;

            case 'tramites':
                this.tableTramites = $('#table-tramites').DataTable({
                    responsive: true,
                    pageLength: 10,
                    sPaginationType: 'full_numbers',
                    dom: 'Bfrtip',
                    buttons: [
                        {
                            title: 'reporte',
                            extend: 'csvHtml5',
                            text: 'csv',
                            charset: 'utf-8',
                            filename: 'Reporte_' + this.tipoReporteSelected,
                            bom: true,
                            exportOptions: {
                                charset: 'utf-8',
                            }
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
                break;

            case 'medidas-cautelares':
                this.tableMedidaCautelar = $('#table-medidas-cautelares').DataTable({
                    responsive: true,
                    pageLength: 10,
                    sPaginationType: 'full_numbers',
                    dom: 'Bfrtip',
                    buttons: [
                        {
                            title: 'reporte',
                            extend: 'csvHtml5',
                            text: 'csv',
                            charset: 'utf-8',
                            filename: 'Reporte_' + this.tipoReporteSelected,
                            bom: true,
                            exportOptions: {
                                charset: 'utf-8',
                            }
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
                break;

            case 'cancelaciones-matricula':
                this.tableCancelacionMatricula = $('#table-cancelaciones-matricula').DataTable({
                    responsive: true,
                    pageLength: 10,
                    sPaginationType: 'full_numbers',
                    dom: 'Bfrtip',
                    buttons: [
                        {
                            title: 'reporte',
                            extend: 'csvHtml5',
                            text: 'csv',
                            charset: 'utf-8',
                            filename: 'Reporte_' + this.tipoReporteSelected,
                            bom: true,
                            exportOptions: {
                                charset: 'utf-8',
                            }
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
                break;

            case 'prendas':
                this.tablePrendas = $('#table-prendas').DataTable({
                    responsive: true,
                    pageLength: 10,
                    sPaginationType: 'full_numbers',
                    dom: 'Bfrtip',
                    buttons: [
                        {
                            title: 'reporte',
                            extend: 'csvHtml5',
                            text: 'csv',
                            charset: 'utf-8',
                            filename: 'Reporte_' + this.tipoReporteSelected,
                            bom: true,
                            exportOptions: {
                                charset: 'utf-8',
                            }
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
                break;

            case 'radicados-cuenta':
                this.tableRadicadoCuenta = $('#table-radicados-cuenta').DataTable({
                    responsive: true,
                    pageLength: 10,
                    sPaginationType: 'full_numbers',
                    dom: 'Bfrtip',
                    buttons: [
                        {
                            title: 'reporte',
                            extend: 'csvHtml5',
                            text: 'csv',
                            charset: 'utf-8',
                            filename: 'Reporte_' + this.tipoReporteSelected,
                            bom: true,
                            exportOptions: {
                                charset: 'utf-8',
                            }
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
                break;
        }
    }

    ready(isCreado: any) {
        if (isCreado) {
            this.formSearch = true;
        }
    }

    onEnviar() {
        let token = this._LoginService.getToken();

        this.datos.idModulo = this.moduloSelected;
        this.datos.idOrganismoTransito = this.organismoTransitoSelected;
        this.datos.tipoReporte = this.tipoReporteSelected;

        swal({
            title: 'Buscando vehículo',
            text: 'Solo tardará unos segundos, por favor espere.',
            onOpen: () => {
                swal.showLoading()
            }
        });
        if (this.tipoReporteSelected) {
            this._TrteSolicitudReporteService.searchByFiltros(this.datos, token).subscribe(
                response => {
                    if (response.status == 'success') {
                        if (response.tramitesSolicitud) {
                            this.onInitDatatables();

                            this.tramitesSolicitud = response.tramitesSolicitud;

                            let estado = 'vehiculos';

                            let timeoutId = setTimeout(() => {
                                this.onInitTable(estado);
                            }, 100);
                        } else if (response.propietariosActuales) {
                            this.onInitDatatables();
                            this.propietariosActuales = response.propietariosActuales;

                            let estado = 'propietarios-actuales';

                            let timeoutId = setTimeout(() => {
                                this.onInitTable(estado);
                            }, 100);
                        } else if (response.tramites) {
                            this.onInitDatatables();
                            this.tramites = response.tramites;

                            let estado = 'tramites';

                            let timeoutId = setTimeout(() => {
                                this.onInitTable(estado);
                            }, 100);
                        } else if (response.medidasCautelares) {
                            this.onInitDatatables();
                            this.medidasCautelares = response.medidasCautelares;

                            let estado = 'medidas-cautelares';

                            let timeoutId = setTimeout(() => {
                                this.onInitTable(estado);
                            }, 100);
                        } else if (response.cancelacionesMatricula) {
                            this.onInitDatatables();
                            this.cancelacionesMatricula = response.cancelacionesMatricula;

                            let estado = 'cancelaciones-matricula';

                            let timeoutId = setTimeout(() => {
                                this.onInitTable(estado);
                            }, 100);
                        } else if (response.prendas) {
                            this.onInitDatatables();
                            this.prendas = response.prendas;
                            console.log(this.prendas);

                            let estado = 'prendas';

                            let timeoutId = setTimeout(() => {
                                this.onInitTable(estado);
                            }, 100);
                        } else if (response.radicadosCuenta) {
                            this.onInitDatatables();
                            this.radicadosCuenta = response.radicadosCuenta;

                            let estado = 'radicados-cuenta';

                            let timeoutId = setTimeout(() => {
                                this.onInitTable(estado);
                            }, 100);
                        }
                        swal({
                            title: 'Perfecto!',
                            text: response.message,
                            type: 'success',
                            confirmButtonText: 'Aceptar'
                        });
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
}
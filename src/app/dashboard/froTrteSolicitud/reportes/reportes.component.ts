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
    
    public formHistorial = false;
    public formFiltros = true;
    
    public table: any;
    
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
    }

    onInitTable(estado) {
        if (this.table) {
            this.table.destroy();
        }

        this.table = $('#dataTables-'+ estado).DataTable({
            responsive: false,
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
    
    ready(isCreado: any) {
        if (isCreado) {
            this.formHistorial = false;
            this.formFiltros = true;
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
                        if(response.tramitesSolicitud) {
                            this.tramitesSolicitud = response.tramitesSolicitud;
                            
                            this.propietariosActuales = null;
                            this.tramites = null;
                            this.medidasCautelares = null;
                            this.cancelacionesMatricula = null;
                            this.prendas = null;
                            this.radicadosCuenta = null;

                            let estado = 'vehiculo';
                            let timeoutId = setTimeout(() => {
                                this.onInitTable(estado);
                            }, 100);
                        } else if(response.propietariosActuales) {
                            this.propietariosActuales = response.propietariosActuales;

                            this.tramitesSolicitud = null;
                            this.tramites = null;
                            this.medidasCautelares = null;
                            this.cancelacionesMatricula = null;
                            this.prendas = null;
                            this.radicadosCuenta = null;

                            let estado = 'propietarios-actuales';
                            let timeoutId = setTimeout(() => {
                                this.onInitTable(estado);
                            }, 100);
                        } else if(response.tramites) {
                            this.tramites = response.tramites;

                            this.tramitesSolicitud = null;
                            this.propietariosActuales = null;
                            this.medidasCautelares = null;
                            this.cancelacionesMatricula = null;
                            this.prendas = null;
                            this.radicadosCuenta = null;

                            let estado = 'tramites';
                            let timeoutId = setTimeout(() => {
                                this.onInitTable(estado);
                            }, 100);
                        } else if(response.medidasCautelares) {
                            this.medidasCautelares = response.medidasCautelares;
                    
                            this.tramitesSolicitud = null;
                            this.propietariosActuales = null;
                            this.tramites = null;
                            this.cancelacionesMatricula = null;
                            this.prendas = null;
                            this.radicadosCuenta = null;

                            let estado = 'medidas-cautelares';
                            let timeoutId = setTimeout(() => {
                                this.onInitTable(estado);
                            }, 100);
                        } else if(response.cancelacionesMatricula) {
                            this.cancelacionesMatricula = response.cancelacionesMatricula;
                            console.log(this.cancelacionesMatricula);
                            
                            this.tramitesSolicitud = null;
                            this.propietariosActuales = null;
                            this.tramites = null;
                            this.medidasCautelares = null;
                            this.prendas = null;
                            this.radicadosCuenta = null;

                            let estado = 'cancelaciones-matricula';
                            let timeoutId = setTimeout(() => {
                                this.onInitTable(estado);
                            }, 100);
                        } else if(response.prendas) {
                            this.prendas = response.prendas;
                            console.log(this.prendas);

                            this.tramitesSolicitud = null;
                            this.propietariosActuales = null;
                            this.tramites = null;
                            this.cancelacionesMatricula = null;
                            this.medidasCautelares = null;
                            this.radicadosCuenta = null;

                            let estado = 'prendas';
                            let timeoutId = setTimeout(() => {
                                this.onInitTable(estado);
                            }, 100);
                        } else if(response.radicadosCuenta) {
                            this.radicadosCuenta = response.radicadosCuenta;
                            console.log(this.radicadosCuenta);

                            this.tramitesSolicitud = null;
                            this.propietariosActuales = null;
                            this.tramites = null;
                            this.cancelacionesMatricula = null;
                            this.medidasCautelares = null;
                            this.prendas = null;
                            
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
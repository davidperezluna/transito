import { Component, OnInit } from '@angular/core';
import { FroTrteSolicitudReporteService } from '../../../services/frotrtesolicitudreporte.service';
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

    public placa: any;
    public tramitesSolictud: any = null;

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
    ];

    public datos = {
        'placa': null,
        'idModulo': null,
        'idOrganismoTransito': null,
        'fechaDesde': null,
        'fechaHasta': null
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

    onInitTable() {
        if (this.table) {
            this.table.destroy();
        }

        this.table = $('#dataTables-example').DataTable({
            responsive: false,
            pageLength: 10,
            sPaginationType: 'full_numbers',
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
            /* this.onSearch(); */
        }
    }

    onEnviar() {
        let token = this._LoginService.getToken();
        
        this.datos.idModulo = this.moduloSelected;
        this.datos.idOrganismoTransito = this.organismoTransitoSelected;

        swal({
            title: 'Buscando vehículo',
            text: 'Solo tardará unos segundos, por favor espere.',
            onOpen: () => {
                swal.showLoading()
            }
        });
        if (this.tipoReporteSelected == 1) {
            this._TrteSolicitudReporteService.searchByPlaca(this.datos, token).subscribe(
                response => {
                    console.log(response);
                    if (response.status == 'success') {
                        this.tramitesSolictud = response.data;
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
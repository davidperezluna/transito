import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { FroReporteIngresosService } from '../../services/froReporteIngresos.service';
import { LoginService } from '../../services/login.service';
import { FroReporteIngresos } from "./froReporteIngresos.modelo";
import { FroCfgTipoRecaudoService } from "../../services/froCfgTipoRecaudo.service";
import { CfgOrganismoTransitoService } from "../../services/cfgOrganismoTransito.service";

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
    
    public retefuentes;
    public totalRetefuente;
    
    public cobrosCoactivos;
    public totalCobroCoactivo;
    
    public acuerdosPago;
    public totalAcuerdosPago;
    
    public tipoPersonaSelected;
    public tiposPersona = [
        { value: 'PERSONA NATURAL', label: 'PERSONA NATURAL' },
        { value: 'PERSONA JURIDICA', label: 'PERSONA JURIDICA' },
    ];

    constructor(
        private _FroReporteIngresosService: FroReporteIngresosService,
        private _FroCfgTipoRecaudoService: FroCfgTipoRecaudoService,
        private _OrganismoTransitoService: CfgOrganismoTransitoService,

        private _LoginService: LoginService,
    ) { }

    ngOnInit() {
        this.froReporteIngresos = new FroReporteIngresos(null, null, null, null, null);

        this.date = new Date();
        var datePiper = new DatePipe(this.date);
        this.fecha = datePiper.transform(this.date, 'dd/MM/yyyy HH:mm:ss a');

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

    onInitTable() {
            if(this.table) {
                this.table.destroy();

            this.table = $('#DateTables').DataTable({
                responsive: true,
                pageLength: 8,
                sPaginationType: 'full_numbers',
                buttons: [
                    {
                        extend: 'excel',
                        text: 'Excel',
                        title: 'xls',
                        filename: 'Reporte_Ingresos' + this.fecha,
                    },
                    {
                        extend: 'pdfHtml5',
                        orientation: 'landscape',
                        pageSize: 'LEGAL',
                        filename: 'Reporte_IngresosPDF_' + this.fecha,
                    }
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

    onEnviar(){
        let token = this._LoginService.getToken();
        let identity = this._LoginService.getIdentity();

        this.froReporteIngresos.idOrganismoTransito = this.organismoTransitoSelected;
        this.froReporteIngresos.idTipoPersona = this.tipoPersonaSelected;
        this.froReporteIngresos.idTipoRecaudo = this.tipoRecaudoSelected;

        if(this.tipoRecaudoSelected == 1){
            this._FroReporteIngresosService.pdfTramiteByFecha({ 'identificacion': identity.identificacion, 'filtros':this.froReporteIngresos }, token).subscribe(
                response => {
                    var fileURL = URL.createObjectURL(response);
                    window.open(fileURL);
                } 
            ); 
        } else if(this.tipoRecaudoSelected == 2) {
            this._FroReporteIngresosService.getComparendoByFecha(this.froReporteIngresos, token).subscribe(
                response => {
                    var fileURL = URL.createObjectURL(response);
                    window.open(fileURL);
                }
            );
        } else if (this.tipoRecaudoSelected == 3) {
            this._FroReporteIngresosService.getAcuerdoPagoByFecha(this.froReporteIngresos, token).subscribe(
                response => {
                    var fileURL = URL.createObjectURL(response);
                    window.open(fileURL);
                }
            );
        } else if (this.tipoRecaudoSelected == 4) {
            this._FroReporteIngresosService.getParqueaderoByFecha(this.froReporteIngresos, token).subscribe(
                response => {
                    var fileURL = URL.createObjectURL(response);
                    window.open(fileURL);
                }
            );
        } else if (this.tipoRecaudoSelected == 5) {
            this._FroReporteIngresosService.getRetefuenteByFecha(this.froReporteIngresos, token).subscribe(
                response => {
                    var fileURL = URL.createObjectURL(response);
                    window.open(fileURL);
                }
            );
        }
    }
}

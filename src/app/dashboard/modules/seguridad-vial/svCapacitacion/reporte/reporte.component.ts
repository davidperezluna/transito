import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SvCapacitacionService } from '../../../../../services/svCapacitacion.service';

import { CfgMunicipioService } from '../../../../../services/cfgMunicipio.service';

import { SvCfgFuncionService } from '../../../../../services/svCfgFuncion.service';
import { SvCfgFuncionCriterioService } from '../../../../../services/svCfgFuncionCriterio.service';
import { SvCfgClaseActorViaService } from '../../../../../services/svCfgClaseActorVia.service';

import { LoginService } from '../../../../../services/login.service';
import { DatePipe } from '@angular/common';

import swal from 'sweetalert2';
declare var $: any;

@Component({
    selector: 'app-reporte-svcapacitacion',
    templateUrl: './reporte.component.html',
    providers: [DatePipe]
})

export class ReporteComponent implements OnInit {
    @Output() ready = new EventEmitter<any>();
    public errorMessage;

    public formIndex = true;

    public municipios: any;
    public funciones: any;
    public funcionesCriterios: any;
    public clasesActoresVia: any;

    public capacitaciones: any;
    public capacitacionesEncontradas: any;
    
    public table: any = null;

    public date: any;
    public fecha: any;

    public datos = {
        'fechaInicio': null,
        'fechaFin': null,
        'arrayMunicipios': null,
        'arrayFunciones': null,
        'arrayFuncionesCriterio': null,
        'arrayClasesActorVia': null,

    };

    constructor(
        private _LoginService: LoginService,
        private _CapacitacionService: SvCapacitacionService,
        private _MunicipioService: CfgMunicipioService,
        private _FuncionService: SvCfgFuncionService,
        private _FuncionCriterioService: SvCfgFuncionCriterioService,
        private _SvCfgClaseActorViaService: SvCfgClaseActorViaService,
    ) { }

    ngOnInit() {
        let token = this._LoginService.getToken();

        this._MunicipioService.select().subscribe(
            response => {
                this.municipios = response;
            },
            error => {
                this.errorMessage = <any>error;

                if (this.errorMessage != null) {
                    console.log(this.errorMessage);
                    alert("Error en la petición");
                }
            }
        );
        this._FuncionService.getFuncionSelect().subscribe(
            response => {
                this.funciones = response;
            },
            error => {
                this.errorMessage = <any>error;

                if (this.errorMessage != null) {
                    console.log(this.errorMessage);
                    alert("Error en la petición");
                }
            }
        );
        this._FuncionCriterioService.getFuncionCriterioSelect().subscribe(
            response => {
                this.funcionesCriterios = response;
            },
            error => {
                this.errorMessage = <any>error;

                if (this.errorMessage != null) {
                    console.log(this.errorMessage);
                    alert("Error en la petición");
                }
            }
        );
        this._SvCfgClaseActorViaService.getClaseActorViaSelect().subscribe(
            response => {
                this.clasesActoresVia = response;
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

        this.date = new Date();
        var datePiper = new DatePipe(this.date);
        this.fecha = datePiper.transform(this.date, 'yyyy-MM-dd');

        this.table = $('#dataTables-capacitacion').DataTable({
            responsive: true,
            pageLength: 8,
            sPaginationType: 'full_numbers',
            dom: 'Bfrtip',
            buttons: [
                {
                    title: 'Reporte Capacitaciones',
                    extend: 'excel',
                    text: 'Excel',
                    filename: 'Reporte_Capacitaciones_' + this.fecha,
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

    onEnviar() {
        let token = this._LoginService.getToken();
        this._CapacitacionService.buscarCapacitaciones(this.datos, token).subscribe(
            response => {
                if (response.code == 200) {
                    this.capacitaciones = response.data;
                    this.capacitacionesEncontradas = true;

                    let timeoutId = setTimeout(() => {
                        this.onInitTable();
                    }, 100);
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
                            alert('Error en la petición');
                        }
                    }
                }
            }
        );
    }
}
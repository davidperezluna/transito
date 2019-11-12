import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CfgOrganismoTransitoService } from '../../../../../services/cfgOrganismoTransito.service';
import { CvCdoComparendoService } from '../../../../../services/cvCdoComparendo.service';
import { LoginService } from '../../../../../services/login.service';
import { environment } from 'environments/environment';
declare var eventData: any;
import swal from 'sweetalert2';
declare var $: any;

@Component({
    selector: 'app-cvcdocomparendo-report',
    templateUrl: './report.component.html'
})

export class CvCdoComparendoReportComponent implements OnInit, AfterViewInit {
    public errorMessage;

    public docsUrl = environment.docsUrl;
    public organismosTransito;

    public comparendos: any = null;
    
    //variables para el reporte de infracciones
    public arrayNombreInfracciones: any = [];
    public arrayCantidadInfracciones: any = [];
    public graficaInfracciones = false;
    public barChartOptionsInfracciones: any;
    public barChartLabelsInfracciones: any;
    public barChartTypeInfracciones: any;
    public barChartLegendInfracciones: any;
    public barChartDataInfracciones: any = [];
    
    //variables para el reporte de edades
    public arrayNombreEdades: any = [];
    public arrayCantidadEdades: any = [];
    public graficaEdades = false;
    public barChartOptionsEdades: any;
    public barChartLabelsEdades: any;
    public barChartTypeEdades: any;
    public barChartLegendEdades: any;
    public barChartDataEdades: any = [];

    public tiposReporte = [
        { value: '1', label: 'INFRACCIONES' },
        { value: '2', label: 'EDAD' },
    ];

    public datos = {
        'tipoReporte': null,
        'idOrganismoTransito': null,
        'fechaInicial': null,
        'fechaFinal': null,
    }

    constructor(
        private _CvCdoComparendoService: CvCdoComparendoService,
        private _OrganismoTransitoService: CfgOrganismoTransitoService,
        private _LoginService: LoginService,
    ) { }

    ngOnInit() {
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

    ngAfterViewInit() {
        swal.close();
    }

    onEnviar() {
        let token = this._LoginService.getToken();

        if (this.datos.tipoReporte) {
            this._CvCdoComparendoService.generateReporte(this.datos, token).subscribe(
                response => {
                    if (response.code == 200) {
                        this.comparendos = response.data;

                        if(this.comparendos) {
                            if(this.datos.tipoReporte == 1) {
                                this.comparendos.forEach(element => {
                                    this.arrayNombreInfracciones.push(element.nombre);
                                    this.arrayCantidadInfracciones.push(element.cant);
                                    
                                });

                                this.barChartOptionsInfracciones = {
                                    scaleShowVerticalLines: false,
                                    responsive: true,
                                    title: {
                                        display: true,
                                        text: 'Grafica de las 10 infracciones más comunes',
                                    },
                                    legend: {
                                        display: false,
                                        labels: { fontColor: '#b7c8ff' }
                                    },
                                    scales: {
                                        yAxes: [{
                                            ticks: {
                                                fontColor: '#b7c8ff',
                                            },
                                            gridLines: {
                                                color: 'rgba(160,160,160,0.2)',
                                                zeroLineColor: 'rgba(160,160,160,0.1)'
                                            }
                                        }],
                                        xAxes: [{
                                            ticks: {
                                                fontColor: '#b7c8ff'
                                            },
                                            gridLines: {
                                                color: 'rgba(160,160,160,0.2)',
                                                zeroLineColor: 'rgba(160,160,160,0.1)'
                                            }
                                        }]
                                    }
                                };

                                this.barChartLabelsInfracciones = this.arrayNombreInfracciones;
                                this.barChartTypeInfracciones= 'bar';
                                this.barChartLegendInfracciones = true;
                                this.barChartDataInfracciones = [{ data: this.arrayCantidadInfracciones, label: 'Cantidad' }];

                                this.graficaEdades = false;
                                this.graficaInfracciones = true;
                            } else if (this.datos.tipoReporte == 2) {
                                this.comparendos.forEach(element => {
                                    this.arrayNombreEdades.push(element.nombre);
                                    this.arrayCantidadEdades.push(element.edad);

                                });
                                this.barChartOptionsEdades = {
                                    scaleShowVerticalLines: false,
                                    responsive: true,
                                    title: {
                                        display: true,
                                        text: 'Grafica de las 10 edades en que más comparendos se realizan',
                                    },
                                    legend: {
                                        display: false,
                                        labels: { fontColor: '#b7c8ff' }
                                    },
                                    scales: {
                                        yAxes: [{
                                            ticks: {
                                                fontColor: '#b7c8ff',
                                            },
                                            gridLines: {
                                                color: 'rgba(160,160,160,0.2)',
                                                zeroLineColor: 'rgba(160,160,160,0.1)'
                                            }
                                        }],
                                        xAxes: [{
                                            ticks: {
                                                fontColor: '#b7c8ff'
                                            },
                                            gridLines: {
                                                color: 'rgba(160,160,160,0.2)',
                                                zeroLineColor: 'rgba(160,160,160,0.1)'
                                            }
                                        }]
                                    }
                                };

                                this.barChartLabelsEdades = this.arrayNombreEdades;
                                this.barChartTypeEdades = 'bar';
                                this.barChartLegendEdades = true;
                                this.barChartDataEdades = [{ data: this.arrayCantidadEdades, label: 'Cantidad' }];
                                
                                this.graficaInfracciones = false;
                                this.graficaEdades = true;
                            }
                        }

                        swal({
                            title: response.title,
                            text: response.message,
                            type: response.status,
                            confirmButtonText: 'Aceptar'
                        });
                    } else {
                        swal({
                            title: response.title,
                            text: response.message,
                            type: response.status,
                            confirmButtonText: 'Aceptar'
                        });
                    }
                },
                error => {
                    this.errorMessage = <any>error;

                    if (this.errorMessage != null) {
                        console.log(this.errorMessage);
                        alert("Error en la petición");
                    }
                }
            );
        } else {

        }
    }
}

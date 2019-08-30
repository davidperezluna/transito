import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { UserEmpresaTransporte } from "../userEmpresaTransporte.modelo";
import { UserEmpresaTransporteService } from "../../../../../services/userEmpresaTransporte.service";
import { VhloCfgRadioAccionService } from "../../../../../services/vhloCfgRadioAccion.service";
import { VhloCfgModalidadTransporteService } from "../../../../../services/vhloCfgModalidadTransporte.service";
import { VhloCfgClaseService } from "../../../../../services/vhloCfgClase.service";
import { VhloCfgColorService } from "../../../../../services/vhloCfgColor.service";
import { VhloTpConvenioService } from 'app/services/vhloTpConvenio.service';
import { VhloCfgCarroceriaService } from "../../../../../services/vhloCfgCarroceria.service";
import { CfgMunicipioService } from "../../../../../services/cfgMunicipio.service";
import { LoginService } from '../../../../../services/login.service';
import { DatePipe, CurrencyPipe } from '@angular/common';
import swal from 'sweetalert2';

@Component({
    selector: 'app-new-userempresatransporte',
    templateUrl: './new.component.html',
    providers: [DatePipe]
})
export class NewComponent implements OnInit {
    @Output() ready = new EventEmitter<any>();
    @Input() empresa: any = null;
    public errorMessage;
    
    public empresaTransporte;

    public radiosAccion;
    public modalidadesTransporte;
    public clases;
    public colores;
    public municipios;

    public carrocerias;
    
    public numeroConvenio: any;
    public convenio: any;

    constructor(
        private _LoginService: LoginService,
        private _UserEmpresaTransporteService: UserEmpresaTransporteService,
        private _VhloCfgRadioAccionService: VhloCfgRadioAccionService,
        private _VhloCfgModalidadTransporteService: VhloCfgModalidadTransporteService,
        private _VhloCfgClaseService: VhloCfgClaseService,
        private _VhloCfgColorService: VhloCfgColorService,
        private _VhloTpConvenioService: VhloTpConvenioService,
        private _CfgMunicipioService: CfgMunicipioService,
        
        private _VhloCfgCarroceriaService: VhloCfgCarroceriaService,
    ) { }

    ngOnInit() {
        this.empresaTransporte = new UserEmpresaTransporte(null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
        this._VhloCfgRadioAccionService.select().subscribe(
            response => {
                this.radiosAccion = response;
            },
            error => {
                this.errorMessage = <any>error;

                if (this.errorMessage != null) {
                    console.log(this.errorMessage);
                    alert("Error en la petición");
                }
            }
        );
        this._VhloCfgModalidadTransporteService.select().subscribe(
            response => {
                this.modalidadesTransporte = response;
            },
            error => {
                this.errorMessage = <any>error;

                if (this.errorMessage != null) {
                    console.log(this.errorMessage);
                    alert("Error en la petición");
                }
            }
        );
        this._VhloCfgClaseService.select().subscribe(
            response => {
                this.clases = response;
            },
            error => {
                this.errorMessage = <any>error;

                if (this.errorMessage != null) {
                    console.log(this.errorMessage);
                    alert("Error en la petición");
                }
            }
        );
        this._VhloCfgColorService.select().subscribe(
            response => {
                this.colores = response;
            },
            error => {
                this.errorMessage = <any>error;

                if (this.errorMessage != null) {
                    console.log(this.errorMessage);
                    alert("Error en la petición");
                }
            }
        );
        this._CfgMunicipioService.select().subscribe(
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
        this._VhloCfgCarroceriaService.select().subscribe(
            response => {
                this.carrocerias = response;
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

    onCancelar() {
        this.ready.emit(true);
    }

    onEnviar() {
        let token = this._LoginService.getToken();

        this.empresaTransporte.idEmpresa = this.empresa.id;

        this._UserEmpresaTransporteService.register(this.empresaTransporte, token).subscribe(
            response => {
                if (response.code == 200) {
                    this.ready.emit(true);
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
                        alert("Error en la petición");
                    }
                }

            });
    }

    onCalcularCapacidad(capacidadMinima, capacidadMaxima) {
        this.empresaTransporte.capacidadDisponible = 0;
        if (capacidadMinima && capacidadMaxima) {
            if (capacidadMaxima < capacidadMinima) {
                swal({
                    title: 'Error!',
                    text: 'La capacidad máxima debe ser mayor a la mínima',
                    type: 'error',
                    confirmButtonText: 'Aceptar'
                })

            } else {
                this.empresaTransporte.capacidadDisponible = capacidadMaxima;
            }
        }
    }

    onSearchConvenio() {
        let token = this._LoginService.getToken();
        this._VhloTpConvenioService.searchByNumeroConvenio({ 'numeroConvenio': this.empresaTransporte.numeroConvenio}, token).subscribe(
            response => {
                if (response.code == 200) {
                    this.convenio = response.data;

                    var datePiper = new DatePipe('en-US');
                    var date = new Date();

                    date.setTime(this.convenio.fechaConvenio.timestamp * 1000);

                    this.convenio.fechaConvenio = datePiper.transform(
                        date, 'yyyy/MM/dd'
                    );

                    date.setTime(this.convenio.fechaActaInicio.timestamp * 1000);

                    this.convenio.fechaActaInicio = datePiper.transform(
                        date, 'yyyy/MM/dd'
                    );

                    date.setTime(this.convenio.fechaActaFin.timestamp * 1000);

                    this.convenio.fechaActaFin = datePiper.transform(
                        date, 'yyyy/MM/dd'
                    );

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
    }
}

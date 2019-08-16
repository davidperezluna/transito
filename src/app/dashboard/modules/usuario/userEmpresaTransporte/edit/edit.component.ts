import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { UserEmpresaTransporteService } from '../../../../../services/userEmpresaTransporte.service';
import { LoginService } from '../../../../../services/login.service';
import { DatePipe, CurrencyPipe } from '@angular/common';

import { VhloCfgRadioAccionService } from "../../../../../services/vhloCfgRadioAccion.service";
import { VhloCfgModalidadTransporteService } from "../../../../../services/vhloCfgModalidadTransporte.service";
import { VhloCfgServicioService } from "../../../../../services/vhloCfgServicio.service";
import { VhloCfgClaseService } from "../../../../../services/vhloCfgClase.service";
import { VhloCfgColorService } from "../../../../../services/vhloCfgColor.service";
import { CfgMunicipioService } from "../../../../../services/cfgMunicipio.service";

import { VhloCfgCarroceriaService } from "../../../../../services/vhloCfgCarroceria.service";

import swal from 'sweetalert2';

@Component({
    selector: 'app-edit-userempresatransporte',
    templateUrl: './edit.component.html',
    providers: [DatePipe]
})

export class EditComponent implements OnInit {
    @Output() ready = new EventEmitter<any>();
    @Input() habilitacion: any = null;

    public errorMessage;
    
    public radiosAccion;
    public modalidadesTransporte;
    public servicios;
    public clases;
    public colores;
    public municipios;

    public carrocerias;

    public radioSelected;
    public modalidadTransporteSelected;
    public servicioSelected;
    public claseSelected;
    public arrayColoresSelected;
    public arrayMunicipiosSelected;
    public carroceriaSelected;

    constructor(
        private _LoginService: LoginService,
        private _UserEmpresaTransporteService: UserEmpresaTransporteService,
        private _VhloCfgRadioAccionService: VhloCfgRadioAccionService,
        private _VhloCfgModalidadTransporteService: VhloCfgModalidadTransporteService,
        private _VhloCfgServicioService: VhloCfgServicioService,
        private _VhloCfgClaseService: VhloCfgClaseService,
        private _VhloCfgColorService: VhloCfgColorService,
        private _CfgMunicipioService: CfgMunicipioService,

        private _VhloCfgCarroceriaService: VhloCfgCarroceriaService,
    ) { }

    ngOnInit() {
        var datePiper = new DatePipe('en-US');

        var date = new Date();
        date.setTime(this.habilitacion.fechaExpedicionActo.timestamp * 1000);

        this.habilitacion.fechaExpedicionActo = datePiper.transform(
            date, 'yyyy-MM-dd'
        );
        
        date.setTime(this.habilitacion.fechaEjecutoriaActo.timestamp * 1000);

        this.habilitacion.fechaEjecutoriaActo = datePiper.transform(
            date, 'yyyy-MM-dd'
        );

        this._VhloCfgRadioAccionService.select().subscribe(
            response => {
                this.radiosAccion = response;
                setTimeout(() => {
                    this.radioSelected = [this.habilitacion.radioAccion.id];
                });
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
                setTimeout(() => {
                    this.modalidadTransporteSelected = [this.habilitacion.modalidadTransporte.id];
                });
            },
            error => {
                this.errorMessage = <any>error;

                if (this.errorMessage != null) {
                    console.log(this.errorMessage);
                    alert("Error en la petición");
                }
            }
        );
        this._VhloCfgServicioService.select().subscribe(
            response => {
                this.servicios = response;
                setTimeout(() => {
                    this.servicioSelected = [this.habilitacion.servicio.id];
                });
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
                setTimeout(() => {
                    this.claseSelected = [this.habilitacion.clase.id];
                });
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
                setTimeout(() => {
                    this.arrayColoresSelected = this.habilitacion.colores;
                });
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
                setTimeout(() => {
                    this.arrayMunicipiosSelected = this.habilitacion.municipios;
                });
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
                if(this.habilitacion.carroceria) {
                    this.carroceriaSelected = [this.habilitacion.carroceria.id];
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
    }

    onCancelar() {
        this.ready.emit(true);
    }

    onEnviar() {
        let token = this._LoginService.getToken();

        console.log(this.arrayColoresSelected);

        this.habilitacion.idRadioAccion = this.radioSelected;
        this.habilitacion.idModalidadTransporte = this.modalidadTransporteSelected;
        this.habilitacion.idServicio = this.servicioSelected;
        this.habilitacion.idClase = this.claseSelected;
        this.habilitacion.arrayColores = this.arrayColoresSelected;
        this.habilitacion.arrayMunicipios = this.arrayMunicipiosSelected;
        
        this.habilitacion.idCarroceria = this.carroceriaSelected;

        this._UserEmpresaTransporteService.edit(this.habilitacion, token).subscribe(
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
}
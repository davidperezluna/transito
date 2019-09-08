import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SvCaracterizacion } from '../svCaracterizacion.modelo';
import { SvCaracterizacionService } from '../../../../../services/svCaracterizacion.service';
import { CfgMunicipioService } from "../../../../../services/cfgMunicipio.service";
import { UserLcCfgCategoriaService } from "../../../../../services/userLcCfgCategoria.service";
import { UserCfgGeneroService } from "../../../../../services/userCfgGenero.service";
import { LoginService } from '../../../../../services/login.service';
import { DatePipe, CurrencyPipe } from '@angular/common';
import swal from 'sweetalert2';

@Component({
    selector: 'app-new-svcaracterizacion',
    templateUrl: './new.component.html',
    providers: [DatePipe]
})
export class NewComponent implements OnInit {
    @Output() ready = new EventEmitter<any>();
    public msvCaracterizacion: SvCaracterizacion;
    public errorMessage;

    public date: any;
    public municipios: any;
    public categoriasLicenciaConduccion: any;
    public generos: any;

    public empresaEncontrada = false;
    public empresa: any;
    public representante: any;
    public edad: any;

    public arrayFactoresRiesgo = [
        { value: 'ESTADO INFRAESTRUCTURA', label: 'ESTADO INFRAESTRUCTURA'},
        { value: 'ORGANIZACIÓN TRABAJO', label: 'ORGANIZACIÓN TRABAJO'},
        { value: 'PROPIA CONDUCCIÓN', label: 'PROPIA CONDUCCIÓN'},
        { value: 'OTRO', label: 'OTRO'},
    ];

    public arrayCausasRiesgo = [
        { value: 'INTENSIDAD DE TRÁFICO', label: 'INTENSIDAD DE TRÁFICO' },
        { value: 'CONDICIÓN CLIMATOLÓGICA', label: 'CONDICIÓN CLIMATOLÓGICA' },
        { value: 'TIPO VEHÍCULO', label: 'TIPO VEHÍCULO' },
        { value: 'ORGANIZACIÓN DE TRABAJO', label: 'ORGANIZACIÓN DE TRABAJO' },
        { value: 'PROPIA CONDUCCIÓN', label: 'PROPIA CONDUCCIÓN' },
        { value: 'ESTADO', label: 'ESTADO' },
        { value: 'OTRO CONDUCTOR', label: 'OTRO CONDUCTOR' },
        { value: 'ESTADO INFRAESTRUCTURA', label: 'ESTADO INFRAESTRUCTURA' },
        { value: 'FALTA INFORMACIÓN', label: 'FALTA INFORMACIÓN' },
        { value: 'OTRA', label: 'OTRA' },
    ];

    constructor(
        private _MsvCaracterizacionService: SvCaracterizacionService,
        private _LoginService: LoginService,
        private _MunicipioService: CfgMunicipioService,
        private _CfgLicenciaConduccionCategoriaService: UserLcCfgCategoriaService,
        private _GeneroService: UserCfgGeneroService,

    ) { }

    ngOnInit() {
        this.msvCaracterizacion = new SvCaracterizacion(null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
        this.date = new Date;
        var datePiper = new DatePipe(this.date);
        this.msvCaracterizacion.fecha = datePiper.transform(this.date, 'yyyy-MM-dd');
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
        this._CfgLicenciaConduccionCategoriaService.select().subscribe(
            response => {
                this.categoriasLicenciaConduccion = response;
            },
            error => {
                this.errorMessage = <any>error;

                if (this.errorMessage != null) {
                    console.log(this.errorMessage);
                    alert("Error en la petición");
                }
            }
        );
        this._GeneroService.select().subscribe(
            response => {
                this.generos = response;
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

        this._MsvCaracterizacionService.register(this.msvCaracterizacion, token).subscribe(
            response => {
                if (response.code == 200) {
                    this.ready.emit(true);
                    swal({
                        title: 'Perfecto!',
                        text: response.message,
                        type: 'success',
                        confirmButtonText: 'Aceptar'
                    })
                } else {
                    swal({
                        title: 'Error!',
                        text: response.message,
                        type: 'error',
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

    onSearchEmpresa() {
        let token = this._LoginService.getToken();
        this._MsvCaracterizacionService.getBuscarEmpresa({ 'nit': this.msvCaracterizacion.nit }, token).subscribe(
            response => {
                if (response.code == 200) {
                    this.empresaEncontrada = true;
                    this.empresa = response.data;
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

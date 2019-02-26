import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MsvCaracterizacion } from '../msvCaracterizacion.modelo';
import { MsvCaracterizacionService } from '../../../services/msvCaracterizacion.service';
import { CfgMunicipioService } from "../../../services/cfgMunicipio.service";
import { CfgLicenciaConduccionCategoriaService } from "../../../services/cfgLicenciaConduccionCategoria.service";
import { UserCfgGeneroService } from "../../../services/userCfgGenero.service";
import { LoginService } from '../../../services/login.service';
import { DatePipe, CurrencyPipe } from '@angular/common';
import swal from 'sweetalert2';

@Component({
    selector: 'app-new',
    templateUrl: './new.component.html',
    providers: [DatePipe]
})
export class NewComponent implements OnInit {
    @Output() ready = new EventEmitter<any>();
    public msvCaracterizacion: MsvCaracterizacion;
    public errorMessage;

    public date: any;
    public municipios: any;
    public categoriasLicenciaConduccion: any;
    public generos: any;

    public empresaEncontrada = false;
    public empresa: any;
    public representante: any;
    public edad: any;

    public listadoClima = false;
    itemStringsLeftClima: any[] = [];
    itemStringsRightClima: any[] = [];

    constructor(
        private _MsvCaracterizacionService: MsvCaracterizacionService,
        private _LoginService: LoginService,
        private _MunicipioService: CfgMunicipioService,
        private _CfgLicenciaConduccionCategoriaService: CfgLicenciaConduccionCategoriaService,
        private _GeneroService: UserCfgGeneroService,

    ) { }

    ngOnInit() {
        this.msvCaracterizacion = new MsvCaracterizacion(null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
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
                if (response.status == 'success') {
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

    onBuscarEmpresa() {
        let token = this._LoginService.getToken();
        this._MsvCaracterizacionService.getBuscarEmpresa({ 'nit': this.msvCaracterizacion.nit }, token).subscribe(
            response => {
                if (response.status == 'success') {
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

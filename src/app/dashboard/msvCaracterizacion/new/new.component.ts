import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MsvCaracterizacion } from '../msvCaracterizacion.modelo';
import { MsvCaracterizacionService } from '../../../services/msvCaracterizacion.service';
import { MunicipioService } from "../../../services/municipio.service";
import { CfgLicenciaConduccionCategoriaService } from "../../../services/cfgLicenciaConduccionCategoria.service";
import { GeneroService } from "../../../services/genero.service";
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

    public ctzn: any;
    public nit: any;

    public empresaEncontrada = false;
    public empresa: any;
    public representante: any;
    public edad: any;

    constructor(
        private _MsvCaracterizacionService: MsvCaracterizacionService,
        private _LoginService: LoginService,
        private _MunicipioService: MunicipioService,
        private _CfgLicenciaConduccionCategoriaService: CfgLicenciaConduccionCategoriaService,
        private _GeneroService: GeneroService,

    ) { }

    ngOnInit() {
        this.msvCaracterizacion = new MsvCaracterizacion(null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
        this.date = new Date;
        var datePiper = new DatePipe(this.date);
        this.msvCaracterizacion.fecha = datePiper.transform(this.date, 'yyyy-MM-dd');
        this._MunicipioService.getMunicipioSelect().subscribe(
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
        this._GeneroService.getGeneroSelect().subscribe(
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
}

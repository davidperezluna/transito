import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { UserEmpresaTransporteService } from "../../../services/userEmpresaTransporte.service";

import { VhloCfgModalidadTransporteService } from "../../../services/vhloCfgModalidadTransporte.service";
import { VhloCfgClaseService } from "../../../services/vhloCfgClase.service";

import { LoginService } from '../../../services/login.service';
import swal from 'sweetalert2';

@Component({
    selector: 'app-range',
    templateUrl: './range.component.html'
})
export class RangeComponent implements OnInit {
    @Output() ready = new EventEmitter<any>();
    public errorMessage;
    public empresa;
    public nit;

    public modalidadesTransporte;
    public clases;
    
    public datos = {
            'idModalidadTransporte': null,
            'idClase': null,
            'nit': null,
            'rangoInicio': null,
            'rangoFin': null,
            'numeroResolucion': null,
            'fechaResolucion': null,
            'observaciones': null,
        };
    constructor(
        private _LoginService: LoginService,
        private _UserEmpresaTransporteService: UserEmpresaTransporteService,
        private _VhloCfgModalidadTransporteService: VhloCfgModalidadTransporteService,
        private _VhloCfgClaseService: VhloCfgClaseService,
    ) { }

    ngOnInit() {
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
    }

    onCancelar() {
        this.ready.emit(true);
    }

    onSearchEmpresa() {
        let token = this._LoginService.getToken();
        this._UserEmpresaTransporteService.searchByModalidadAndClase(this.datos, token).subscribe(
            response => {
                if (response.code == 200) {
                    this.empresa = response.data;
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

    onEnviar() {
        let token = this._LoginService.getToken();

        this._UserEmpresaTransporteService.registerRangoCupos(this.datos, token).subscribe(
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

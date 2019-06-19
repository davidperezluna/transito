import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { VhloTpAsignacion } from "../vhloTpAsignacion.modelo";

import { VhloCfgClaseService } from "../../../services/vhloCfgClase.service";
import { VhloCfgServicioService } from "../../../services/vhloCfgServicio.service";
import { VhloTpAsignacionService } from "../../../services/vhloTpAsignacion.service";
import { LoginService } from '../../../services/login.service';
import swal from 'sweetalert2';

@Component({
    selector: 'app-new',
    templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
    @Output() ready = new EventEmitter<any>();
    public errorMessage;
    public asignacion: VhloTpAsignacion;
    public empresa;
    public empresaTransporte;
    public vehiculo;
    public propietarios;

    public placa;

    public clases;
    public servicios;
    public cupos;

    public datos = {
        'idClase': null,
        'idServicio': null,
        'nit': null,
    };
    constructor(
        private _LoginService: LoginService,
        private _VhloCfgClaseService: VhloCfgClaseService,
        private _VhloCfgServicioService: VhloCfgServicioService,
        private _VhloTpAsignacionService: VhloTpAsignacionService,
    ) { }

    ngOnInit() {

        this.asignacion = new VhloTpAsignacion(null, null, null, null);

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
        this._VhloCfgServicioService.select().subscribe(
            response => {
                this.servicios = response;
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
        this._VhloTpAsignacionService.searchByServicioAndClase(this.datos, token).subscribe(
            response => {
                if (response.code == 200) {
                    console.log(response);
                    this.empresa = response.data.empresa;
                    this.empresaTransporte = response.data;
                    if (response.cupos) {
                        this.cupos = response.cupos;
                    }
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

    onSearchVehiculo() {
        let token = this._LoginService.getToken();

        this._VhloTpAsignacionService.searchVehiculo({ 'placa': this.placa }, token).subscribe(
            response => {
                console.log(response);
                if (response.status == 'success') {
                    this.vehiculo = response.data.vehiculo;
                    this.propietarios = response.data.propietarios;
                }
            }
        );
    }

    onEnviar() {
        let token = this._LoginService.getToken();

        this.asignacion.idEmpresa = this.empresaTransporte.id;
        this.asignacion.idVehiculo = this.vehiculo.id;

        this._VhloTpAsignacionService.register(this.asignacion, token).subscribe(
            response => {
                if (response.code == 200) {
                    this.ready.emit(true);
                    swal({
                        title: response.title,
                        text: response.message,
                        type: response.status,
                        confirmButtonText: 'Aceptar'
                    })
                    this.ready.emit(true);
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

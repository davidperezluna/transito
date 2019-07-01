import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { VhloCfgClaseService } from "../../../services/vhloCfgClase.service";
import { VhloCfgServicioService } from "../../../services/vhloCfgServicio.service";
import { VhloTpAsignacionService } from "../../../services/vhloTpAsignacion.service";
import { LoginService } from '../../../services/login.service';
import swal from 'sweetalert2';

@Component({
    selector: 'app-edit',
    templateUrl: './edit.component.html'
})
export class EditComponent implements OnInit {
    @Output() ready = new EventEmitter<any>();
    @Input() asignacion: any = null;
    public errorMessage;
    public empresa;
    public empresaTransporte;
    public vehiculo;
    public propietarios;

    public placa;

    public clases;
    public servicios;
    public cupos;
    
    public cupoSelected;

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

        this.datos.idClase = this.asignacion.empresaTransporte.clase.id;
        this.datos.idServicio = this.asignacion.empresaTransporte.servicio.id;
        this.datos.nit = this.asignacion.empresaTransporte.empresa.nit;
        /* this.onSearchEmpresa(); */

        this.placa = this.asignacion.vehiculo.placa.numero;
        this.onSearchVehiculo();

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

    /* onSearchEmpresa() {
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
    } */

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

    /* onEnviar() {
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
    } */
}

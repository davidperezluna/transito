import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { VhloTpAsignacion } from "../vhloTpAsignacion.modelo";
import { VhloTpAsignacionService } from "../../../services/vhloTpAsignacion.service";
import { LoginService } from '../../../services/login.service';
import swal from 'sweetalert2';

@Component({
    selector: 'app-new',
    templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
    @Output() ready = new EventEmitter<any>();
    @Input() empresaHabilitadaRango: any = null;
    public errorMessage;
    public asignacion: VhloTpAsignacion;
    public empresa;
    public vehiculo;
    public propietarios;

    public placa;

    public cupos;

    constructor(
        private _LoginService: LoginService,
        private _VhloTpAsignacionService: VhloTpAsignacionService,
    ) { }

    ngOnInit() {
        console.log(this.empresaHabilitadaRango);

        this.asignacion = new VhloTpAsignacion(null, null, null, null);
        
        let token = this._LoginService.getToken();
        this._VhloTpAsignacionService.searchCuposDisponibles({'idEmpresa': this.empresaHabilitadaRango.id }, token).subscribe(
            response => {
                if (response.code == 200) {
                    this.cupos = response.data;
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

    onCancelar() {
        this.ready.emit(true);
    }

    onSearchVehiculo() {
        let token = this._LoginService.getToken();

        this._VhloTpAsignacionService.searchVehiculo({ 'placa': this.placa }, token).subscribe(
            response => {
                if (response.status == 'success') {
                    this.vehiculo = response.data.vehiculo;
                    this.propietarios = response.data.propietarios;
                }
            }
        );
    }

    onEnviar() {
        let token = this._LoginService.getToken();

        this.asignacion.idEmpresa = this.empresaHabilitadaRango.id;
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

            }
        );
    }
}

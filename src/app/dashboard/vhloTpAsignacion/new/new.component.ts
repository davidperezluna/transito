import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { VhloTpAsignacion } from "../vhloTpAsignacion.modelo";
import { VhloTpAsignacionService } from "../../../services/vhloTpAsignacion.service";
import { LoginService } from '../../../services/login.service';
import swal from 'sweetalert2';

declare var $: any;

@Component({
    selector: 'app-new',
    templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
    @Output() ready = new EventEmitter<any>();
    @Input() empresaHabilitadaRango: any = null;
    public table: any;
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

    onInitTable() {
        if (this.table) {
            this.table.destroy();
        }

        this.table = $('#dataTables-propietario').DataTable({
            responsive: true,
            pageLength: 10,
            sPaginationType: 'full_numbers',
            oLanguage: {
                oPaginate: {
                    sFirst: '<i class="fa fa-step-backward"></i>',
                    sPrevious: '<i class="fa fa-chevron-left"></i>',
                    sNext: '<i class="fa fa-chevron-right"></i>',
                    sLast: '<i class="fa fa-step-forward"></i>'
                }
            }
        });
    }

    onSearchVehiculo() {
        let token = this._LoginService.getToken();

        this._VhloTpAsignacionService.searchVehiculo({ 'placa': this.placa }, token).subscribe(
            response => {
                if (response.status == 'success') {
                    this.vehiculo = response.data.vehiculo;
                    this.propietarios = response.data.propietarios;

                    let timeoutId = setTimeout(() => {
                        this.onInitTable();
                    }, 100);
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

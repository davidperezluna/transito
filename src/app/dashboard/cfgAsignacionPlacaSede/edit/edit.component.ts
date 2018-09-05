import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { CfgAsignacionPlacaSedeService } from '../../../services/cfgAsignacionPlacaSede.service';
import { LoginService } from '../../../services/login.service';
import swal from 'sweetalert2';

import { SedeOperativaService } from '../../../services/sedeOperativa.service';
import { CfgTipoVehiculoService } from '../../../services/cfgTipoVehiculo.service';
import { ModuloService } from '../../../services/modulo.service';


@Component({
    selector: 'app-edit',
    templateUrl: './edit.component.html'
})
export class EditComponent implements OnInit {
    @Output() ready = new EventEmitter<any>();
    @Input() asignacion: any = null;
    public errorMessage;
    public respuesta;
    public sedesOperativas: any;
    public modulos: any;
    public tiposVehiculos: any;

    public sedeOperativaSelected: any;
    public moduloSelected: any;
    public tipoVehiculoSelected: any;

    constructor(
        private _CfgAsignacionPlacaSedeService: CfgAsignacionPlacaSedeService,
        private _loginService: LoginService,
        private _SedeOperativaService: SedeOperativaService,
        private _ModuloService: ModuloService,
        private _TipoVehiculo: CfgTipoVehiculoService

    ) { }

    ngOnInit() { 
        this._SedeOperativaService.getSedeOperativaSelect().subscribe(
            response => {
                this.sedesOperativas = response;
                setTimeout(() => {
                    this.sedeOperativaSelected = [this.asignacion.sedeOperativa.id];
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
        this._ModuloService.getModuloSelect().subscribe(
            response => {
                this.modulos = response;
                setTimeout(() => {
                    this.moduloSelected = [this.asignacion.modulo.id];
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
        this._TipoVehiculo.getTipoVehiculoSelect().subscribe(
            response => {
                this.tiposVehiculos = response;
                setTimeout(() => {
                    this.tipoVehiculoSelected = [this.asignacion.tipoVehiculo.id];
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
    }

    onCancelar() { this.ready.emit(true); }

    onEnviar() {
        let token = this._loginService.getToken();
        this.asignacion.sedeOperativa = this.sedeOperativaSelected;
        this.asignacion.modulo = this.moduloSelected;
        this.asignacion.tipoVehiculo = this.tipoVehiculoSelected;
        this._CfgAsignacionPlacaSedeService.edit(this.asignacion, token).subscribe(
            response => {
                if (response.status == 'success') {
                    this.ready.emit(true);
                    swal({
                        title: 'Perfecto!',
                        text: response.message,
                        type: 'success',
                        confirmButtonText: 'Aceptar'
                    });
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

import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { FroTrtePrecio } from '../froTrtePrecio.modelo';
import { FroTrtePrecioService } from '../../../services/froTrtePrecio.service';
import { FroTramiteService } from "../../../services/froTramite.service";
import { FroTrteCfgConceptoService } from '../../../services/froTrteCfgConcepto.service';
import { VhloCfgTipoVehiculoService } from "../../../services/vhloCfgTipoVehiculo.service";
import { CfgModuloService } from '../../../services/cfgModulo.service';
import { LoginService } from '../../../services/login.service';
import swal from 'sweetalert2';
import { environment } from 'environments/environment'

@Component({
    selector: 'app-new',
    templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
    @Output() ready = new EventEmitter<any>();
    public trtePrecio: FroTrtePrecio;
    public errorMessage;
    public tramites;
    public modulos;
    public tiposVehiculo;
    public conceptos;

    constructor(
        private _TrtePrecioService: FroTrtePrecioService,
        private _ConceptoService: FroTrteCfgConceptoService,
        private _TramiteService: FroTramiteService,
        private _TipoVehiculoService: VhloCfgTipoVehiculoService,
        private _ModuloService: CfgModuloService,
        private _LoginService: LoginService,
    ) { }

    ngOnInit() {
        this.trtePrecio = new FroTrtePrecio(null, null, null, null, null, null, null, null, null, null);

        this._TramiteService.select().subscribe(
            response => {
                this.tramites = response;
            },
            error => {
                this.errorMessage = <any>error;

                if (this.errorMessage != null) {
                    console.log(this.errorMessage);
                    alert("Error en la petición");
                }
            }
        );
        
        this._ModuloService.select().subscribe(
            response => {
                this.modulos = response;
            },
            error => {
                this.errorMessage = <any>error;

                if (this.errorMessage != null) {
                    console.log(this.errorMessage);
                    alert("Error en la petición");
                }
            }
        );

        this._ConceptoService.select().subscribe(
            response => {
                this.conceptos = response;
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

    onChangedModulo(e) {
        if (e) {
            let token = this._LoginService.getToken();

            this._TipoVehiculoService.selectByModulo({ 'idModulo': e }, token).subscribe(
                response => {
                    if (response) {
                        this.tiposVehiculo = response;
                    }else{
                        this.tiposVehiculo = null;
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
    }

    onEnviar() {
        let token = this._LoginService.getToken();

        this._TrtePrecioService.register(this.trtePrecio, token).subscribe(
            response => {
                if (response.status == 'success') {
                    swal({
                        title: 'Perfecto!',
                        text: response.message,
                        type: 'success',
                        confirmButtonText: 'Aceptar'
                    });

                    this.ready.emit(true);
                } else {
                    this.trtePrecio.id = null;
                    swal({
                        title: 'Error!',
                        text: response.message,
                        type: 'error',
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
            }
        );
    }
}
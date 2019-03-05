import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FroTrtePrecioService } from '../../../services/froTrtePrecio.service';
import { FroTrteCfgConceptoService } from '../../../services/froTrteCfgConcepto.service';
import { VhloCfgTipoVehiculoService } from "../../../services/vhloCfgTipoVehiculo.service";
import { FroTramiteService } from "../../../services/froTramite.service";
import { CfgModuloService } from '../../../services/cfgModulo.service';
import { LoginService } from '../../../services/login.service';
import swal from 'sweetalert2';

@Component({
    selector: 'app-edit',
    templateUrl: './edit.component.html'
})
export class EditComponent implements OnInit {
    @Output() ready = new EventEmitter<any>();
    @Input() tramitePrecio: any = null;
    public errorMessage;
    public tramites;
    public modulos;
    public tiposVehiculo;
    public conceptos;
    public moduloSelected: any;
    public tramiteSelected: any;
    public tipoVehiculoSelected: any;

    constructor(
        private _PrecioService: FroTrtePrecioService,
        private _ConceptoService: FroTrteCfgConceptoService,
        private _TramiteService: FroTramiteService,
        private _TipoVehiculoService: VhloCfgTipoVehiculoService,
        private _ModuloService: CfgModuloService,
        private _LoginService: LoginService,
    ) { }

    ngOnInit() {
        console.log(this.tramitePrecio);
        
        this._TramiteService.select().subscribe(
            response => {
                this.tramites = response;

                setTimeout(() => {
                    this.tramiteSelected = [ this.tramitePrecio.tramite.id ];
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

        let token = this._LoginService.getToken();

        this._TipoVehiculoService.selectByModulo({ 'idModulo': this.tramitePrecio.modulo.id }, token).subscribe(
            response => {
                if (response) {
                    this.tiposVehiculo = response;

                    setTimeout(() => {
                        this.tipoVehiculoSelected = [this.tramitePrecio.tipoVehiculo.id];
                    });
                } else {
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

    onEnviar() {
        let token = this._LoginService.getToken();

        this.tramitePrecio.idTramite = this.tramiteSelected;
        this.tramitePrecio.idModulo = this.moduloSelected;
        this.tramitePrecio.idTipoVehiculo = this.tipoVehiculoSelected;

        this._PrecioService.edit(this.tramitePrecio, token).subscribe(
            response => {
                if (response.status == 'success') {
                    this.ready.emit(true);

                    swal({
                        title: 'Perfecto!',
                        text: response.message,
                        type: 'success',
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
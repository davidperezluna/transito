import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FroTrtePrecioService } from '../../../../../services/froTrtePrecio.service';
import { FroTrteCfgConceptoService } from '../../../../../services/froTrteCfgConcepto.service';
import { VhloCfgTipoVehiculoService } from "../../../../../services/vhloCfgTipoVehiculo.service";
import { FroTramiteService } from "../../../../../services/froTramite.service";
import { LoginService } from '../../../../../services/login.service';
import swal from 'sweetalert2';
declare var $: any;

@Component({
    selector: 'app-edit-frotrteprecio',
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
    public tramitesConcepto: any = null;
    
    public moduloSelected: any;
    public tramiteSelected: any;
    public tipoVehiculoSelected: any;
    
    public table: any = null;

    constructor(
        private _PrecioService: FroTrtePrecioService,
        private _ConceptoService: FroTrteCfgConceptoService,
        private _TramiteService: FroTramiteService,
        private _TipoVehiculoService: VhloCfgTipoVehiculoService,
        private _LoginService: LoginService,
    ) { }

    ngOnInit() {
        swal({
            title: 'Actualizando registros!',
            text: 'Solo tardara unos segundos por favor espere.',
            onOpen: () => {
                swal.showLoading()
            }
        });

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

        if (this.tramitePrecio.modulo.abreviatura == 'RNC') {
            this._TipoVehiculoService.select().subscribe(
                response => {
                    if (response) {
                        this.tiposVehiculo = response;

                        setTimeout(() => {
                            this.tipoVehiculoSelected = [ this.tramitePrecio.tipoVehiculo.id ];
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
        }else{
            this._TipoVehiculoService.selectByModulo({ 'idModulo': this.tramitePrecio.modulo.id }, token).subscribe(
                response => {
                    if (response) {
                        this.tiposVehiculo = response;

                        setTimeout(() => {
                            this.tipoVehiculoSelected = [ this.tramitePrecio.tipoVehiculo.id ];
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
        }

        this._ConceptoService.searchByTramitePrecio({ 'idTramitePrecio':this.tramitePrecio.id }, token).subscribe(
            response => {
                if (response.code == 200) {
                    this.tramitesConcepto = response.data;
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

        this._ConceptoService.selectAvailables({ 'idTramitePrecio':this.tramitePrecio.id }, token).subscribe(
            response => {
                this.conceptos = response;

                let timeoutId = setTimeout(() => {
                    this.onInitTable();
                    swal.close();
                }, 100);
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

    onInitTable() {
        if (this.table) {
            this.table.destroy();
        }
        
        this.table = $('#dataTables-example').DataTable({
            responsive: true,
            pageLength: 8,
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

    onCancelar() { 
        this.ready.emit(true); 
    }

    onEnviar() {
        let token = this._LoginService.getToken();

        this.tramitePrecio.idTramite = this.tramiteSelected;
        this.tramitePrecio.idTipoVehiculo = this.tipoVehiculoSelected;

        this._PrecioService.edit(this.tramitePrecio, token).subscribe(
            response => {
                if (response.code == 200) {
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
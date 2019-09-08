import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { FroTrtePrecioService } from '../../../../../services/froTrtePrecio.service';
import { FroTramiteService } from "../../../../../services/froTramite.service";
import { FroTrteCfgConceptoService } from '../../../../../services/froTrteCfgConcepto.service';
import { VhloCfgTipoVehiculoService } from "../../../../../services/vhloCfgTipoVehiculo.service";
import { CfgModuloService } from '../../../../../services/cfgModulo.service';
import { LoginService } from '../../../../../services/login.service';
import swal from 'sweetalert2';
declare var $: any;

@Component({
    selector: 'app-record-frotrteprecio',
    templateUrl: './record.component.html'
})

export class RecordComponent implements OnInit {
    @Output() ready = new EventEmitter<any>();
    @Input() modulo: any = null;
    public errorMessage;

    public tramitesPrecio;

    public table: any = null;

    public filtro: any = {
        'fechaInicial': null,
        'fechaFinal': null,
        'idModulo': null
    }

    constructor(
        private _TrtePrecioService: FroTrtePrecioService,
        private _ConceptoService: FroTrteCfgConceptoService,
        private _TramiteService: FroTramiteService,
        private _TipoVehiculoService: VhloCfgTipoVehiculoService,
        private _ModuloService: CfgModuloService,
        private _LoginService: LoginService,
    ) { }

    ngOnInit() { }

    onCancelar() {
        this.ready.emit(true);
    }

    onSearch() {
        swal({
            title: 'Buscando registros!',
            text: 'Solo tardara unos segundos por favor espere.',
            onOpen: () => {
                swal.showLoading()
            }
        });
        
        let token = this._LoginService.getToken();

        this.filtro.idModulo = this.modulo.id;

        this._TrtePrecioService.record(this.filtro, token).subscribe(
            response => {
                if (response.code == 200) {
                    this.tramitesPrecio = response.data;

                    swal({
                        title: 'Perfecto!',
                        text: response.message,
                        type: 'success',
                        confirmButtonText: 'Aceptar'
                    });

                    let timeoutId = setTimeout(() => {
                        this.onInitTable();
                    }, 100);
                } else {
                    this.tramitesPrecio = null;

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

    onInitTable() {
        if (this.table) {
            this.table.destroy();
        }
        
        this.table = $('#dataTables-example').DataTable({
            buttons: [
                'copy', 'excel', 'pdf'
            ],
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
}
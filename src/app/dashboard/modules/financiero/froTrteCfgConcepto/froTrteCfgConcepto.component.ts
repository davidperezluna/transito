import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { FroTrteCfgConcepto } from './froTrteCfgConcepto.modelo';
import { LoginService } from '../../../../services/login.service';
import { FroTrteCfgConceptoService } from "../../../../services/froTrteCfgConcepto.service";
import swal from 'sweetalert2';
declare var $: any;

@Component({
    selector: 'app-index',
    templateUrl: './froTrteCfgConcepto.component.html'
})

export class FroTrteCfgConceptoComponent implements OnInit {
    public errorMessage;
    public formIndex = true;
    public formNew = false;
    public formEdit = false;
    public table: any = null;
    public tramitesConceptos;
    public tramiteConcepto: FroTrteCfgConcepto;

    constructor(
        private _LoginService: LoginService,
        private _FroTrteCfgConceptoService: FroTrteCfgConceptoService,
    ) { }

    ngOnInit() {
        swal({
            title: 'Cargando Tabla!',
            text: 'Solo tardará unos segundos, por favor espere.',
            timer: 1500,
            onOpen: () => {
                swal.showLoading();
            }
        }).then((result) => {
            if (
                // Read more about handling dismissals
                result.dismiss === swal.DismissReason.timer
            ) {
            }
        });
        this._FroTrteCfgConceptoService.index().subscribe(
            response => {
                this.tramitesConceptos = response.data;
                let timeoutId = setTimeout(() => {
                    this.iniciarTabla();
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

    iniciarTabla() {
        $('#dataTables-example').DataTable({
            responsive: true,
            pageLength: 8,
            sPaginationType: 'full_numbers',
            oLanguage: {
                oPaginate: {
                    sFirst: '<<',
                    sPrevious: '<',
                    sNext: '>',
                    sLast: '>>'
                }
            }
        });
        this.table = $('#dataTables-example').DataTable();
    }

    onNew() {
        this.formNew = true;
        this.formIndex = false;
        if (this.table) {
            this.table.destroy();
        }
    }

    onDelete(id: any) {
        this.formNew = true;
        this.formIndex = false;
        if (this.table) {
            this.table.destroy();
        }
    }

    ready(isCreado: any) {
        if (isCreado) {
            this.formNew = false;
            this.formEdit = false;
            this.formIndex = true;
            this.ngOnInit();
        }
    }

    onEdit(tramiteConcepto: any) {
        this.tramiteConcepto = tramiteConcepto;
        this.formEdit = true;
        this.formIndex = false;
    }
}
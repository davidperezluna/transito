import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { UserLicenciaTransitoService } from "../../services/userLicenciaTransito.service";
import swal from 'sweetalert2';
import { FroTrteCfgConcepto } from './userLicenciaTransito.modelo';
declare var $: any;

@Component({
    selector: 'app-index',
    templateUrl: './userLicenciaTransito.component.html'
})

export class UserLicenciaTransitoComponent implements OnInit {
    public errorMessage;
    public formIndex = true;
    public formNew = false;
    public formEdit = false;
    public table: any = null;
    public tramitesConceptos;
    public tramiteConcepto: FroTrteCfgConcepto;

    constructor(
        private _LoginService: LoginService,
        private _LicenciaTransitoService: UserLicenciaTransitoService,
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
        this._LicenciaTransitoService.index().subscribe(
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
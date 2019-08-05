import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../../services/login.service';
import { FroTramiteService } from "../../../../services/froTramite.service";
import swal from 'sweetalert2';
import { FroTramite } from './froTramite.modelo';
declare var $: any;

@Component({
    selector: 'app-index',
    templateUrl: './froTramite.component.html'
})

export class FroTramiteComponent implements OnInit {
    public errorMessage;
    public formIndex = true;
    public formNew = false;
    public formEdit = false;
    public table: any = null;
    public tramites;
    public tramite: FroTramite;

    constructor(
        private _LoginService: LoginService,
        private _FroTramiteService: FroTramiteService,
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
        this._FroTramiteService.index().subscribe(
            response => {
                this.tramites = response.data;
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
        console.log(isCreado);
        if (isCreado) {
            this.formNew = false;
            this.formEdit = false;
            this.formIndex = true;
            this.ngOnInit();
        }
    }

    onEdit(tramite: any) {
        this.tramite = tramite;
        this.formEdit = true;
        this.formIndex = false;
    }
}
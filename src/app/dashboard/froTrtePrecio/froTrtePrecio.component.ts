import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { FroTrtePrecioService } from "../../services/froTrtePrecio.service";
import swal from 'sweetalert2';
import { FroTrtePrecio } from './froTrtePrecio.modelo';
declare var $: any;

@Component({
    selector: 'app-index',
    templateUrl: './froTrtePrecio.component.html'
})

export class FroTrtePrecioComponent implements OnInit {
    public errorMessage;
    public formIndex = true;
    public formNew = false;
    public formEdit = false;
    public table: any = null;
    public tramitesPrecios;
    public tramitePrecio: FroTrtePrecio;

    constructor(
        private _LoginService: LoginService,
        private _FroTrtePrecioService: FroTrtePrecioService,
    ) { }

    ngOnInit() {
        swal({
            title: 'Cargando Tabla!',
            text: 'Solo tardará unos segundos, por favor espere.',
            onOpen: () => {
                swal.showLoading();
            }
        });

        this._FroTrtePrecioService.index().subscribe(
            response => {
                this.tramitesPrecios = response.data;

                let timeoutId = setTimeout(() => {
                    this.iniciarTabla();
                }, 100);

                swal.close();
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
        if (this.table) {
            this.table.destroy();
        }
        
        $('#dataTables-example').DataTable({
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

    onEdit(tramitePrecio: any) {
        this.tramitePrecio = tramitePrecio;
        this.formEdit = true;
        this.formIndex = false;
    }
}
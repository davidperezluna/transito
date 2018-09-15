import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ComparendoService } from '../../../services/comparendo.service';
import { LoginService } from '../../../services/login.service';
import { Comparendo } from '../comparendo.modelo';
import swal from 'sweetalert2';
declare var $: any;

@Component({
    selector: 'app-index',
    templateUrl: './export.component.html'
})
export class ExportComponent implements OnInit {
    public errorMessage;
    public id;
    public respuesta;
    public formNew = false;
    public formEdit = false;
    public formIndex = true;
    public table: any;
    public comparendos: Comparendo;

    constructor(
        private _ComparendoService: ComparendoService,
        private _LoginService: LoginService,
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
        this._ComparendoService.export().subscribe(
            response => {
                this.comparendos = response.data;
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
            dom: 'Bfrtip',
            buttons: [
                'excel'
            ],
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

    ready(isCreado: any) {
        if (isCreado) {
            this.formNew = false;
            this.formEdit = false;
            this.formIndex = true;
            this.ngOnInit();
        }
    }
}
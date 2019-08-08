import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MsvEvaluacionService } from '../../../../../services/msvEvaluacion.service';
import { LoginService } from '../../../../../services/login.service';
import swal from 'sweetalert2';
declare var $: any;

@Component({
    selector: 'app-show-svevaluacion',
    templateUrl: './show.component.html'
})

export class ShowComponent implements OnInit {
    @Output() ready = new EventEmitter<any>();
    @Input() revision: any = null;
    public errorMessage;

    public calificaciones: any;
    public table: any = null;


    constructor(
        private _LoginService: LoginService,
        private _EvaluacionService: MsvEvaluacionService,
    ) { }

    ngOnInit() {
        let token = this._LoginService.getToken();

        swal({
            title: 'Cargando datos de la evaluación!',
            text: 'Solo tardará unos segundos, por favor espere.',
            timer: 3000,
            onOpen: () => {
                swal.showLoading()
            }
        }).then((result) => {
            if (
                // Read more about handling dismissals
                result.dismiss === swal.DismissReason.timer
            ) {
            }
        })

        this._EvaluacionService.showCalificacionByEvaluacion({ 'id': this.revision.id }, token).subscribe(
            response => {
                if (response.status == 'success') {
                    this.calificaciones = response.data;
                    swal({
                        title: 'Perfecto!',
                        html: response.message,
                        type: 'success',
                        confirmButtonText: 'Aceptar'
                    });
                    let timeoutId = setTimeout(() => {
                        this.onInitTable();
                    }, 100);
                } else {
                    swal({
                        title: 'Error!',
                        text: response.message,
                        type: 'error',
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

    onInitTable() {
        if (this.table) {
            this.table.destroy();
        } 

        this.table = $('#dataTables-example').DataTable({
            responsive: true,
            pageLength: 8,
            sPaginationType: 'full_numbers',
            dom: 'Bfrtip',
            buttons: [
                {
                    title: 'Evaluacion',
                    extend: 'excel',
                    text: 'Excel',
                    filename: 'Evaluacion',
                },
                {
                    title: 'Evaluacion',
                    extend: 'pdfHtml5',
                    orientation: 'landscape',
                    pageSize: 'LEGAL',
                    filename: 'EvaluacionPDF',
                }
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
    }

    onCancelar() {
        this.ready.emit(true);
    }
}
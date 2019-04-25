import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MsvEvaluacionService } from '../../../services/msvEvaluacion.service';
import { LoginService } from '../../../services/login.service';
import swal from 'sweetalert2';
declare var $: any;

@Component({
    selector: 'app-show',
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
    }

    onEnviar() {
        let token = this._LoginService.getToken();

        this._EvaluacionService.showCalificacionByEvaluacion(this.revision, token).subscribe(
            response => {
                if (response.status == 'success') {
                    this.ready.emit(true);
                    this.calificaciones = response.data;
                    swal({
                        title: 'Perfecto!',
                        html: response.message,
                        type: 'success',
                        confirmButtonText: 'Aceptar'
                    });
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

    onCancelar() {
        this.ready.emit(true);
    }
}
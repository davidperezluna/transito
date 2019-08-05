import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import swal from 'sweetalert2';
declare var $: any;

@Component({
    selector: 'app-show',
    templateUrl: './show.component.html'
})

export class ShowComponent implements OnInit {
    @Output() ready = new EventEmitter<any>();
    @Input() ipat: any = null;
    @Input() conductores: any = null;
    @Input() vehiculos: any = null;
    @Input() victimas: any = null;
    public errorMessage;
    public table: any = null;


    constructor(
    ) { }

    ngOnInit() {
        let timeoutId = setTimeout(() => {
            this.onInitTable();
        }, 100);
    }

    onInitTable() {
        this.table = $('#dataTables-example').DataTable({
            responsive: true,
            pageLength: 8,
            sPaginationType: 'full_numbers',
            dom: 'Bfrtip',
            buttons: [
                {
                    title: 'jhsjdhjasd',
                    extend: 'csvHtml5',
                    fieldSeparator: '|',
                    text: 'csv',
                    charset: 'utf-8',
                    filename: 'Ipat_' + this.ipat.consecutivo.numero,
                    fieldBoundary: '',
                    header: false,
                },
                
            ],
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
}
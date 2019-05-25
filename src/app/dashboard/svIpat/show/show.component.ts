import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import swal from 'sweetalert2';
declare var $: any;

@Component({
    selector: 'app-show',
    templateUrl: './show.component.html'
})

export class ShowComponent implements OnInit {
    @Output() ready = new EventEmitter<any>();
    @Input() ipatCreado: any = null;
    public errorMessage;
    public table: any = null;


    constructor(
    ) { }

    ngOnInit() {
        console.log(this.ipatCreado);
        let timeoutId = setTimeout(() => {
            this.onInitTable();
        }, 100);
    }

    onInitTable() {
        if(this.table) {
            this.table.destroy();
        }
        this.table = $('#dataTables-example').DataTable({
            responsive: true,
            pageLength: 8,
            sPaginationType: 'full_numbers',
            buttons: [
                {
                    title: 'jhsjdhjasd',
                    extend: 'csvHtml5',
                    fieldSeparator: '|',
                    text: 'csv',
                    filename: 'Ipat_' + this.ipatCreado.consecutivo.numero,
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
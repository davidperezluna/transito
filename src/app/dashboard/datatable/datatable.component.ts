import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
    selector: 'app-datatable-page',
    templateUrl: './datatable.component.html'
})

export class DatatableComponent implements OnInit {
  ngOnInit() {
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
  }
}

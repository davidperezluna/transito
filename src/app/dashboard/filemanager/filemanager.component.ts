import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
    selector: 'app-filemanager-page',
    templateUrl: './filemanager.component.html'
})

export class FilemanagerComponent implements OnInit {
   ngOnInit() {
    $('#html1').jstree({'plugins': ['wholerow', 'checkbox']});
  }
}

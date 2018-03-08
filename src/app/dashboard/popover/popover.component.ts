import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
    selector: 'app-popover-page',
    templateUrl: './popover.component.html'
})

export class PopoverComponent implements OnInit {
  ngOnInit() {
    $('[data-toggle="popover"]').popover();
  }
}

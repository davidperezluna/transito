import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
    selector: 'app-errorfour-page',
    templateUrl: './errorfour.component.html'
})

export class ErrorfourComponent implements OnInit {
  ngOnInit() { $('body').addClass('menuclose');
  }
}

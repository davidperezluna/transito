import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
    selector: 'app-errortwo-page',
    templateUrl: './errortwo.component.html'
})

export class ErrortwoComponent implements OnInit {
  ngOnInit() { $('body').addClass('menuclose');
  }
}

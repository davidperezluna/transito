import { Component, OnInit } from '@angular/core';
declare var $: any;
@Component({
    selector: 'app-errorone-page',
    templateUrl: './errorone.component.html'
})

export class ErroroneComponent implements OnInit {
  ngOnInit() { $('body').addClass('menuclose');
  }
}

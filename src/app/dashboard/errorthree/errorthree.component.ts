import { Component, OnInit } from '@angular/core';
declare var $: any;
@Component({
    selector: 'app-errorthree-page',
    templateUrl: './errorthree.component.html'
})

export class ErrorthreeComponent implements OnInit {
  ngOnInit() { $('body').addClass('menuclose');
  }
}

import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
    selector: 'app-footable-page',
    templateUrl: './footable.component.html'
})

export class FootableComponent implements OnInit {
  ngOnInit() {
  $('.table').footable({
    'paging': {
      'enabled': true,
      'position': 'center'
    }
  });
  }
}

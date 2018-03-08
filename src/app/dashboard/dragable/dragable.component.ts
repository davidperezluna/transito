import { Component } from '@angular/core';

@Component({
    selector: 'app-dragable-page',
    templateUrl: './dragable.component.html'
})

export class DragableComponent {
itemStringsLeft: any[] = [
    'Windstorm',
    'Bombasto',
    'Magneta',
    'Tornado'
  ];

  itemStringsRight: any[] = ['Mr. O', 'Tomato'];
}

import { Component } from '@angular/core';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';


@Component({
    selector: 'app-picker-page',
    templateUrl: './picker.component.html'
})

export class PickerComponent {
  color = '#ceb33e';
  minDate = new Date(2017, 5, 10);
  maxDate = new Date(2018, 9, 15);

  bsValue: Date = new Date();
  bsRangeValue: any = [new Date(2017, 7, 4), new Date(2017, 7, 20)];

  colorTheme = 'theme-green';
  bsConfig: Partial<BsDatepickerConfig>;
  applyTheme(pop: any) {
    // create new object on each property change
    // so Angular can catch object reference change
    this.bsConfig = Object.assign({}, { containerClass: this.colorTheme });
    setTimeout(() => {
      pop.show();
    });
  }


}

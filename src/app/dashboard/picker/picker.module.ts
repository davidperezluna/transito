import { NgModule } from '@angular/core';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { FormsModule } from '@angular/forms';
import { ColorPickerModule } from 'ngx-color-picker';
import { PickerComponent } from './picker.component';

@NgModule({
    imports: [BsDatepickerModule.forRoot(), FormsModule, ColorPickerModule],
    declarations: [PickerComponent],
    exports: [PickerComponent]
})
export class PickerpageModule {}

import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts';
import { ChartjsComponent } from './chartjs.component';

@NgModule({
    imports: [ChartsModule],
    declarations: [ChartjsComponent],
    exports: [ChartjsComponent]
})

export class ChartjsModule { }

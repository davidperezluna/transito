import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RtlComponent } from './rtl.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { ChartsModule } from 'ng2-charts';

import { TimelineComponent, ChatComponent, NotificationComponent, LineChartComponent } from './rtl.component';

@NgModule({
    imports: [CommonModule, ChartsModule, Ng2BootstrapModule.forRoot()],
    declarations: [RtlComponent, TimelineComponent, ChatComponent, NotificationComponent, LineChartComponent],
    exports: [RtlComponent, TimelineComponent, ChatComponent, NotificationComponent, LineChartComponent]
})

export class RtlModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LtrComponent } from './ltr.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { ChartsModule } from 'ng2-charts';

import { TimelineComponent, ChatComponent, NotificationComponent, LineChartComponent } from './ltr.component';

@NgModule({
    imports: [CommonModule, ChartsModule, Ng2BootstrapModule.forRoot()],
    declarations: [LtrComponent, TimelineComponent, ChatComponent, NotificationComponent, LineChartComponent],
    exports: [LtrComponent, TimelineComponent, ChatComponent, NotificationComponent, LineChartComponent]
})

export class LtrModule { }

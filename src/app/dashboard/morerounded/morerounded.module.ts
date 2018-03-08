import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoreroundedComponent } from './morerounded.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { ChartsModule } from 'ng2-charts';

import { TimelineComponent, ChatComponent, NotificationComponent, LineChartComponent } from './morerounded.component';

@NgModule({
    imports: [CommonModule, ChartsModule, Ng2BootstrapModule.forRoot()],
    declarations: [MoreroundedComponent, TimelineComponent, ChatComponent, NotificationComponent, LineChartComponent],
    exports: [MoreroundedComponent, TimelineComponent, ChatComponent, NotificationComponent, LineChartComponent]
})

export class MoreroundedModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { ChartsModule } from 'ng2-charts';

import { TimelineComponent, ChatComponent, NotificationComponent, LineChartComponent } from './home.component';

@NgModule({
    imports: [CommonModule, ChartsModule, Ng2BootstrapModule.forRoot()],
    declarations: [HomeComponent, TimelineComponent, ChatComponent, NotificationComponent, LineChartComponent],
    exports: [HomeComponent, TimelineComponent, ChatComponent, NotificationComponent, LineChartComponent]
})

export class HomeModule { }

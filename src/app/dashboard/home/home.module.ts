/*import { NgModule } from '@angular/core';
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

export class HomeModule { }*/

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { HomeRoutes } from './home.routes';
import { HomeComponent } from '.';
import { TimelineComponent, ChatComponent, NotificationComponent, LineChartComponent } from './home.component';

@NgModule({
    imports: [
        CommonModule,
        ChartsModule,
        Ng2BootstrapModule.forRoot(),
        FormsModule,
        HomeRoutes
    ],
    declarations: [
        HomeComponent,
        TimelineComponent,
        ChatComponent,
        NotificationComponent,
        LineChartComponent
    ],
    providers: [],
})
export class HomeModule { }

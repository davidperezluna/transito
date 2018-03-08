import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NetworkingComponent, LineChartComponent } from './networking.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { ChartsModule } from 'ng2-charts';



@NgModule({
    imports: [CommonModule, ChartsModule, Ng2BootstrapModule.forRoot()],
    declarations: [NetworkingComponent, LineChartComponent],
    exports: [NetworkingComponent, LineChartComponent]
})

export class NetworkingModule { }

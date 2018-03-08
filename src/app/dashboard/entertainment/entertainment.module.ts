import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntertainmentComponent } from './entertainment.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { ChartsModule } from 'ng2-charts';


@NgModule({
    imports: [CommonModule, ChartsModule, Ng2BootstrapModule.forRoot()],
    declarations: [EntertainmentComponent],
    exports: [EntertainmentComponent]
})

export class EntertainmentModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CvAcuerdoPagoComponent } from './cvAcuerdoPago.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { CvAcuerdoPagoService } from '../../services/cvAcuerdoPago.service';
import { FroAcuerdoPagoService } from '../../services/froAcuerdoPago.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { SelectModule } from 'angular2-select';

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [CvAcuerdoPagoComponent,NewComponent,EditComponent],
    exports: [CvAcuerdoPagoComponent, NewComponent,EditComponent],
    providers:[CvAcuerdoPagoService,FroAcuerdoPagoService]
})

export class CvAcuerdoPagoModule { }

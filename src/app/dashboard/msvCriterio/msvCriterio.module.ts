import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MsvCriterioComponent } from './msvCriterio.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { MsvCriterioService } from '../../services/msvCriterio.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { SelectModule } from 'angular2-select';

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(), SelectModule],
    declarations: [MsvCriterioComponent, NewComponent, EditComponent],
    exports: [MsvCriterioComponent, NewComponent, EditComponent],
    providers: [MsvCriterioService]
})

export class MsvCriterioModule { }

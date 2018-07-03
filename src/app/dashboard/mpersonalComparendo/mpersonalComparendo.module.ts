import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MpersonalComparendoComponent } from './mpersonalComparendo.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { MpersonalComparendoService } from '../../services/mpersonalComparendo.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { SelectModule } from 'angular2-select';


@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [MpersonalComparendoComponent,NewComponent,EditComponent],
    exports: [MpersonalComparendoComponent, NewComponent,EditComponent],
    providers:[MpersonalComparendoService]
})

export class MpersonalComparendoModule { }

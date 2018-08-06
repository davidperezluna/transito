import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MparqPatioComponent } from './mparqPatio.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { MparqPatioService } from '../../services/mparqPatio.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { SelectModule } from 'angular2-select';

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [MparqPatioComponent,NewComponent,EditComponent],
    exports: [MparqPatioComponent, NewComponent,EditComponent],
    providers:[MparqPatioService]
})

export class MparqPatioModule { }

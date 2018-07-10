import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MsvRevisionComponent } from './msvRevision.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { MsvRevisionService } from '../../services/msvRevision.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { SelectModule } from 'angular2-select';


@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [MsvRevisionComponent,NewComponent,EditComponent],
    exports: [MsvRevisionComponent, NewComponent,EditComponent],
    providers:[MsvRevisionService]
})

export class MsvRevisionModule { }

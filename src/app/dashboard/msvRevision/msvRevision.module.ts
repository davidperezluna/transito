import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { msvRevisionComponent } from './msvRevision.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { msvRevisionService } from '../../services/msvRevision.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { SelectModule } from 'angular2-select';


@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [msvRevisionComponent,NewComponent,EditComponent],
    exports: [msvRevisionComponent, NewComponent,EditComponent],
    providers:[msvRevisionComponent]
})

export class msvRevisionModule { }

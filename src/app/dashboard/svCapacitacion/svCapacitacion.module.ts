import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SvCapacitacionComponent } from './svCapacitacion.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { SvCapacitacionService } from '../../services/svCapacitacion.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { ShowComponent } from './show/show.component';
import { SelectModule } from 'angular2-select';

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(), SelectModule],
    declarations: [SvCapacitacionComponent, NewComponent, EditComponent, ShowComponent],
    exports: [SvCapacitacionComponent, NewComponent, EditComponent, ShowComponent],
    providers: [SvCapacitacionService]
})

export class SvCapacitacionModule { }

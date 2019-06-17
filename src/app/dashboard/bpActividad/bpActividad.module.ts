import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BpActividadComponent } from './bpActividad.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { BpActividadService } from '../../services/bpActividad.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { SelectModule } from 'angular2-select';

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [BpActividadComponent,NewComponent,EditComponent],
    exports: [BpActividadComponent, NewComponent,EditComponent],
    providers:[BpActividadService]
})

export class BpActividadModule { }

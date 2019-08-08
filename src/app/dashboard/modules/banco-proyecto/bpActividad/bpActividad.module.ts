import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { SelectModule } from 'angular2-select';

import { BpActividadService } from '../../../../services/bpActividad.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { IndexComponent } from './index/index.component';

import { BpInsumoModule } from '../bpInsumo/bpInsumo.module';

@NgModule({
    imports: [
        CommonModule,
        Ng2BootstrapModule.forRoot(),
        SelectModule,
        BpInsumoModule,
    ],
    declarations: [
        NewComponent,
        EditComponent,
        IndexComponent,
    ],
    exports: [
        NewComponent,
        EditComponent,
        IndexComponent,
    ],
    providers:[BpActividadService]
})

export class BpActividadModule { }

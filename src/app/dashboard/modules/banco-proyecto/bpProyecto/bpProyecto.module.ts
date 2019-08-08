import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectModule } from 'angular2-select';
import { Ng2BootstrapModule } from 'ng2-bootstrap';

import { BpProyectoService } from '../../../../services/bpProyecto.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { ShowComponent } from './show/show.component';

import { BpCuentaModule } from '../bpCuenta/bpCuenta.module';

@NgModule({
    imports: [
        CommonModule,
        Ng2BootstrapModule.forRoot(),
        SelectModule,
        BpCuentaModule,
    ],
    declarations: [
        NewComponent,
        EditComponent,
        ShowComponent
    ],
    exports: [
        NewComponent,
        EditComponent,
        ShowComponent
    ],
    providers: [BpProyectoService]
})

export class BpProyectoModule { }

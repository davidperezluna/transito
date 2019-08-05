import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectModule } from 'angular2-select';
import { Ng2BootstrapModule } from 'ng2-bootstrap';

import { BpCuentaService } from '../../../../services/bpCuenta.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { IndexComponent } from './index/index.component';

@NgModule({
    imports: [
        CommonModule,
        Ng2BootstrapModule.forRoot(),
        SelectModule
    ],
    declarations: [
        NewComponent,
        EditComponent,
        IndexComponent
    ],
    exports: [
        NewComponent,
        EditComponent,
        IndexComponent
    ],
    providers:[BpCuentaService]
})

export class BpCuentaModule { }

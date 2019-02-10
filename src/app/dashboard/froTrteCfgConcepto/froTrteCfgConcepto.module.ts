import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FroTrteCfgConceptoComponent } from './froTrteCfgConcepto.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { FroTrteCfgConceptoService } from '../../services/froTrteCfgConcepto.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { SelectModule } from 'angular2-select';

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(), SelectModule],
    declarations: [FroTrteCfgConceptoComponent, NewComponent, EditComponent],
    exports: [FroTrteCfgConceptoComponent, NewComponent, EditComponent],
    providers: [FroTrteCfgConceptoService]
})

export class FroTrteCfgConceptoModule { }

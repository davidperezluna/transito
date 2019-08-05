import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SvCfgEstadoViaComponent } from './svCfgEstadoVia.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { SvCfgEstadoViaService } from '../../../../services/svCfgEstadoVia.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { SelectModule } from 'angular2-select';

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(), SelectModule],
    declarations: [SvCfgEstadoViaComponent, NewComponent, EditComponent],
    exports: [SvCfgEstadoViaComponent, NewComponent, EditComponent],
    providers: [SvCfgEstadoViaService]
})

export class SvCfgEstadoViaModule { }

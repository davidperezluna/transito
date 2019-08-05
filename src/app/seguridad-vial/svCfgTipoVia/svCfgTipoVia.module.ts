import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SvCfgTipoViaComponent } from './svCfgTipoVia.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { SvCfgTipoViaService } from '../../services/svCfgTipoVia.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { SelectModule } from 'angular2-select';

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(), SelectModule],
    declarations: [SvCfgTipoViaComponent, NewComponent, EditComponent],
    exports: [SvCfgTipoViaComponent, NewComponent, EditComponent],
    providers: [SvCfgTipoViaService]
})

export class SvCfgTipoViaModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SvCfgTipoControlComponent } from './svCfgTipoControl.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { SvCfgTipoControlService } from '../../services/svCfgTipoControl.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { SelectModule } from 'angular2-select';

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(), SelectModule],
    declarations: [SvCfgTipoControlComponent, NewComponent, EditComponent],
    exports: [SvCfgTipoControlComponent, NewComponent, EditComponent],
    providers: [SvCfgTipoControlService]
})

export class SvCfgTipoControlModule { }

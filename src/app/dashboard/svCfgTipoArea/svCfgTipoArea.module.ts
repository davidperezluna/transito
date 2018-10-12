import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SvCfgTipoAreaComponent } from './svCfgTipoArea.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { SvCfgTipoAreaService } from '../../services/svCfgTipoArea.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { SelectModule } from 'angular2-select';

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(), SelectModule],
    declarations: [SvCfgTipoAreaComponent, NewComponent, EditComponent],
    exports: [SvCfgTipoAreaComponent, NewComponent, EditComponent],
    providers: [SvCfgTipoAreaService]
})

export class SvCfgTipoAreaModule { }

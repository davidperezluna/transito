import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SvCfgTipoVictimaComponent } from './svCfgTipoVictima.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { SvCfgTipoVictimaService } from '../../services/svCfgTipoVictima.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { SelectModule } from 'angular2-select';

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(), SelectModule],
    declarations: [SvCfgTipoVictimaComponent, NewComponent, EditComponent],
    exports: [SvCfgTipoVictimaComponent, NewComponent, EditComponent],
    providers: [SvCfgTipoVictimaService]
})

export class SvCfgTipoVictimaModule { }

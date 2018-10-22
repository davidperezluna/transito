import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SvCfgTipoControlesTransitoComponent } from './svCfgTipoControlesTransito.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { SvCfgTipoControlesTransitoService } from '../../services/svCfgTipoControlesTransito.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { SelectModule } from 'angular2-select';

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(), SelectModule],
    declarations: [SvCfgTipoControlesTransitoComponent, NewComponent, EditComponent],
    exports: [SvCfgTipoControlesTransitoComponent, NewComponent, EditComponent],
    providers: [SvCfgTipoControlesTransitoService]
})

export class SvCfgTipoControlesTransitoModule { }

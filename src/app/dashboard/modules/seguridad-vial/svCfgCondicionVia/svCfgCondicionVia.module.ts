import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SvCfgCondicionViaComponent } from './svCfgCondicionVia.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { SvCfgCondicionViaService } from '../../../../services/svCfgCondicionVia.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { SelectModule } from 'angular2-select';

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(), SelectModule],
    declarations: [SvCfgCondicionViaComponent, NewComponent, EditComponent],
    exports: [SvCfgCondicionViaComponent, NewComponent, EditComponent],
    providers: [SvCfgCondicionViaService]
})

export class SvCfgCondicionViaModule { }

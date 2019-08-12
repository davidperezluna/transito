import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SvCfgParametroService } from '../../../../services/svCfgParametro.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { SelectModule } from 'angular2-select';
import { Ng2BootstrapModule } from 'ng2-bootstrap';

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(), SelectModule],
    declarations: [NewComponent, EditComponent],
    exports: [NewComponent, EditComponent],
    providers: [SvCfgParametroService]
})

export class SvCfgParametroModule { }

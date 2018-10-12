import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SvCfgDisenioComponent } from './svCfgDisenio.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { SvCfgDisenioService } from '../../services/svCfgDisenio.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { SelectModule } from 'angular2-select';

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(), SelectModule],
    declarations: [SvCfgDisenioComponent, NewComponent, EditComponent],
    exports: [SvCfgDisenioComponent, NewComponent, EditComponent],
    providers: [SvCfgDisenioService]
})

export class SvCfgDisenioModule { }

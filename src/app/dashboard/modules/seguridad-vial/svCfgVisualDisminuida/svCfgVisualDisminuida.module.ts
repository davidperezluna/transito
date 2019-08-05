import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SvCfgVisualDisminuidaComponent } from './svCfgVisualDisminuida.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { SvCfgVisualDisminuidaService } from '../../../../services/svCfgVisualDisminuida.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { SelectModule } from 'angular2-select';

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(), SelectModule],
    declarations: [SvCfgVisualDisminuidaComponent, NewComponent, EditComponent],
    exports: [SvCfgVisualDisminuidaComponent, NewComponent, EditComponent],
    providers: [SvCfgVisualDisminuidaService]
})

export class SvCfgVisualDisminuidaModule { }

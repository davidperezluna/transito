import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SvCfgClaseActorViaComponent } from './svCfgClaseActorVia.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { SvCfgClaseActorViaService } from '../../../../services/svCfgClaseActorVia.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { SelectModule } from 'angular2-select';

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(), SelectModule],
    declarations: [SvCfgClaseActorViaComponent, NewComponent, EditComponent],
    exports: [SvCfgClaseActorViaComponent, NewComponent, EditComponent],
    providers: [SvCfgClaseActorViaService]
})

export class SvCfgClaseActorViaModule { }
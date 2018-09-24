import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SvCfgClaseActorViaComponent } from './svCfgActorVia.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { SvCfgClaseActorViaService } from '../../services/svCfgClaseActorVia.service';

import { SelectModule } from 'angular2-select';

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(), SelectModule],
    declarations: [SvCfgClaseActorViaComponent],
    exports: [SvCfgClaseActorViaComponent],
    providers: [SvCfgClaseActorViaService]
})

export class SvCfgClaseActorViaModule { }
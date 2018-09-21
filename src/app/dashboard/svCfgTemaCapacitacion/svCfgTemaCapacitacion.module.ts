import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SvCfgTemaCapacitacionComponent } from './svCfgTemaCapacitacion.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { SvCfgTemaCapacitacionService } from '../../services/svCfgTemaCapacitacion.service';

import { SelectModule } from 'angular2-select';

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(), SelectModule],
    declarations: [SvCfgTemaCapacitacionComponent],
    exports: [SvCfgTemaCapacitacionComponent],
    providers: [SvCfgTemaCapacitacionService]
})

export class SvCfgTemaCapacitacionModule { }
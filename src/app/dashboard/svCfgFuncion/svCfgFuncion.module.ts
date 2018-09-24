import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SvCfgFuncionComponent } from './svCfgFuncion.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { SvCfgFuncionService } from '../../services/svCfgFuncion.service';

import { SelectModule } from 'angular2-select';

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(), SelectModule],
    declarations: [SvCfgFuncionComponent],
    exports: [SvCfgFuncionComponent],
    providers: [SvCfgFuncionService]
})

export class SvCfgFuncionModule { }
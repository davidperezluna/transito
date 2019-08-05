import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SvCfgFuncionComponent } from './svCfgFuncion.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { SvCfgFuncionService } from '../../../../services/svCfgFuncion.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { SelectModule } from 'angular2-select';

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(), SelectModule],
    declarations: [SvCfgFuncionComponent, NewComponent, EditComponent],
    exports: [SvCfgFuncionComponent, NewComponent, EditComponent],
    providers: [SvCfgFuncionService]
})

export class SvCfgFuncionModule { }
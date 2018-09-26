import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SvCfgFuncionCriterioComponent } from './svCfgFuncionCriterio.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { SvCfgFuncionCriterioService } from '../../services/svCfgFuncionCriterio.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { SelectModule } from 'angular2-select';

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(), SelectModule],
    declarations: [SvCfgFuncionCriterioComponent, NewComponent, EditComponent],
    exports: [SvCfgFuncionCriterioComponent, NewComponent, EditComponent],
    providers: [SvCfgFuncionCriterioService]
})

export class SvCfgFuncionCriterioModule { }
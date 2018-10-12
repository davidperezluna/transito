import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SvCfgLugarImpactoComponent } from './svCfgLugarImpacto.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { SvCfgLugarImpactoService } from '../../services/svCfgLugarImpacto.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { SelectModule } from 'angular2-select';

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(), SelectModule],
    declarations: [SvCfgLugarImpactoComponent, NewComponent, EditComponent],
    exports: [SvCfgLugarImpactoComponent, NewComponent, EditComponent],
    providers: [SvCfgLugarImpactoService]
})

export class SvCfgLugarImpactoModule { }

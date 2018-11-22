import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SvCfgSenialConectorComponent } from './svCfgSenialConector.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { SvCfgSenialConectorService } from '../../services/svCfgSenialConector.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { SelectModule } from 'angular2-select';

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [SvCfgSenialConectorComponent,NewComponent,EditComponent],
    exports: [SvCfgSenialConectorComponent, NewComponent,EditComponent],
    providers:[SvCfgSenialConectorService]
})

export class SvCfgSenialConectorModule { }

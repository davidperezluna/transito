import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SvCfgHipotesisComponent } from './svCfgHipotesis.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { SvCfgHipotesisService } from '../../../../services/svCfgHipotesis.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { SelectModule } from 'angular2-select';

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(), SelectModule],
    declarations: [SvCfgHipotesisComponent, NewComponent, EditComponent],
    exports: [SvCfgHipotesisComponent, NewComponent, EditComponent],
    providers: [SvCfgHipotesisService]
})

export class SvCfgHipotesisModule { }

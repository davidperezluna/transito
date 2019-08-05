import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SvCfgSenialColorComponent } from './svCfgSenialColor.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { SvCfgSenialColorService } from '../../../../services/svCfgSenialColor.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { SelectModule } from 'angular2-select';

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [SvCfgSenialColorComponent,NewComponent,EditComponent],
    exports: [SvCfgSenialColorComponent, NewComponent,EditComponent],
    providers:[SvCfgSenialColorService]
})

export class SvCfgSenialColorModule { }

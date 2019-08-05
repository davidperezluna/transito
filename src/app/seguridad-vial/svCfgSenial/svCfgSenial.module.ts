import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SvCfgSenialComponent } from './svCfgSenial.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { SvCfgSenialService } from '../../services/svCfgSenial.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { SelectModule } from 'angular2-select';

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [SvCfgSenialComponent,NewComponent,EditComponent],
    exports: [SvCfgSenialComponent, NewComponent,EditComponent],
    providers:[SvCfgSenialService]     
})

export class SvCfgSenialModule { }

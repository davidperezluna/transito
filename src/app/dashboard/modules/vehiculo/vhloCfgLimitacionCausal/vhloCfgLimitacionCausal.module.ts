import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VhloCfgLimitacionCausalComponent } from './vhloCfgLimitacionCausal.component';
import { VhloCfgLimitacionCausalService } from '../../../../services/vhloCfgLimitacionCausal.service';
import { Ng2BootstrapModule } from 'ng2-bootstrap';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import {SelectModule} from 'angular2-select';
// import {SelectModule} from 'angular2-select';


@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [VhloCfgLimitacionCausalComponent,NewComponent,EditComponent],
    exports: [VhloCfgLimitacionCausalComponent, NewComponent,EditComponent],
    providers:[VhloCfgLimitacionCausalService]
})

export class VhloCfgLimitacionCausalModule { }

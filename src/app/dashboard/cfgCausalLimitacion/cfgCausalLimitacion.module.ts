import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CfgCausalLimitacionComponent } from './cfgCausalLimitacion.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { CfgCausalLimitacionService } from '../../services/cfgCausalLimitacion.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import {SelectModule} from 'angular2-select';
// import {SelectModule} from 'angular2-select';


@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [CfgCausalLimitacionComponent,NewComponent,EditComponent],
    exports: [CfgCausalLimitacionComponent, NewComponent,EditComponent],
    providers:[CfgCausalLimitacionService]
})

export class CfgCausalLimitacionModule { }

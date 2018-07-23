import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CfgEntidadJudicialComponent } from './cfgEntidadJudicial.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { CfgEntidadJudicialService } from '../../services/cfgEntidadJudicial.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import {SelectModule} from 'angular2-select';
// import {SelectModule} from 'angular2-select';


@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [CfgEntidadJudicialComponent,NewComponent,EditComponent],
    exports: [CfgEntidadJudicialComponent, NewComponent,EditComponent],
    providers: [CfgEntidadJudicialService]
})

export class CfgEntidadJudicialModule { }

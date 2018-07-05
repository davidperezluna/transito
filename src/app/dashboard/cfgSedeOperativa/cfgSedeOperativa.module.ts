import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CfgSedeOperativaComponent } from './cfgSedeOperativa.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { SedeOperativaService } from '../../services/sedeOperativa.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import {SelectModule} from 'angular2-select';
// import {SelectModule} from 'angular2-select';


@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [CfgSedeOperativaComponent,NewComponent,EditComponent],
    exports: [CfgSedeOperativaComponent, NewComponent,EditComponent],
    providers:[SedeOperativaService]
})

export class CfgSedeOperativaModule { }

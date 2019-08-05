import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CfgChoqueConComponent } from './cfgChoqueCon.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { CfgChoqueConService } from '../../../../services/svCfgChoqueCon.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import {SelectModule} from 'angular2-select';
// import {SelectModule} from 'angular2-select';


@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [CfgChoqueConComponent,NewComponent,EditComponent],
    exports: [CfgChoqueConComponent, NewComponent,EditComponent],
    providers:[CfgChoqueConService]
})

export class CfgChoqueConModule { }

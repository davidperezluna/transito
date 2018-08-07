import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CfgGravedadComponent } from './cfgGravedad.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { CfgGravedadService } from '../../services/cfgGravedad.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import {SelectModule} from 'angular2-select';
// import {SelectModule} from 'angular2-select';


@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [CfgGravedadComponent,NewComponent,EditComponent],
    exports: [CfgGravedadComponent, NewComponent,EditComponent],
    providers:[CfgGravedadService]
})

export class CfgGravedadModule { }

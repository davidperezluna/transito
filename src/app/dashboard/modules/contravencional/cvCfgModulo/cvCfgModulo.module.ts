import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { SelectModule } from 'angular2-select';
import { TooltipModule } from "ngx-tooltip";

import { CvCfgModuloService } from '../../../../services/cvCfgModulo.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { StatesComponent } from './states/states.component';

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(), SelectModule, TooltipModule],
    declarations: [
        NewComponent,
        EditComponent,
        StatesComponent
    ],
    exports: [
        NewComponent,
        EditComponent,
        StatesComponent
    ],
    providers:[CvCfgModuloService]
})

export class CvCfgModuloModule { }

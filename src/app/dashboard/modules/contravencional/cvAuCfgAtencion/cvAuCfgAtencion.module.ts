import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CvAuCfgAtencionComponent } from './cvAuCfgAtencion.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { CvAuCfgAtencionService } from '../../../../services/cvAuCfgAtencion.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { SelectModule } from 'angular2-select';

import { TooltipModule } from "ngx-tooltip"; 

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(), SelectModule, TooltipModule],
    declarations: [CvAuCfgAtencionComponent,NewComponent,EditComponent],
    exports: [CvAuCfgAtencionComponent, NewComponent,EditComponent],
    providers:[CvAuCfgAtencionService]
})

export class CvAuCfgAtencionModule { }

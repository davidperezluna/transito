import {
    NgModule, 
    Component,
    ChangeDetectionStrategy,
    ViewChild,
    TemplateRef 
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CvAudienciaComponent } from './cvAudiencia.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { CvAudienciaService } from '../../services/cvAudiencia.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { ShowComponent } from './show/show.component';
import { SelectModule } from 'angular2-select';

@NgModule({
    imports: [
        CommonModule, 
        Ng2BootstrapModule.forRoot(),
        SelectModule
    ],
    declarations: [CvAudienciaComponent,NewComponent,EditComponent,ShowComponent],
    exports: [CvAudienciaComponent, NewComponent,EditComponent,ShowComponent],
    providers:[CvAudienciaService]
})

export class CvAudienciaModule { }

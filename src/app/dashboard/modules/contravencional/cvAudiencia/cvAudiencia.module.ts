import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { SelectModule } from 'angular2-select';

import { CvAudienciaService } from '../../../../services/cvAudiencia.service';
import { CvAuEstadoService } from '../../../../services/cvAuEstado.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { ShowComponent } from './show/show.component';

@NgModule({
    imports: [
        CommonModule, 
        Ng2BootstrapModule.forRoot(),
        SelectModule
    ],
    declarations: [NewComponent,EditComponent,ShowComponent],
    exports: [NewComponent,EditComponent,ShowComponent],
    providers:[
        CvAudienciaService,
        CvAuEstadoService
    ],
    schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]  
})

export class CvAudienciaModule { }

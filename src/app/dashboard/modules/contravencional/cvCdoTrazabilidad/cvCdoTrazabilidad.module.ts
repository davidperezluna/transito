import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CvCdoTrazabilidadComponent } from './cvCdoTrazabilidad.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { CvCdoTrazabilidadService } from '../../../../services/cvCdoTrazabilidad.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { SelectModule } from 'angular2-select';

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [CvCdoTrazabilidadComponent,NewComponent,EditComponent],
    exports: [CvCdoTrazabilidadComponent, NewComponent,EditComponent],
    providers:[CvCdoTrazabilidadService]
})

export class CvCdoTrazabilidadModule { }

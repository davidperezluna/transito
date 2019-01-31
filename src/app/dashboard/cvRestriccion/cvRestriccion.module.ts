import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CvRestriccionComponent } from './cvRestriccion.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { CvLcCfgRestriccionService } from '../../services/cvLcCfgRestriccion.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { SelectModule } from 'angular2-select';

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [CvRestriccionComponent,NewComponent,EditComponent],
    exports: [CvRestriccionComponent, NewComponent,EditComponent],
    providers:[CvLcCfgRestriccionService]     
})

export class CvRestriccionModule { }

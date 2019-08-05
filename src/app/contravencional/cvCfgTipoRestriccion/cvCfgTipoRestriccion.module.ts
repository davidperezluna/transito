import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CvCfgTipoRestriccionComponent } from './cvCfgTipoRestriccion.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { CvCfgTipoRestriccionService } from '../../services/cvCfgTipoRestriccion.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { SelectModule } from 'angular2-select';

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [CvCfgTipoRestriccionComponent,NewComponent,EditComponent],
    exports: [CvCfgTipoRestriccionComponent, NewComponent,EditComponent],
    providers:[CvCfgTipoRestriccionService]
})

export class CvCfgTipoRestriccionModule { }

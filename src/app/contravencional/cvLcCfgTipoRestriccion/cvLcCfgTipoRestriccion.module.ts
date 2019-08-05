import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CvLcCfgTipoRestriccionComponent } from './cvLcCfgTipoRestriccion.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { CvLcCfgTipoRestriccionService } from '../../services/cvLcCfgTipoRestriccion.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { SelectModule } from 'angular2-select';

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [CvLcCfgTipoRestriccionComponent,NewComponent,EditComponent],
    exports: [CvLcCfgTipoRestriccionComponent, NewComponent,EditComponent],
    providers:[CvLcCfgTipoRestriccionService]
})

export class CvLcCfgTipoRestriccionModule { }

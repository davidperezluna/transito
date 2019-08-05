import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CvCfgInteresComponent } from './cvCfgInteres.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { CvCfgInteresService } from '../../../../services/cvCfgInteres.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { SelectModule } from 'angular2-select';

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [CvCfgInteresComponent,NewComponent,EditComponent],
    exports: [CvCfgInteresComponent, NewComponent,EditComponent],
    providers:[CvCfgInteresService]
})

export class CvCfgInteresModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CvCdoCfgInteresComponent } from './cvCdoCfgInteres.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { CvCdoCfgInteresService } from '../../services/cvCdoCfgInteres.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { SelectModule } from 'angular2-select';

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [CvCdoCfgInteresComponent,NewComponent,EditComponent],
    exports: [CvCdoCfgInteresComponent, NewComponent,EditComponent],
    providers:[CvCdoCfgInteresService]
})

export class CvCdoCfgInteresModule { }

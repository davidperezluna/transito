import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { SelectModule } from 'angular2-select';

import { CvCdoCfgInteresService } from '../../../../services/cvCdoCfgInteres.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [NewComponent,EditComponent],
    exports: [NewComponent,EditComponent],
    providers:[CvCdoCfgInteresService]
})

export class CvCdoCfgInteresModule { }

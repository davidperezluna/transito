import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CvLcCfgMotivoComponent } from './cvLcCfgMotivo.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { CvLcCfgMotivoService } from '../../services/cvLcCfgMotivo.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { SelectModule } from 'angular2-select';

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [CvLcCfgMotivoComponent,NewComponent,EditComponent],
    exports: [CvLcCfgMotivoComponent, NewComponent,EditComponent],
    providers:[CvLcCfgMotivoService]     
})

export class CvLcCfgMotivoModule { }

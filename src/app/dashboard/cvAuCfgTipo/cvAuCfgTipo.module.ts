import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CvAuCfgTipoComponent } from './cvAuCfgTipo.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { CvAuCfgTipoService } from '../../services/cvAuCfgTipo.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { SelectModule } from 'angular2-select';

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [CvAuCfgTipoComponent,NewComponent,EditComponent],
    exports: [CvAuCfgTipoComponent, NewComponent,EditComponent],
    providers:[CvAuCfgTipoService]
})

export class CvAuCfgTipoModule { }

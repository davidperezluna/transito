import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CvAuCfgHorarioComponent } from './cvAuCfgHorario.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { CvAuCfgHorarioService } from '../../services/cvAuCfgHorario.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { SelectModule } from 'angular2-select';

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [CvAuCfgHorarioComponent,NewComponent,EditComponent],
    exports: [CvAuCfgHorarioComponent, NewComponent,EditComponent],
    providers:[CvAuCfgHorarioService]
})

export class CvAuCfgHorarioModule { }

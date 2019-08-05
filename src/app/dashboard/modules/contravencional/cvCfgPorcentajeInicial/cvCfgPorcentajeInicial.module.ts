import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CvCfgPorcentajeInicialComponent } from './cvCfgPorcentajeInicial.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { CvCfgPorcentajeInicialService } from '../../../../services/cvCfgPorcentajeInicial.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { SelectModule } from 'angular2-select';

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [CvCfgPorcentajeInicialComponent,NewComponent,EditComponent],
    exports: [CvCfgPorcentajeInicialComponent, NewComponent,EditComponent],
    providers:[CvCfgPorcentajeInicialService]
})

export class CvCfgPorcentajeInicialModule { }

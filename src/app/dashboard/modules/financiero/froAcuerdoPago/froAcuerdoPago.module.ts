import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { SelectModule } from 'angular2-select';

import { FroAcuerdoPagoService } from '../../../../services/froAcuerdoPago.service';
import { CvCdoComparendoService } from '../../../../services/cvCdoComparendo.service';
import { CvCfgInteresService } from '../../../../services/cvCfgInteres.service';
import { CvCfgPorcentajeInicialService } from '../../../../services/cvCfgPorcentajeInicial.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [NewComponent,EditComponent],
    exports: [NewComponent,EditComponent],
    providers:[
        FroAcuerdoPagoService,
        CvCdoComparendoService,
        CvCfgInteresService,
        CvCfgPorcentajeInicialService,
    ]
})

export class FroAcuerdoPagoModule { }

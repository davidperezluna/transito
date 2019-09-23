import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { ChartsModule } from 'ng2-charts';

import { VhloRnaPreregistroService } from '../../../../services/vhloRnaPreregistro.service';
import { VhloCfgCarroceriaService } from '../../../../services/vhloCfgCarroceria.service';
import { VhloCfgRadioAccionService } from '../../../../services/vhloCfgRadioAccion.service';
import { VhloCfgModalidadTransporteService } from '../../../../services/vhloCfgModalidadTransporte.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';

import { SelectModule } from 'angular2-select';

@NgModule({
    imports: [CommonModule, ChartsModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [NewComponent,EditComponent],
    exports: [
        NewComponent,
        EditComponent
    ],
    providers:[
        VhloRnaPreregistroService,
        VhloCfgCarroceriaService,
        VhloCfgRadioAccionService,
        VhloCfgModalidadTransporteService
    ]
}) 

export class VhloRnmaPreregistroModule { }

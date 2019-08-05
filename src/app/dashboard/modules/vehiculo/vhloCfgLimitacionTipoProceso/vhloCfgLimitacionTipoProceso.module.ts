import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VhloCfgLimitacionTipoProcesoComponent } from './vhloCfgLimitacionTipoProceso.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { VhloCfgLimitacionTipoProcesoService } from '../../../../services/vhloCfgLimitacionTipoProceso.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import {SelectModule} from 'angular2-select';
// import {SelectModule} from 'angular2-select';


@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [VhloCfgLimitacionTipoProcesoComponent,NewComponent,EditComponent],
    exports: [VhloCfgLimitacionTipoProcesoComponent, NewComponent,EditComponent],
    providers: [VhloCfgLimitacionTipoProcesoService]
})

export class CfgTipoProcesoModule { }

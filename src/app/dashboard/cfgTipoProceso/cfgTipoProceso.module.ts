import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CfgTipoProcesoComponent } from './cfgTipoProceso.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { CfgTipoProcesoService } from '../../services/cfgTipoProceso.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import {SelectModule} from 'angular2-select';
// import {SelectModule} from 'angular2-select';


@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [CfgTipoProcesoComponent,NewComponent,EditComponent],
    exports: [CfgTipoProcesoComponent, NewComponent,EditComponent],
    providers: [CfgTipoProcesoService]
})

export class CfgTipoProcesoModule { }

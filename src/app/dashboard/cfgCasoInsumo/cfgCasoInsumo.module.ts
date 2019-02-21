import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CfgCasoInsumoComponent } from './cfgCasoInsumo.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { CfgCasoInsumoService } from '../../services/cfgCasoInsumo.service';
import { ImoCfgValorService } from '../../services/imoCfgValor.service';

import { NewComponent } from './new/new.component';
import { NewValorComponent } from './newValor/newValor.component';
import { EditComponent } from './edit/edit.component';
import {SelectModule} from 'angular2-select';
import { TooltipModule } from "ngx-tooltip";


@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule, TooltipModule],
    declarations: [CfgCasoInsumoComponent,NewComponent,EditComponent,NewValorComponent],
    exports: [CfgCasoInsumoComponent, NewComponent,EditComponent,NewValorComponent],
    providers:[CfgCasoInsumoService,ImoCfgValorService]
})

export class CfgCasoInsumoModule { }

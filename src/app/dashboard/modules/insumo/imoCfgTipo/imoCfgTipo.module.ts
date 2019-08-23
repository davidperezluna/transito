import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2BootstrapModule } from 'ng2-bootstrap';

import { NewComponent } from './new/new.component';
import { ValueComponent } from './value/value.component';
import { EditComponent } from './edit/edit.component';
import {SelectModule} from 'angular2-select';
import { TooltipModule } from "ngx-tooltip";

import { ImoCfgValorService } from '../../../../services/imoCfgValor.service';
import { ImoCfgTipoService } from '../../../../services/imoCfgTipo.service';
import { CfgModuloService } from '../../../../services/cfgModulo.service';


@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule, TooltipModule],
    declarations: [NewComponent,EditComponent,ValueComponent],
    exports: [NewComponent,EditComponent,ValueComponent],
    providers:[
        ImoCfgTipoService,
        ImoCfgValorService,
        ImoCfgValorService,
        ImoCfgTipoService,
        CfgModuloService,
            ]
})

export class ImoCfgTipoModule { }

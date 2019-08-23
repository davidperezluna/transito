import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { ImoCfgTipoService } from '../../../../services/imoCfgTipo.service';
import { ImoCfgValorService } from '../../../../services/imoCfgValor.service';

import { CfgOrganismoTransitoService } from '../../../../services/cfgOrganismoTransito.service';
import { ImoInsumoService } from '../../../../services/imoInsumo.service';
import { PnalFuncionarioService } from '../../../../services/pnalFuncionario.service';


import {SelectModule} from 'angular2-select';
import { TooltipModule } from "ngx-tooltip";


@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule, TooltipModule],
    declarations: [],
    exports: [],
    providers:[
        ImoCfgTipoService,
        ImoCfgValorService,
        CfgOrganismoTransitoService,
        ImoInsumoService,
        PnalFuncionarioService,
    ]
})

export class ImoActaModule { }

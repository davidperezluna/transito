import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { SelectModule } from 'angular2-select';

import { FroReporteIngresosService } from '../../../../services/froReporteIngresos.service';
import { FroFacturaService } from '../../../../services/froFactura.service';
import { FroCfgTipoRecaudoService } from "../../../../services/froCfgTipoRecaudo.service";
/* import { PnalFuncionarioService } from "../../../../services/pnalFuncionario.service"; */
import { CfgOrganismoTransitoService } from "../../../../services/cfgOrganismoTransito.service";

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(), SelectModule],
    declarations: [],
    exports: [],
    providers: [FroReporteIngresosService, FroFacturaService, FroCfgTipoRecaudoService, CfgOrganismoTransitoService]
})

export class FroReporteIngresosModule { }

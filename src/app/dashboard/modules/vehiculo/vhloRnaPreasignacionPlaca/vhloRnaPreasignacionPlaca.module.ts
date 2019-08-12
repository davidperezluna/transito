import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { SelectModule } from 'angular2-select';

import { VhloVehiculoService } from "../../../../services/vhloVehiculo.service";
import { VhloCfgPlacaService } from '../../../../services/vhloCfgPlaca.service';
import { PnalFuncionarioService } from '../../../../services/pnalFuncionario.service';
import { CfgOrganismoTransitoService } from '../../../../services/cfgOrganismoTransito.service';

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [],
    exports: [],
    providers:[
        VhloVehiculoService,
        VhloCfgPlacaService,
        PnalFuncionarioService,
        CfgOrganismoTransitoService,
    ]
})

export class VhloRnaPreasignacionPlacaModule { }

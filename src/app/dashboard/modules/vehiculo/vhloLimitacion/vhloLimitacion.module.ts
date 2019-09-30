import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectModule } from 'angular2-select';
import { Ng2BootstrapModule } from 'ng2-bootstrap';

import { NewComponent } from './new/new.component';

import { VhloLimitacionService } from '../../../../services/vhloLimitacion.service';
import { VhloCfgLimitacionTipoProcesoService } from '../../../../services/vhloCfgLimitacionTipoProceso.service';
import { VhloCfgLimitacionCausalService } from '../../../../services/vhloCfgLimitacionCausal.service';
import { VhloCfgLimitacionTipoService } from '../../../../services/vhloCfgLimitacionTipo.service';
import { VhloVehiculoService } from '../../../../services/vhloVehiculo.service';
import { VhloPropietarioService } from '../../../../services/vhloPropietario.service';
import { UserCiudadanoService } from '../../../../services/userCiudadano.service';
import { UserCfgTipoIdentificacionService } from '../../../../services/userCfgTipoIdentificacion.service';
import { CfgMunicipioService } from '../../../../services/cfgMunicipio.service';
import { CfgDepartamentoService } from '../../../../services/cfgDepartamento.service';
import { CfgEntidadJudicialService } from '../../../../services/cfgEntidadJudicial.service';

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [
        NewComponent,
    ],
    exports: [
        NewComponent,
    ],
    providers: [
        VhloLimitacionService,
        VhloCfgLimitacionTipoProcesoService,
        VhloCfgLimitacionCausalService,
        VhloCfgLimitacionTipoService,
        VhloVehiculoService,
        VhloPropietarioService,
        UserCiudadanoService,
        UserCfgTipoIdentificacionService,
        CfgMunicipioService,
        CfgDepartamentoService,
        CfgEntidadJudicialService,
    ]
})

export class VhloLimitacionModule { }

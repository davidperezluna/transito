import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectModule } from 'angular2-select';
import { Ng2BootstrapModule } from 'ng2-bootstrap';

import { NewComponent } from './new/new.component';
import { DeleteComponent } from './delete/delete.component';

import { UserMedidaCautelarService } from '../../../../services/userMedidaCautelar.service';
import { VhloCfgLimitacionTipoProcesoService } from '../../../../services/vhloCfgLimitacionTipoProceso.service';
import { VhloCfgLimitacionCausalService } from '../../../../services/vhloCfgLimitacionCausal.service';
import { VhloVehiculoService } from '../../../../services/vhloVehiculo.service';
import { UserCfgTipoMedidaCautelarService } from '../../../../services/userCfgTipoMedidaCautelar.service';
import { UserCiudadanoService } from '../../../../services/userCiudadano.service';
import { UserCfgTipoIdentificacionService } from '../../../../services/userCfgTipoIdentificacion.service';
import { CfgMunicipioService } from '../../../../services/cfgMunicipio.service';
import { CfgDepartamentoService } from '../../../../services/cfgDepartamento.service';
import { CfgEntidadJudicialService } from '../../../../services/cfgEntidadJudicial.service';

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [
        NewComponent,
        DeleteComponent
    ],
    exports: [
        NewComponent,
        DeleteComponent
    ],
    providers: [
        UserMedidaCautelarService,
        VhloCfgLimitacionTipoProcesoService,
        VhloCfgLimitacionCausalService,
        VhloVehiculoService,
        UserCfgTipoMedidaCautelarService,
        UserCiudadanoService,
        UserCfgTipoIdentificacionService,
        CfgMunicipioService,
        CfgDepartamentoService,
        CfgEntidadJudicialService,
    ]
})

export class UserMedidaCautelarModule { }

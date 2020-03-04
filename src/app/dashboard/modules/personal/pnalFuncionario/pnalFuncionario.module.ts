import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { SelectModule } from 'angular2-select';
import { PopoverModule } from "ngx-popover";
import { TooltipModule } from "ngx-tooltip";

import { PnalFuncionarioService } from '../../../../services/pnalFuncionario.service';
import { PnalHorarioService } from '../../../../services/pnalHorario.service';
import { PnalProrrogaService } from '../../../../services/pnalProrroga.service';
import { PnalSuspensionService } from '../../../../services/pnalSuspension.service';
import { PnalCfgTipoNombramientoService } from '../../../../services/pnalCfgTipoNombramiento.service';
import { PnalCfgCargoService } from '../../../../services/pnalCfgCargo.service';
import { UserCfgTipoIdentificacionService } from '../../../../services/userCfgTipoIdentificacion.service';
import { CfgOrganismoTransitoService } from '../../../../services/cfgOrganismoTransito.service';
import { BpRegistroCompromisoService } from '../../../../services/bpRegistroCompromiso.service';
import { BpOrdenPagoService } from '../../../../services/bpOrdenPago.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { TimeComponent } from './time/time.component';
import { ShowComponent } from './show/show.component';
import { ProrrogaComponent } from './prorroga/prorroga.component';
import { SuspensionComponent } from './suspension/suspension.component';
import { DisabledComponent } from './disabled/disabled.component';
import { ChangeSedeComponent } from './changeSede/changeSede.component';
import { ReportComponent } from './report/report.component';

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(), SelectModule, PopoverModule, TooltipModule],
    declarations: [
        NewComponent,
        EditComponent,
        TimeComponent,
        ShowComponent,
        ProrrogaComponent,
        SuspensionComponent,
        DisabledComponent,
        ChangeSedeComponent,
        ReportComponent,
    ],
    exports: [
        NewComponent,
        EditComponent,
        TimeComponent,
        ShowComponent,
        ProrrogaComponent,
        SuspensionComponent,
        DisabledComponent,
        ChangeSedeComponent,
        ReportComponent,
    ],
    providers: [
        PnalFuncionarioService,
        PnalHorarioService,
        PnalProrrogaService,
        PnalSuspensionService,
        PnalCfgTipoNombramientoService,
        PnalCfgCargoService,
        UserCfgTipoIdentificacionService,
        CfgOrganismoTransitoService,
        BpRegistroCompromisoService,
        BpOrdenPagoService,
    ]
})

export class PnalFuncionarioModule { }

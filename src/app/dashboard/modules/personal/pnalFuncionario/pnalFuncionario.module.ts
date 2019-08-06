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

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { TimeComponent } from './time/time.component';
import { ShowComponent } from './show/show.component';
import { ProrrogaComponent } from './prorroga/prorroga.component';
import { SuspensionComponent } from './suspension/suspension.component';
import { DisabledComponent } from './disabled/disabled.component';

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(), SelectModule, PopoverModule, TooltipModule],
    declarations: [NewComponent, EditComponent, TimeComponent, ShowComponent, ProrrogaComponent, SuspensionComponent, DisabledComponent],
    exports: [NewComponent, EditComponent, TimeComponent, ShowComponent, ProrrogaComponent, SuspensionComponent, DisabledComponent],
    providers: [PnalFuncionarioService, PnalHorarioService, PnalProrrogaService, PnalSuspensionService]     
})

export class PnalFuncionarioModule { }

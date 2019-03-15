import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PnalFuncionarioComponent } from './pnalFuncionario.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { PnalFuncionarioService } from '../../services/pnalFuncionario.service';
import { PnalHorarioService } from '../../services/pnalHorario.service';
import { PnalProrrogaService } from '../../services/pnalProrroga.service';
import { PnalSuspensionService } from '../../services/pnalSuspension.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { TimeComponent } from './time/time.component';
import { ShowComponent } from './show/show.component';
import { ProrrogaComponent } from './prorroga/prorroga.component';
import { SuspensionComponent } from './suspension/suspension.component';
import { SelectModule } from 'angular2-select';

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(), SelectModule],
    declarations: [PnalFuncionarioComponent, NewComponent, EditComponent, TimeComponent, ShowComponent, ProrrogaComponent, SuspensionComponent],
    exports: [PnalFuncionarioComponent, NewComponent, EditComponent, TimeComponent, ShowComponent, ProrrogaComponent, SuspensionComponent],
    providers: [PnalFuncionarioService, PnalHorarioService, PnalProrrogaService, PnalSuspensionService]     
})

export class PnalFuncionarioModule { }

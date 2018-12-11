import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MpersonalFuncionarioComponent } from './mpersonalFuncionario.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { MpersonalFuncionarioService } from '../../services/mpersonalFuncionario.service';
import { MpersonalHorarioService } from '../../services/mpersonalHorario.service';
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
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [MpersonalFuncionarioComponent,NewComponent,EditComponent,TimeComponent,ShowComponent,ProrrogaComponent,SuspensionComponent],
    exports: [MpersonalFuncionarioComponent, NewComponent,EditComponent,TimeComponent,ShowComponent,ProrrogaComponent,SuspensionComponent],
    providers:[MpersonalFuncionarioService,MpersonalHorarioService,PnalProrrogaService,PnalSuspensionService]
})

export class MpersonalFuncionarioModule { }
 
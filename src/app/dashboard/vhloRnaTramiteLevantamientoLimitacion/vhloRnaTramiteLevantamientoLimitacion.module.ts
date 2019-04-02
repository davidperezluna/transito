import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VhloRnaTramiteLevantamientoLimitacionComponent } from './vhloRnaTramiteLevantamientoLimitacion.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { TramiteLimitacionService } from '../../services/tramiteLimitacion.service';

import {SelectModule} from 'angular2-select';
import { VhloLimitacionService } from '../../services/vhloLimitacion.service';


@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [VhloRnaTramiteLevantamientoLimitacionComponent],
    exports: [VhloRnaTramiteLevantamientoLimitacionComponent],
    providers: [TramiteLimitacionService,VhloLimitacionService]
})

export class VhloRnaTramiteLevantamientoLimitacionModule { }

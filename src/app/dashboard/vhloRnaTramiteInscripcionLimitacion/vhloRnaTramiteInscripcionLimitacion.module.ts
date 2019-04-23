import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VhloRnaTramiteInscripcionLimitacionComponent } from './vhloRnaTramiteInscripcionLimitacion.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { TramiteLimitacionService } from '../../services/tramiteLimitacion.service';
import { NewComponent } from './new/new.component';
import { SelectModule } from 'angular2-select';
import { VhloLimitacionService } from '../../services/vhloLimitacion.service';


@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [VhloRnaTramiteInscripcionLimitacionComponent,NewComponent],
    exports: [VhloRnaTramiteInscripcionLimitacionComponent, NewComponent],
    providers: [TramiteLimitacionService,VhloLimitacionService]
})

export class VhloRnaTramiteInscripcionLimitacionModule { }
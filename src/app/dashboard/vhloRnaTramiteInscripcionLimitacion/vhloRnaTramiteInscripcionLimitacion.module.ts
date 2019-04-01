import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VhloRnaTramiteInscripcionLimitacionComponent } from './vhloRnaTramiteInscripcionLimitacion.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { TramiteLimitacionService } from '../../services/tramiteLimitacion.service';
import { NewComponent } from './new/new.component';
import { SelectModule } from 'angular2-select';
import { VehiculoLimitacionService } from '../../services/vehiculoLimitacion.service';


@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [VhloRnaTramiteInscripcionLimitacionComponent,NewComponent],
    exports: [VhloRnaTramiteInscripcionLimitacionComponent, NewComponent],
    providers: [TramiteLimitacionService,VehiculoLimitacionService]
})

export class VhloRnaTramiteInscripcionLimitacionModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RnrsTramiteInscripcionLimitacionComponent } from './rnrsTramiteInscripcionLimitacion.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { TramiteLimitacionService } from '../../services/tramiteLimitacion.service'; 

 import { NewComponent } from './new/new.component';
// import { EditComponent } from './edit/edit.component';
import {SelectModule} from 'angular2-select';
import { VhloLimitacionService } from '../../services/vhloLimitacion.service';
// import {SelectModule} from 'angular2-select';


@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [RnrsTramiteInscripcionLimitacionComponent,NewComponent/*,EditComponent*/],
    exports: [RnrsTramiteInscripcionLimitacionComponent, NewComponent/*,EditComponent*/],
    providers: [TramiteLimitacionService,VhloLimitacionService]
})

export class RnrsTramiteInscripcionLimitacionModule { }

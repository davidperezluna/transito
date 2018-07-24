import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RnmaTramiteInscripcionLimitacionComponent } from './rnmaTramiteInscripcionLimitacion.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { RnmaTramiteLimitacionService } from '../../services/rnmaTramiteLimitacion.service';

// import { NewComponent } from './new/new.component';
// import { EditComponent } from './edit/edit.component';
import {SelectModule} from 'angular2-select';
// import {SelectModule} from 'angular2-select';


@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [RnmaTramiteInscripcionLimitacionComponent/*,NewComponent,EditComponent*/],
    exports: [RnmaTramiteInscripcionLimitacionComponent, /*NewComponent,EditComponent*/],
    providers: [RnmaTramiteLimitacionService]
})

export class RnmaTramiteInscripcionLimitacionModule { }

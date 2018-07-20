import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TramiteInscripcionLimitacionComponent } from './tramiteInscripcionLimitacion.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { LimitacionService } from '../../services/limitacion.service';

// import { NewComponent } from './new/new.component';
// import { EditComponent } from './edit/edit.component';
import {SelectModule} from 'angular2-select';
// import {SelectModule} from 'angular2-select';


@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [TramiteInscripcionLimitacionComponent/*,NewComponent,EditComponent*/],
    exports: [TramiteInscripcionLimitacionComponent, /*NewComponent,EditComponent*/],
    providers:[LimitacionService]
})

export class LimitacionModule { }

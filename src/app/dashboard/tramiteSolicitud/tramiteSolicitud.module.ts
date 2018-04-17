import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TramiteSolicitudComponent } from './tramiteSolicitud.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { TramiteSolicitudService } from '../../services/tramiteSolicitud.service';

import { NewComponent } from './new/new.component';
import { NewCambioColorComponent } from './rna/tramiteCambioColor/new.cambioColor.component';
import { NewDuplicadoPlacaComponent } from './rna/tramiteDuplicadoPlaca/new.duplicadoPlaca.component';
import { NewCambioPlacaComponent } from './rna/tramiteCambioPlaca/new.cambioPlaca.component';
import { EditComponent } from './edit/edit.component';
import { SelectModule } from 'angular2-select';


@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [
        TramiteSolicitudComponent,
        NewComponent,
        EditComponent,
        NewCambioColorComponent,
        NewDuplicadoPlacaComponent,
        NewCambioPlacaComponent
    ],
    exports: [
        TramiteSolicitudComponent,
        NewComponent,
        EditComponent,
        NewCambioColorComponent,
        NewDuplicadoPlacaComponent,
        NewCambioPlacaComponent
    ],
    providers:[TramiteSolicitudService]
})

export class TramiteSolicitudModule { }

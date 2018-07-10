import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TramiteSolicitudRncComponent } from './tramiteSolicitudRnc.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { TramiteSolicitudRncService } from '../../services/tramiteSolicitudRnc.service';

import { NewRncSustratoComponent } from './newRncSustrato/newRncSustrato.component';
import { NewRncCiudadanoComponent } from './newRncCiudadano/newRncCiudadano.component';
import { NewRncExpedicionLicenciaComponent } from './rnc/tramiteExpedicionLicencia/newRncExpedicionLicencia.component';

import { NewRncComponent } from './newRnc/newRnc.component';
import { EditComponent } from './edit/edit.component';
import { SelectModule } from 'angular2-select';

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [
        TramiteSolicitudRncComponent,
        NewRncComponent,
        EditComponent,
        NewRncSustratoComponent,
        NewRncCiudadanoComponent,
        NewRncExpedicionLicenciaComponent
    ],
    exports: [
        TramiteSolicitudRncComponent,
        NewRncComponent,
        EditComponent,
        NewRncSustratoComponent,
        NewRncCiudadanoComponent,
        NewRncExpedicionLicenciaComponent
    ],
    providers: [TramiteSolicitudRncService]
})

export class TramiteSolicitudRncModule { }

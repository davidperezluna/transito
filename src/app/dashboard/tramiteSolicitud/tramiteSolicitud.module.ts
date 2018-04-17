import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TramiteSolicitudComponent } from './tramiteSolicitud.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { TramiteSolicitudService } from '../../services/tramiteSolicitud.service';

import { NewComponent } from './new/new.component';
import { NewDuplicadoPlacaComponent } from './rna/tramiteDuplicadoPlaca/new.duplicadoPlaca.component';
import { NewDuplicadoLicenciaComponent } from './rna/tramiteDuplicadoLicencia/new.duplicadoLicencia.component';
import { NewCambioColorComponent } from './rna/tramiteCambioColor/new.cambioColor.component';
import { NewCambioPlacaComponent } from './rna/tramiteCambioPlaca/new.cambioPlaca.component';
import { NewCambioMotorComponent } from './rna/tramiteCambioMotor/new.cambioMotor.component';
import { NewRegrabarMotorComponent } from './rna/tramiteRegrabarMotor/new.regrabarMotor.component';
import { NewRematriculaComponent } from './rna/tramiteRematricula/new.rematricula.component';
import { EditComponent } from './edit/edit.component';
import { SelectModule } from 'angular2-select';


@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [
        TramiteSolicitudComponent,
        NewComponent,
        EditComponent,
        NewDuplicadoPlacaComponent,
        NewDuplicadoLicenciaComponent,
        NewCambioColorComponent,
        NewCambioPlacaComponent,
        NewCambioMotorComponent,
        NewRegrabarMotorComponent,
        NewRematriculaComponent
    ],
    exports: [
        TramiteSolicitudComponent,
        NewComponent,
        EditComponent,
        NewDuplicadoPlacaComponent,
        NewDuplicadoLicenciaComponent,
        NewCambioColorComponent,
        NewCambioPlacaComponent,
        NewCambioMotorComponent,
        NewRegrabarMotorComponent,
        NewRematriculaComponent
    ],
    providers:[TramiteSolicitudService]
})

export class TramiteSolicitudModule { }

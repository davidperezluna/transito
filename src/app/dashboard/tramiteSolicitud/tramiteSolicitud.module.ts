import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TramiteSolicitudComponent } from './tramiteSolicitud.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { TramiteSolicitudService } from '../../services/tramiteSolicitud.service';

import { NewComponent } from './new/new.component';
import { NewDuplicadoPlacaComponent } from './rna/tramiteDuplicadoPlaca/new.duplicadoPlaca.component';
import { NewDuplicadoLicenciaComponent } from './rna/tramiteDuplicadoLicencia/new.duplicadoLicencia.component';
import { NewCambioColorComponent } from './rna/tramiteCambioColor/new.cambioColor.component';
import { NewCambioCombustibleComponent } from './rna/tramiteCambioCombustible/new.cambioCombustible.component';
import { NewCambioServicioComponent } from './rna/tramiteCambioServicio/new.cambioServicio.component';
import { NewCambioCarroceriaComponent } from './rna/tramiteCambioCarroceria/new.cambioCarroceria.component';
import { NewCambioPlacaComponent } from './rna/tramiteCambioPlaca/new.cambioPlaca.component';
import { NewCambioMotorComponent } from './rna/tramiteCambioMotor/new.cambioMotor.component';
import { NewRegrabarMotorComponent } from './rna/tramiteRegrabarMotor/new.regrabarMotor.component';
import { NewRegrabarSerieComponent } from './rna/tramiteRegrabarSerie/new.regrabarSerie.component';
import { NewRegrabarChasisComponent } from './rna/tramiteRegrabarChasis/new.regrabarChasis.component';
import { NewRegrabarVinComponent } from './rna/tramiteRegrabarVin/new.regrabarVin.component';
import { NewRematriculaComponent } from './rna/tramiteRematricula/new.rematricula.component';
import { NewCambioSedeOperativaComponent } from './rna/tramiteCambioSedeOperativa/new.cambioSedeOperativa.component';
import { NewBlindajeComponent } from './rna/tramiteBlindaje/new.blindaje.component';
import { NewVehiculoComponent } from './vehiculoNew/vehiculoNew.component';
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
        NewRematriculaComponent,
        NewVehiculoComponent,
        NewCambioCombustibleComponent,
        NewCambioCarroceriaComponent,
        NewCambioServicioComponent,
        NewRegrabarSerieComponent,
        NewRegrabarChasisComponent,
        NewRegrabarVinComponent,
        NewBlindajeComponent,
        NewCambioSedeOperativaComponent
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
        NewRematriculaComponent,
        NewVehiculoComponent,
        NewCambioCombustibleComponent,
        NewCambioCarroceriaComponent,
        NewCambioServicioComponent,
        NewRegrabarSerieComponent,
        NewRegrabarChasisComponent,
        NewRegrabarVinComponent,
        NewBlindajeComponent,
        NewCambioSedeOperativaComponent
    ],
    providers:[TramiteSolicitudService]
})

export class TramiteSolicitudModule { }

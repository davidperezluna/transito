import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TramiteSolicitudComponent } from './tramiteSolicitud.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { TramiteSolicitudService } from '../../services/tramiteSolicitud.service';

import { NewRnaComponent } from './newRna/newRna.component';
import { NewRnaDuplicadoPlacaComponent } from './rna/tramiteDuplicadoPlaca/newRna.duplicadoPlaca.component';
import { NewRnaDuplicadoLicenciaComponent } from './rna/tramiteDuplicadoLicencia/newRna.duplicadoLicencia.component';
import { NewRnaCambioColorComponent } from './rna/tramiteCambioColor/newRna.cambioColor.component'; 
import { NewRnaCambioCombustibleComponent } from './rna/tramiteCambioCombustible/newRna.cambioCombustible.component';
import { NewRnaCambioServicioComponent } from './rna/tramiteCambioServicio/newRna.cambioServicio.component';
import { NewRnaCambioCarroceriaComponent } from './rna/tramiteCambioCarroceria/newRna.cambioCarroceria.component';
import { NewRnaCambioPlacaComponent } from './rna/tramiteCambioPlaca/newRna.cambioPlaca.component';
import { NewRnaCambioMotorComponent } from './rna/tramiteCambioMotor/newRna.cambioMotor.component';
import { NewRnaRegrabarMotorComponent } from './rna/tramiteRegrabarMotor/newRna.regrabarMotor.component';
import { NewRnaRegrabarSerieComponent } from './rna/tramiteRegrabarSerie/newRna.regrabarSerie.component';
import { NewRnaRegrabarChasisComponent } from './rna/tramiteRegrabarChasis/newRna.regrabarChasis.component';
import { NewRnaRegrabarVinComponent } from './rna/tramiteRegrabarVin/newRna.regrabarVin.component'; 
import { NewRnaRematriculaComponent } from './rna/tramiteRematricula/newRna.rematricula.component';
import { NewRnaCambioSedeOperativaComponent } from './rna/tramiteCambioSedeOperativa/newRna.cambioSedeOperativa.component';
import { NewRnaCancelacionMatriculaComponent } from './rna/tramiteCancelacionMatricula/newRna.cancelacionMatricula.component';
import { NewRnaBlindajeComponent } from './rna/tramiteBlindaje/newRna.blindaje.component';
import { NewRnaPreregistroComponent } from './rna/tramitePreregistro/newRna.preregistro.component';
import { EditComponent } from './edit/edit.component';
import { SelectModule } from 'angular2-select';



@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [
        TramiteSolicitudComponent,
        NewRnaComponent,
        EditComponent,
        NewRnaDuplicadoPlacaComponent,
        NewRnaDuplicadoLicenciaComponent,
        NewRnaCambioColorComponent,
        NewRnaCambioPlacaComponent,
        NewRnaCambioMotorComponent,
        NewRnaRegrabarMotorComponent,
        NewRnaRematriculaComponent,
        NewRnaPreregistroComponent,
        NewRnaCambioCombustibleComponent,
        NewRnaCambioCarroceriaComponent,
        NewRnaCambioServicioComponent,
        NewRnaRegrabarSerieComponent,
        NewRnaRegrabarChasisComponent,
        NewRnaRegrabarVinComponent,
        NewRnaBlindajeComponent,
        NewRnaCambioSedeOperativaComponent,
        NewRnaCancelacionMatriculaComponent
    ],
    exports: [
        TramiteSolicitudComponent,
        NewRnaComponent,
        EditComponent,
        NewRnaDuplicadoPlacaComponent,
        NewRnaDuplicadoLicenciaComponent,
        NewRnaCambioColorComponent,
        NewRnaCambioPlacaComponent,
        NewRnaCambioMotorComponent,
        NewRnaRegrabarMotorComponent,
        NewRnaRematriculaComponent,
        NewRnaPreregistroComponent,
        NewRnaCambioCombustibleComponent,
        NewRnaCambioCarroceriaComponent,
        NewRnaCambioCarroceriaComponent,
        NewRnaCambioServicioComponent,
        NewRnaRegrabarSerieComponent,
        NewRnaRegrabarChasisComponent,
        NewRnaRegrabarVinComponent,
        NewRnaBlindajeComponent,
        NewRnaCambioSedeOperativaComponent,
        NewRnaCancelacionMatriculaComponent
    ],
    providers:[TramiteSolicitudService]
})

export class TramiteSolicitudModule { }

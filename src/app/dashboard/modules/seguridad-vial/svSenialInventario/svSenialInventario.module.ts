import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SvSenialInventarioComponent } from './svSenialInventario.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';

import { SvSenialInventarioService } from '../../../../services/svSenialInventario.service';
import { SvSenialBodegaService } from '../../../../services/svSenialBodega.service';
import { SvSenialUbicacionService } from '../../../../services/svSenialUbicacion.service';

import { NewSenialBodegaComponent } from './newSenialBodega/newSenialBodega.component';
import { NewSenialUbicacionComponent } from './newSenialUbicacion/newSenialUbicacion.component';
import { EditComponent } from './edit/edit.component';
import { LocationComponent } from './location/location.component';
import { RecordComponent } from './record/record.component';
import { SelectModule } from 'angular2-select';

import { AgmCoreModule } from '@agm/core';

@NgModule({
    imports: [
        CommonModule, 
        Ng2BootstrapModule.forRoot(),
        SelectModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyCZLRPtun19mn3xqSZi08dPp-1R4P2A2B4'
        })
    ],
    declarations: [
        SvSenialInventarioComponent,
        NewSenialBodegaComponent,
        NewSenialUbicacionComponent,
        EditComponent,
        LocationComponent,
        RecordComponent
    ],
    exports: [
        SvSenialInventarioComponent,
        NewSenialBodegaComponent,
        NewSenialUbicacionComponent,
        EditComponent,
        LocationComponent, 
        RecordComponent
    ],
    providers: [SvSenialInventarioService, SvSenialUbicacionService, SvSenialBodegaService]
})

export class SvSenialInventarioModule { }
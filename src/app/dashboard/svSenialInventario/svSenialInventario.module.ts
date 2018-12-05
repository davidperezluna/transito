import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SvSenialInventarioComponent } from './svSenialInventario.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';

import { SvSenialInventarioService } from '../../services/svSenialInventario.service';
import { SvSenialBodegaService } from '../../services/svSenialBodega.service';
import { SvSenialUbicacionService } from '../../services/svSenialUbicacion.service';

import { NewSenialBodegaComponent } from './newSenialBodega/newSenialBodega.component';
import { NewSenialUbicacionComponent } from './newSenialUbicacion/newSenialUbicacion.component';
import { EditComponent } from './edit/edit.component';
import { LocationComponent } from './location/location.component';
import { SelectModule } from 'angular2-select';

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [SvSenialInventarioComponent, NewSenialBodegaComponent, NewSenialUbicacionComponent, EditComponent, LocationComponent],
    exports: [SvSenialInventarioComponent, NewSenialBodegaComponent, NewSenialUbicacionComponent, EditComponent, LocationComponent],
    providers: [SvSenialInventarioService, SvSenialUbicacionService, SvSenialBodegaService]
})

export class SvSenialInventarioModule { }

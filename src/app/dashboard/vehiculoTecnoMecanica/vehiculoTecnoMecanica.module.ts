import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehiculoTecnoMecanicaComponent } from './vehiculoTecnoMecanica.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { TecnoMecanicaService } from '../../services/vehiculoTecnoMecanica.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { SelectModule } from 'angular2-select';

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [VehiculoTecnoMecanicaComponent,NewComponent,EditComponent],
    exports: [VehiculoTecnoMecanicaComponent, NewComponent,EditComponent],
    providers:[TecnoMecanicaService]
})

export class VehiculoTecnoMecanicaModule { }

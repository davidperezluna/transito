import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VhloTecnoMecanicaComponent } from './vhloTecnoMecanica.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { VhloTecnoMecanicaService } from '../../services/vhloTecnoMecanica.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { SelectModule } from 'angular2-select';

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [VhloTecnoMecanicaComponent,NewComponent,EditComponent],
    exports: [VhloTecnoMecanicaComponent, NewComponent,EditComponent],
    providers:[VhloTecnoMecanicaService]
})

export class VhloTecnoMecanicaModule { }

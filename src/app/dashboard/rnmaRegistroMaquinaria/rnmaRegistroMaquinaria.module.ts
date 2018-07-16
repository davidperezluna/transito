import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RnmaRegistroMaquinariaComponent } from './rnmaRegistroMaquinaria.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { ChartsModule } from 'ng2-charts';
import {RegistroMaquinariaService} from '../../services/registroMaquinaria.service';
import {CarroceriaService} from '../../services/carroceria.service';

import { NewRegistroMaquinariaComponent } from './new/new.component';
// import { EditComponent } from './edit/edit.component';
import {SelectModule} from 'angular2-select';
// ,EditComponent
@NgModule({
    declarations: [RnmaRegistroMaquinariaComponent,NewRegistroMaquinariaComponent],
    imports: [CommonModule, ChartsModule, Ng2BootstrapModule.forRoot(),SelectModule],
    exports: [RnmaRegistroMaquinariaComponent, NewRegistroMaquinariaComponent],
    providers:[RegistroMaquinariaService,CarroceriaService]
})

export class RnmaRegistroMaquinariaModule { }

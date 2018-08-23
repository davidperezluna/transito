import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InsumoBusquedaComponent } from './insumoBusqueda.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import {RnaInsumoService} from '../../services/rnaInsumos.service';
import {SelectModule} from 'angular2-select';

import { ShowComponent } from './show/show.component';



@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [InsumoBusquedaComponent,ShowComponent],
    exports: [InsumoBusquedaComponent,ShowComponent],
    providers:[RnaInsumoService]
})

export class InsumoBusquedaModule { }

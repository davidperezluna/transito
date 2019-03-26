import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InsumoBusquedaComponent } from './insumoBusqueda.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import {ImoInsumoService} from '../../services/imoInsumo.service';
import {SelectModule} from 'angular2-select';

import { ShowComponent } from './show/show.component';



@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [InsumoBusquedaComponent,ShowComponent],
    exports: [InsumoBusquedaComponent,ShowComponent],
    providers:[ImoInsumoService]
})

export class InsumoBusquedaModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImoBusquedaComponent } from './imoBusqueda.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import {ImoInsumoService} from '../../../../services/imoInsumo.service';
import {SelectModule} from 'angular2-select';

import { ShowComponent } from './show/show.component';



@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [ImoBusquedaComponent,ShowComponent],
    exports: [ImoBusquedaComponent,ShowComponent],
    providers:[ImoInsumoService]
})

export class ImoBusquedaModule { }

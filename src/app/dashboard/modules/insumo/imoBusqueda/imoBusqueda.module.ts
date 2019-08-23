import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import {ImoInsumoService} from '../../../../services/imoInsumo.service';
import {SelectModule} from 'angular2-select';

import { ShowComponent } from './show/show.component';



@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [ShowComponent],
    exports: [ShowComponent],
    providers:[ImoInsumoService]
})

export class ImoBusquedaModule { }

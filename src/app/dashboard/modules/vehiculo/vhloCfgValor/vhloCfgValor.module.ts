import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { VhloValorService } from '../../../../services/vholCfgValor.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import {SelectModule} from 'angular2-select';
// import {SelectModule} from 'angular2-select';

import { VhloCfgClaseService } from '../../../../services/vhloCfgClase.service';
import { VhloCfgMarcaService } from '../../../../services/vhloCfgMarca.service';
import { VhloCfgLineaService } from '../../../../services/vhloCfgLinea.service';


@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [NewComponent,EditComponent],
    exports: [NewComponent,EditComponent],
    providers:[
        VhloValorService,
        VhloCfgClaseService,
        VhloCfgMarcaService,
        VhloCfgLineaService,
    ]
})

export class VhloCfgValorModule { } 

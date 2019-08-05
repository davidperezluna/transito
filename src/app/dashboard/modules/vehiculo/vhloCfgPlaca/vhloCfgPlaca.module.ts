import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SelectModule} from 'angular2-select';
import { Ng2BootstrapModule } from 'ng2-bootstrap';

import { VhloCfgPlacaService } from '../../../../services/vhloCfgPlaca.service';

import { VhloCfgPlacaComponent } from './vhloCfgPlaca.component';
import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { SearchComponent } from './search/search.component';

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [
        VhloCfgPlacaComponent,
        NewComponent,
        EditComponent,
        SearchComponent
    ],
    exports: [
        VhloCfgPlacaComponent,
        NewComponent,
        EditComponent,
        SearchComponent
    ],
    providers:[VhloCfgPlacaService]
})

export class VhloCfgPlacaModule { }

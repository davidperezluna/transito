import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SelectModule} from 'angular2-select';
import { Ng2BootstrapModule } from 'ng2-bootstrap';

import { VhloCfgPlacaService } from '../../../../services/vhloCfgPlaca.service';
import { VhloCfgTipoVehiculoService } from '../../../../services/vhloCfgTipoVehiculo.service';
import { CfgOrganismoTransitoService } from '../../../../services/cfgOrganismoTransito.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { SearchComponent } from './search/search.component';

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [
        NewComponent,
        EditComponent,
        SearchComponent,
    ],
    exports: [
        NewComponent,
        EditComponent,
        SearchComponent,
    ],
    providers:[
        VhloCfgPlacaService,
        VhloCfgTipoVehiculoService,
        CfgOrganismoTransitoService,
    ]
})

export class VhloCfgPlacaModule { }

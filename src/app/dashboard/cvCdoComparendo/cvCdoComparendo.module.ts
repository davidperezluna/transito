import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CvCdoComparendoComponent } from './cvCdoComparendo.component';
import { CvCdoComparendoService } from '../../services/cvCdoComparendo.service';
import { CfgOrganismoTransitoService } from '../../services/cfgOrganismoTransito.service';
import { PnalFuncionarioService } from '../../services/pnalFuncionario.service';
import { CiudadanoVehiculoService } from '../../services/ciudadanoVehiculo.service';
import { Ng2BootstrapModule } from 'ng2-bootstrap';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { StateComponent } from './state/state.component';
import { SearchComponent } from './search/search.component';
import { ShowComponent } from './show/show.component';
import { DocumentComponent } from './document/document.component';
import { ExportComponent } from './export/export.component';
import { SelectModule } from 'angular2-select';


@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [
        CvCdoComparendoComponent,
        NewComponent,
        EditComponent,
        StateComponent,
        SearchComponent,
        ShowComponent,
        DocumentComponent,
        ExportComponent
    ],
    exports: [
        CvCdoComparendoComponent,
        NewComponent,
        EditComponent,
        StateComponent,
        SearchComponent,
        ShowComponent,
        DocumentComponent,
        ExportComponent
    ],
    providers:[PnalFuncionarioService,CvCdoComparendoService,CfgOrganismoTransitoService,CiudadanoVehiculoService]
})

export class CvCdoComparendoModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CfgCasoInsumoComponent } from './cfgCasoInsumo.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { CfgCasoInsumoService } from '../../services/cfgCasoInsumo.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import {SelectModule} from 'angular2-select';
// import {SelectModule} from 'angular2-select';


@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [CfgCasoInsumoComponent,NewComponent,EditComponent],
    exports: [CfgCasoInsumoComponent, NewComponent,EditComponent],
    providers:[CfgCasoInsumoService]
})

export class CfgCasoInsumoModule { }

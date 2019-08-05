import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VhloCfgLimitacionTipoComponent } from './vhloCfgLimitacionTipo.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { VhloCfgLimitacionTipoService } from '../../../../services/vhloCfgLimitacionTipo.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import {SelectModule} from 'angular2-select';
// import {SelectModule} from 'angular2-select';


@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [VhloCfgLimitacionTipoComponent,NewComponent,EditComponent],
    exports: [VhloCfgLimitacionTipoComponent, NewComponent,EditComponent],
    providers:[VhloCfgLimitacionTipoService]
})

export class VhloCfgLimitacionTipoModule { }

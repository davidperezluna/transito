import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CfgPaisComponent } from './cfgPais.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { CfgPaisService } from '../../../../services/cfgPais.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import {SelectModule} from 'angular2-select';


@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [CfgPaisComponent,NewComponent,EditComponent],
    exports: [CfgPaisComponent, NewComponent,EditComponent],
    providers:[CfgPaisService]
})

export class CfgPaisModule { }

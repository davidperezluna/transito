import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CfgSvConectorComponent } from './cfgSvConector.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { CfgSvConectorService } from '../../services/cfgSvConector.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { SelectModule } from 'angular2-select';

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [CfgSvConectorComponent,NewComponent,EditComponent],
    exports: [CfgSvConectorComponent, NewComponent,EditComponent],
    providers:[CfgSvConectorService]
})

export class CfgSvConectorModule { }

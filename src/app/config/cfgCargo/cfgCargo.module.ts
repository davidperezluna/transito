import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CfgCargoComponent } from './cfgCargo.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { CfgCargoService } from '../../services/cfgCargo.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { SelectModule } from 'angular2-select';

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [CfgCargoComponent,NewComponent,EditComponent],
    exports: [CfgCargoComponent, NewComponent,EditComponent],
    providers:[CfgCargoService]
})

export class CfgCargoModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CfgBodegaComponent } from './cfgBodega.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { CfgBodegaService } from '../../services/cfgBodega.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { SelectModule } from 'angular2-select';

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [CfgBodegaComponent,NewComponent,EditComponent],
    exports: [CfgBodegaComponent, NewComponent,EditComponent],
    providers:[CfgBodegaService]
})

export class CfgBodegaModule { }

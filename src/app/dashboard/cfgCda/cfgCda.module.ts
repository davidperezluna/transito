import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CfgCdaComponent } from './cfgCda.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { CfgCdaService } from '../../services/cfgCda.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { SelectModule } from 'angular2-select';

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [CfgCdaComponent,NewComponent,EditComponent],
    exports: [CfgCdaComponent, NewComponent,EditComponent],
    providers:[CfgCdaService]
})

export class CfgCdaModule { }

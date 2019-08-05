import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CfgAuditoriaComponent } from './cfgAuditoria.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { CfgAuditoriaService } from '../../../../services/cfgAuditoria.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { SelectModule } from 'angular2-select';


@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [CfgAuditoriaComponent,NewComponent,EditComponent],
    exports: [CfgAuditoriaComponent, NewComponent,EditComponent],
    providers:[CfgAuditoriaService]
})

export class CfgAuditoriaModule { }

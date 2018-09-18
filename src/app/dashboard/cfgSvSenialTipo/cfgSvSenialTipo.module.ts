import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CfgSvSenialTipoComponent } from './cfgSvSenialTipo.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { CfgSvSenialTipoService } from '../../services/cfgSvSenialTipo.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { SelectModule } from 'angular2-select';

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [CfgSvSenialTipoComponent,NewComponent,EditComponent],
    exports: [CfgSvSenialTipoComponent, NewComponent,EditComponent],
    providers:[CfgSvSenialTipoService]
})

export class CfgSvSenialTipoModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CfgSvSenialEstadoComponent } from './cfgSvSenialEstado.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { CfgSvSenialEstadoService } from '../../services/cfgSvSenialEstado.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { SelectModule } from 'angular2-select';

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [CfgSvSenialEstadoComponent,NewComponent,EditComponent],
    exports: [CfgSvSenialEstadoComponent, NewComponent,EditComponent],
    providers:[CfgSvSenialEstadoService]
})

export class CfgSvSenialEstadoModule { }

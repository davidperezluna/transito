import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SvCfgSenialEstadoComponent } from './svCfgSenialEstado.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { SvCfgSenialEstadoService } from '../../../../services/svCfgSenialEstado.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { SelectModule } from 'angular2-select';

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [SvCfgSenialEstadoComponent,NewComponent,EditComponent],
    exports: [SvCfgSenialEstadoComponent, NewComponent,EditComponent],
    providers:[SvCfgSenialEstadoService]
})

export class SvCfgSenialEstadoModule { }
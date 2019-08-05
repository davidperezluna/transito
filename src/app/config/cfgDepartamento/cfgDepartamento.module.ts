import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CfgDepartamentoComponent } from './cfgDepartamento.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { CfgDepartamentoService } from '../../services/cfgDepartamento.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot()],
    declarations: [CfgDepartamentoComponent,NewComponent,EditComponent],
    exports: [CfgDepartamentoComponent, NewComponent,EditComponent],
    providers:[CfgDepartamentoService]
})

export class CfgDepartamentoModule { }

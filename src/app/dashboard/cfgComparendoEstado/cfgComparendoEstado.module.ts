import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CfgComparendoEstadoComponent } from './cfgComparendoEstado.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { CfgComparendoEstadoService } from '../../services/cfgComparendoEstado.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { SelectModule } from 'angular2-select';

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [CfgComparendoEstadoComponent,NewComponent,EditComponent],
    exports: [CfgComparendoEstadoComponent, NewComponent,EditComponent],
    providers:[CfgComparendoEstadoService]
})

export class CfgComparendoEstadoModule { }

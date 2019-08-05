import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VhloCfgSubpartidaArancelariaComponent } from './vhloCfgSubpartidaArancelaria.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { VhloCfgSubpartidaArancelariaService } from '../../../../services/vhloCfgSubpartidaArancelaria.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { SelectModule } from 'angular2-select';

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [VhloCfgSubpartidaArancelariaComponent,NewComponent,EditComponent],
    exports: [VhloCfgSubpartidaArancelariaComponent, NewComponent,EditComponent],
    providers: [VhloCfgSubpartidaArancelariaService]
})

export class VhloCfgSubpartidaArancelariaModule { }

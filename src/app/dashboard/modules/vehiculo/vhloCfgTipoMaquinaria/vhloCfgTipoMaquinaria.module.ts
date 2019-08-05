import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VhloCfgTipoMaquinariaComponent } from './vhloCfgTipoMaquinaria.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { VhloCfgTipoMaquinariaService } from '../../../../services/vhloCfgTipoMaquinaria.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { SelectModule } from 'angular2-select';

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [VhloCfgTipoMaquinariaComponent,NewComponent,EditComponent],
    exports: [VhloCfgTipoMaquinariaComponent, NewComponent,EditComponent],
    providers: [VhloCfgTipoMaquinariaService]
})

export class VhloCfgTipoMaquinariaModule { }

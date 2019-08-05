import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BpCfgTipoInsumoComponent } from './bpCfgTipoInsumo.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { BpCfgTipoInsumoService } from '../../services/bpCfgTipoInsumo.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { SelectModule } from 'angular2-select';

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [BpCfgTipoInsumoComponent,NewComponent,EditComponent],
    exports: [BpCfgTipoInsumoComponent, NewComponent,EditComponent],
    providers:[BpCfgTipoInsumoService]
})

export class BpCfgTipoInsumoModule { }

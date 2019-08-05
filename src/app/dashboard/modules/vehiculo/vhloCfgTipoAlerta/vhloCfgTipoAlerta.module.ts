import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VhloCfgTipoAlertaComponent } from './vhloCfgTipoAlerta.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { VhloCfgTipoAlertaService } from '../../../../services/vhloCfgTipoAlerta.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { SelectModule } from 'angular2-select';

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [VhloCfgTipoAlertaComponent,NewComponent,EditComponent],
    exports: [VhloCfgTipoAlertaComponent, NewComponent,EditComponent],
    providers:[VhloCfgTipoAlertaService]     
})

export class VhloCfgTipoAlertaModule { }

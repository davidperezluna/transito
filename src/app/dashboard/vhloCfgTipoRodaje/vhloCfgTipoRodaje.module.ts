import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VhloCfgTipoRodajeComponent } from './vhloCfgTipoRodaje.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { VhloCfgTipoRodajeService } from '../../services/vhloCfgTipoRodaje.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { SelectModule } from 'angular2-select';

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [VhloCfgTipoRodajeComponent,NewComponent,EditComponent],
    exports: [VhloCfgTipoRodajeComponent, NewComponent,EditComponent],
    providers: [VhloCfgTipoRodajeService]
})

export class VhloCfgTipoRodajeModule { }

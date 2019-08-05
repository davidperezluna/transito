import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PqoCfgTarifaComponent } from './pqoCfgTarifa.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { PqoCfgTarifaService } from '../../services/pqoCfgTarifa.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { SelectModule } from 'angular2-select';

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [PqoCfgTarifaComponent,NewComponent,EditComponent],
    exports: [PqoCfgTarifaComponent, NewComponent,EditComponent],
    providers:[PqoCfgTarifaService]
})

export class PqoCfgTarifaModule { }

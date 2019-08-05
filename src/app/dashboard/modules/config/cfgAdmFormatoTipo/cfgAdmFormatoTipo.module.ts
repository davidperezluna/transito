import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CfgAdmFormatoTipoComponent } from './cfgAdmFormatoTipo.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { CfgAdmFormatoTipoService } from '../../../../services/cfgAdmFormatoTipo.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { SelectModule } from 'angular2-select';

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [CfgAdmFormatoTipoComponent,NewComponent,EditComponent],
    exports: [CfgAdmFormatoTipoComponent, NewComponent,EditComponent],
    providers:[CfgAdmFormatoTipoService]
})

export class CfgAdmFormatoTipoModule { }

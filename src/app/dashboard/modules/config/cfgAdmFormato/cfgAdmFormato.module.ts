import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CfgAdmFormatoComponent } from './cfgAdmFormato.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { CfgAdmFormatoService } from '../../../../services/cfgAdmFormato.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { SelectModule } from 'angular2-select';

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [CfgAdmFormatoComponent,NewComponent,EditComponent],
    exports: [CfgAdmFormatoComponent, NewComponent,EditComponent],
    providers:[CfgAdmFormatoService]
})

export class CfgAdmFormatoModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CfgTipoInfractorComponent } from './cfgTipoInfractor.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { CfgTipoInfractorService } from '../../../../services/cfgTipoInfractor.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { SelectModule } from 'angular2-select';

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [CfgTipoInfractorComponent,NewComponent,EditComponent],
    exports: [CfgTipoInfractorComponent, NewComponent,EditComponent],
    providers:[CfgTipoInfractorService]
})

export class CfgTipoInfractorModule { }

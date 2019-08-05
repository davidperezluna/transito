import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PnalCfgCdoConsecutivoComponent } from './pnalCfgCdoConsecutivo.component';
import { PnalCfgCdoConsecutivoService } from '../../../../services/pnalCfgCdoConsecutivo.service';
import { Ng2BootstrapModule } from 'ng2-bootstrap';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { SelectModule } from 'angular2-select';


@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [PnalCfgCdoConsecutivoComponent,NewComponent,EditComponent],
    exports: [PnalCfgCdoConsecutivoComponent, NewComponent,EditComponent],
    providers:[PnalCfgCdoConsecutivoService]
})

export class PnalCfgCdoConsecutivoModule { }

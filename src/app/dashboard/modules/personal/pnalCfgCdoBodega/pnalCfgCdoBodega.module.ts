import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { SelectModule } from 'angular2-select';
import { TooltipModule } from "ngx-tooltip"; 

import { PnalCfgCdoBodegaComponent } from './pnalCfgCdoBodega.component';
import { PnalCfgCdoBodegaService } from '../../../../services/pnalCfgCdoBodega.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(), SelectModule, TooltipModule],
    declarations: [PnalCfgCdoBodegaComponent,NewComponent,EditComponent],
    exports: [PnalCfgCdoBodegaComponent, NewComponent,EditComponent],
    providers: [PnalCfgCdoBodegaService, { provide: LOCALE_ID, useValue: 'es-ES' }]
})

export class PnalCfgCdoBodegaModule { }

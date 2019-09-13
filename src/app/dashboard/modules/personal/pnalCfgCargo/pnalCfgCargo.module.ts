import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { PnalCfgCargoService } from '../../../../services/pnalCfgCargo.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { SelectModule } from 'angular2-select';
import { TooltipModule } from "ngx-tooltip";

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(), SelectModule, TooltipModule],
    declarations: [NewComponent,EditComponent],
    exports: [ NewComponent,EditComponent],
    providers:[PnalCfgCargoService]     
})

export class PnalCfgCargoModule { }

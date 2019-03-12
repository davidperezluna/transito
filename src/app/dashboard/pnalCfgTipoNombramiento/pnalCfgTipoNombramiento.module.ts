import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PnalCfgTipoNombramientoComponent } from './pnalCfgTipoNombramiento.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { PnalCfgTipoNombramientoService } from '../../services/pnalCfgTipoNombramiento.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { SelectModule } from 'angular2-select';
import { TooltipModule } from "ngx-tooltip";

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(), SelectModule, TooltipModule],
    declarations: [PnalCfgTipoNombramientoComponent,NewComponent,EditComponent],
    exports: [PnalCfgTipoNombramientoComponent, NewComponent,EditComponent],
    providers:[PnalCfgTipoNombramientoService]     
})

export class PnalCfgTipoNombramientoModule { }

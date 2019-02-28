import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImoCfgTipoComponent } from './imoCfgTipo.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { ImoCfgTipoService } from '../../services/imoCfgTipo.service';
import { ImoCfgValorService } from '../../services/imoCfgValor.service';

import { NewComponent } from './new/new.component';
import { NewValorComponent } from './newValor/newValor.component';
import { EditComponent } from './edit/edit.component';
import {SelectModule} from 'angular2-select';
import { TooltipModule } from "ngx-tooltip";


@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule, TooltipModule],
    declarations: [ImoCfgTipoComponent,NewComponent,EditComponent,NewValorComponent],
    exports: [ImoCfgTipoComponent, NewComponent,EditComponent,NewValorComponent],
    providers:[ImoCfgTipoService,ImoCfgValorService]
})

export class ImoCfgTipoModule { }

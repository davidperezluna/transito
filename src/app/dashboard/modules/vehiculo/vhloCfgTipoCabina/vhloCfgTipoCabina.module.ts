import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VhloCfgTipoCabinaComponent } from './vhloCfgTipoCabina.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { VhloCfgTipoCabinaService } from '../../../../services/vhloCfgTipoCabina.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { SelectModule } from 'angular2-select';

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [VhloCfgTipoCabinaComponent,NewComponent,EditComponent],
    exports: [VhloCfgTipoCabinaComponent, NewComponent,EditComponent],
    providers: [VhloCfgTipoCabinaService]
})

export class VhloCfgTipoCabinaModule { }

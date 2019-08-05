import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SvCfgSustanciaPeligrosaComponent } from './svCfgSustanciaPeligrosa.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { SvCfgSustanciaPeligrosaService } from '../../../../services/svCfgSustanciaPeligrosa.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { SelectModule } from 'angular2-select';

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(), SelectModule],
    declarations: [SvCfgSustanciaPeligrosaComponent, NewComponent, EditComponent],
    exports: [SvCfgSustanciaPeligrosaComponent, NewComponent, EditComponent],
    providers: [SvCfgSustanciaPeligrosaService]
})

export class SvCfgSustanciaPeligrosaModule { }

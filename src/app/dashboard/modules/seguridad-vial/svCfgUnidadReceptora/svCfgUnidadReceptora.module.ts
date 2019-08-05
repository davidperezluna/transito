import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SvCfgUnidadReceptoraComponent } from './svCfgUnidadReceptora.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { SvCfgUnidadReceptoraService } from '../../../../services/svCfgUnidadReceptora.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { SelectModule } from 'angular2-select';

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(), SelectModule],
    declarations: [SvCfgUnidadReceptoraComponent, NewComponent, EditComponent],
    exports: [SvCfgUnidadReceptoraComponent, NewComponent, EditComponent],
    providers: [SvCfgUnidadReceptoraService]
})

export class SvCfgUnidadReceptoraModule { }

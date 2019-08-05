import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SvCfgTipoGeometriaComponent } from './svCfgTipoGeometria.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { SvCfgTipoGeometriaService } from '../../../../services/svCfgTipoGeometria.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { SelectModule } from 'angular2-select';

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(), SelectModule],
    declarations: [SvCfgTipoGeometriaComponent, NewComponent, EditComponent],
    exports: [SvCfgTipoGeometriaComponent, NewComponent, EditComponent],
    providers: [SvCfgTipoGeometriaService]
})

export class SvCfgTipoGeometriaModule { }

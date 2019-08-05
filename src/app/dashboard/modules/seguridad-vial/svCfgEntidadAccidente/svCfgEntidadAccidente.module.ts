import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SvCfgEntidadAccidenteComponent } from './svCfgEntidadAccidente.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { SvCfgEntidadAccidenteService } from '../../../../services/svCfgEntidadAccidente.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { SelectModule } from 'angular2-select';

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(), SelectModule],
    declarations: [SvCfgEntidadAccidenteComponent, NewComponent, EditComponent],
    exports: [SvCfgEntidadAccidenteComponent, NewComponent, EditComponent],
    providers: [SvCfgEntidadAccidenteService]
})

export class SvCfgEntidadAccidenteModule { }

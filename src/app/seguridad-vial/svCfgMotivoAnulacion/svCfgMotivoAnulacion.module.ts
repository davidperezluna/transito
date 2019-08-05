import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SvCfgMotivoAnulacionComponent } from './svCfgMotivoAnulacion.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { SvCfgMotivoAnulacionService } from '../../services/svCfgMotivoAnulacion.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { SelectModule } from 'angular2-select';

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(), SelectModule],
    declarations: [SvCfgMotivoAnulacionComponent, NewComponent, EditComponent],
    exports: [SvCfgMotivoAnulacionComponent, NewComponent, EditComponent],
    providers: [SvCfgMotivoAnulacionService]
})

export class SvCfgMotivoAnulacionModule { }

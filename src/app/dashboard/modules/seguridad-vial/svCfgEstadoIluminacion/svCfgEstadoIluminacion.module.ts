import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SvCfgEstadoIluminacionComponent } from './svCfgEstadoIluminacion.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { SvCfgEstadoIluminacionService } from '../../../../services/svCfgEstadoIluminacion.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { SelectModule } from 'angular2-select';

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(), SelectModule],
    declarations: [SvCfgEstadoIluminacionComponent, NewComponent, EditComponent],
    exports: [SvCfgEstadoIluminacionComponent, NewComponent, EditComponent],
    providers: [SvCfgEstadoIluminacionService]
})

export class SvCfgEstadoIluminacionModule { }

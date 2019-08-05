import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SvCfgIluminacionComponent } from './svCfgIluminacion.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { SvCfgIluminacionService } from '../../../../services/svCfgIluminacion.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { SelectModule } from 'angular2-select';

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(), SelectModule],
    declarations: [SvCfgIluminacionComponent, NewComponent, EditComponent],
    exports: [SvCfgIluminacionComponent, NewComponent, EditComponent],
    providers: [SvCfgIluminacionService]
})

export class SvCfgIluminacionModule { }

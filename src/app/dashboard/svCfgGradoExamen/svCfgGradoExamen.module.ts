import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SvCfgGradoExamenComponent } from './svCfgGradoExamen.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { SvCfgGradoExamenService } from '../../services/svCfgGradoExamen.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { SelectModule } from 'angular2-select';

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(), SelectModule],
    declarations: [SvCfgGradoExamenComponent, NewComponent, EditComponent],
    exports: [SvCfgGradoExamenComponent, NewComponent, EditComponent],
    providers: [SvCfgGradoExamenService]
})

export class SvCfgGradoExamenModule { }

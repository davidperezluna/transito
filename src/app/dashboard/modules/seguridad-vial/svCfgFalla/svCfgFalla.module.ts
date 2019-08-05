import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SvCfgFallaComponent } from './svCfgFalla.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { SvCfgFallaService } from '../../../../services/svCfgFalla.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { SelectModule } from 'angular2-select';

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(), SelectModule],
    declarations: [SvCfgFallaComponent, NewComponent, EditComponent],
    exports: [SvCfgFallaComponent, NewComponent, EditComponent],
    providers: [SvCfgFallaService]
})

export class SvCfgFallaModule { }

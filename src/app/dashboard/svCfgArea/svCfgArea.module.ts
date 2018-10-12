import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SvCfgAreaComponent } from './svCfgArea.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { SvCfgAreaService } from '../../services/svCfgArea.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { SelectModule } from 'angular2-select';

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(), SelectModule],
    declarations: [SvCfgAreaComponent, NewComponent, EditComponent],
    exports: [SvCfgAreaComponent, NewComponent, EditComponent],
    providers: [SvCfgAreaService]
})

export class SvCfgAreaModule { }

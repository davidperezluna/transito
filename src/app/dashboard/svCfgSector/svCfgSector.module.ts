import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SvCfgSectorComponent } from './svCfgSector.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { SvCfgSectorService } from '../../services/svCfgSector.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { SelectModule } from 'angular2-select';

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(), SelectModule],
    declarations: [SvCfgSectorComponent, NewComponent, EditComponent],
    exports: [SvCfgSectorComponent, NewComponent, EditComponent],
    providers: [SvCfgSectorService]
})

export class SvCfgSectorModule { }

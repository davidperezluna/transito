import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SvCfgZonaComponent } from './svCfgZona.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { SvCfgZonaService } from '../../../../services/svCfgZona.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { SelectModule } from 'angular2-select';

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(), SelectModule],
    declarations: [SvCfgZonaComponent, NewComponent, EditComponent],
    exports: [SvCfgZonaComponent, NewComponent, EditComponent],
    providers: [SvCfgZonaService]
})

export class SvCfgZonaModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SvCfgControlesTransitoComponent } from './svCfgControlesTransito.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { SvCfgControlesTransitoService } from '../../services/svCfgControlesTransito.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { SelectModule } from 'angular2-select';

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(), SelectModule],
    declarations: [SvCfgControlesTransitoComponent, NewComponent, EditComponent],
    exports: [SvCfgControlesTransitoComponent, NewComponent, EditComponent],
    providers: [SvCfgControlesTransitoService]
})

export class SvCfgControlesTransitoModule { }

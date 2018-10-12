import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SvCfgVisualComponent } from './svCfgVisual.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { SvCfgVisualService } from '../../services/svCfgVisual.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { SelectModule } from 'angular2-select';

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(), SelectModule],
    declarations: [SvCfgVisualComponent, NewComponent, EditComponent],
    exports: [SvCfgVisualComponent, NewComponent, EditComponent],
    providers: [SvCfgVisualService]
})

export class SvCfgVisualModule { }

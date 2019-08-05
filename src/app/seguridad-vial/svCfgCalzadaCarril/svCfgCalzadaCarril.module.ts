import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SvCfgCalzadaCarrilComponent } from './svCfgCalzadaCarril.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { SvCfgCalzadaCarrilService } from '../../services/svCfgCalzadaCarril.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { SelectModule } from 'angular2-select';

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(), SelectModule],
    declarations: [SvCfgCalzadaCarrilComponent, NewComponent, EditComponent],
    exports: [SvCfgCalzadaCarrilComponent, NewComponent, EditComponent],
    providers: [SvCfgCalzadaCarrilService]
})

export class SvCfgCalzadaCarrilModule { }

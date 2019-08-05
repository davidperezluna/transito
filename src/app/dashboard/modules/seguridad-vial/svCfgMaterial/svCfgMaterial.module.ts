import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SvCfgMaterialComponent } from './svCfgMaterial.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { SvCfgMaterialService } from '../../../../services/svCfgMaterial.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { SelectModule } from 'angular2-select';

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(), SelectModule],
    declarations: [SvCfgMaterialComponent, NewComponent, EditComponent],
    exports: [SvCfgMaterialComponent, NewComponent, EditComponent],
    providers: [SvCfgMaterialService]
})

export class SvCfgMaterialModule { }

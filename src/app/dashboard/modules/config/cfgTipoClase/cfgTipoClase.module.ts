import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CfgTipoClaseComponent } from './cfgTipoClase.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { CfgTipoClaseService } from '../../../../services/cfgTipoClase.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { SelectModule } from 'angular2-select';

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(), SelectModule],
    declarations: [CfgTipoClaseComponent, NewComponent, EditComponent],
    exports: [CfgTipoClaseComponent, NewComponent, EditComponent],
    providers: [CfgTipoClaseService]
})

export class CfgTipoClaseModule { }

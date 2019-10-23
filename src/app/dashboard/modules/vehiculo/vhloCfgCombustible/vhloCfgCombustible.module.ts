import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2BootstrapModule } from 'ng2-bootstrap';

import {VhloCfgCombustibleService} from '../../../../services/vhloCfgCombustible.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
// import {SelectModule} from 'angular2-select';

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot()],
    declarations: [NewComponent,EditComponent],
    exports: [NewComponent,EditComponent],
    providers:[VhloCfgCombustibleService]
})

export class VhloCfgCombustibleModule { }

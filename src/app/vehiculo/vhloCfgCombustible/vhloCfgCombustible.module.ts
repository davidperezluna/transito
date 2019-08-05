import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VhloCfgCombustibleComponent} from './vhloCfgCombustible.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import {VhloCfgCombustibleService} from '../../services/vhloCfgCombustible.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
// import {SelectModule} from 'angular2-select';


@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot()],
    declarations: [VhloCfgCombustibleComponent,NewComponent,EditComponent],
    exports: [VhloCfgCombustibleComponent, NewComponent,EditComponent],
    providers:[VhloCfgCombustibleService]
})

export class VhloCfgCombustibleModule { }

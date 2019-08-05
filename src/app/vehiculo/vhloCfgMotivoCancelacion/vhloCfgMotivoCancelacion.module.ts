import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VhloCfgMotivoCancelacionComponent } from './vhloCfgMotivoCancelacion.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { VhloCfgMotivoCancelacionService } from '../../services/vhloCfgMotivoCancelacion.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { SelectModule } from 'angular2-select';
// import {SelectModule} from 'angular2-select';


@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(), SelectModule],
    declarations: [VhloCfgMotivoCancelacionComponent, NewComponent, EditComponent],
    exports: [VhloCfgMotivoCancelacionComponent, NewComponent, EditComponent],
    providers: [VhloCfgMotivoCancelacionService]
})

export class VhloCfgMotivoCancelacionModule { }

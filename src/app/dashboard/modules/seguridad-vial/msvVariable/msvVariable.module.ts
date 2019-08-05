import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MsvVariableComponent } from './msvVariable.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { MsvVariableService } from '../../../../services/msvVariable.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { SelectModule } from 'angular2-select';

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(), SelectModule],
    declarations: [MsvVariableComponent, NewComponent, EditComponent],
    exports: [MsvVariableComponent, NewComponent, EditComponent],
    providers: [MsvVariableService]
})

export class MsvVariableModule { }
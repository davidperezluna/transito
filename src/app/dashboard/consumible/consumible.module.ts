import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsumibleComponent } from './consumible.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import {ConsumibleService} from '../../services/consumible.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
// import {SelectModule} from 'angular2-select';


@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot()],
    declarations: [ConsumibleComponent,NewComponent,EditComponent],
    exports: [ConsumibleComponent, NewComponent,EditComponent],
    providers:[ConsumibleService]
})

export class ConsumibleModule { }

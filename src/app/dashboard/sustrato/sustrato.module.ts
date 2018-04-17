import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SustratoComponent } from './sustrato.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { SustratoService } from '../../services/sustrato.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import {SelectModule} from 'angular2-select';


@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [SustratoComponent,NewComponent,EditComponent],
    exports: [SustratoComponent, NewComponent,EditComponent],
    providers:[SustratoService]
})

export class SustratoModule { }

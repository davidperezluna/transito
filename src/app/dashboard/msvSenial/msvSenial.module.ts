import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MsvSenialComponent } from './msvSenial.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { MsvSenialService } from '../../services/msvSenial.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import {SelectModule} from 'angular2-select';

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [MsvSenialComponent,NewComponent,EditComponent],
    exports: [MsvSenialComponent, NewComponent,EditComponent],
    providers: [MsvSenialService]
})

export class MsvSenialModule { }

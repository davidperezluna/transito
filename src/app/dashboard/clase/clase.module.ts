import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClaseComponent } from './clase.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import {ClaseService} from '../../services/clase.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import {SelectModule} from 'angular2-select';
// import {SelectModule} from 'angular2-select';


@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [ClaseComponent,NewComponent,EditComponent],
    exports: [ClaseComponent, NewComponent,EditComponent],
    providers:[ClaseService]
})

export class ClaseModule { }

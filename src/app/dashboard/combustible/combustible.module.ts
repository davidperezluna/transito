import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CombustibleComponent } from './combustible.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import {CombustibleService} from '../../services/combustible.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
// import {SelectModule} from 'angular2-select';


@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot()],
    declarations: [CombustibleComponent,NewComponent,EditComponent],
    exports: [CombustibleComponent, NewComponent,EditComponent],
    providers:[CombustibleService]
})

export class ColorModule { }

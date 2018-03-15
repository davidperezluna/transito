import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColorComponent } from './color.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import {ColorService} from '../../services/color.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
// import {SelectModule} from 'angular2-select';


@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot()],
    declarations: [ColorComponent,NewComponent,EditComponent],
    exports: [ColorComponent, NewComponent,EditComponent],
    providers:[ColorService]
})

export class ColorModule { }

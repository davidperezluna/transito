import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfraccionComponent } from './infraccion.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { InfraccionService } from '../../services/infraccion.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import {SelectModule} from 'angular2-select';


@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [InfraccionComponent,NewComponent,EditComponent],
    exports: [InfraccionComponent, NewComponent,EditComponent],
    providers:[InfraccionService]
})

export class InfraccionModule { }

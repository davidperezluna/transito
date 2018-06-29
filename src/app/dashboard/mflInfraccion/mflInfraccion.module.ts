import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MflInfraccionComponent } from './mflInfraccion.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { MflInfraccionService } from '../../services/mflInfraccion.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { SelectModule } from 'angular2-select';

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [MflInfraccionComponent,NewComponent,EditComponent],
    exports: [MflInfraccionComponent, NewComponent,EditComponent],
    providers:[MflInfraccionService]
})

export class MflInfraccionModule { }

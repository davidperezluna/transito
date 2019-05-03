import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FroInfraccionComponent } from './froInfraccion.component';
import { FroInfraccionService } from '../../services/froInfraccion.service';
import { Ng2BootstrapModule } from 'ng2-bootstrap';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { SelectModule } from 'angular2-select';

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [FroInfraccionComponent,NewComponent,EditComponent],
    exports: [FroInfraccionComponent, NewComponent,EditComponent],
    providers:[FroInfraccionService]
})

export class FroInfraccionModule { }

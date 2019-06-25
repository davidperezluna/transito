import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SelectModule} from 'angular2-select';
import { Ng2BootstrapModule } from 'ng2-bootstrap';

import { PqoInmovilizacionService } from '../../services/pqoInmovilizacion.service';

import { PqoInmovilizacionComponent } from './pqoInmovilizacion.component';
import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { ExitComponent } from './exit/exit.component';

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [
        PqoInmovilizacionComponent,
        NewComponent,
        EditComponent,
        ExitComponent
    ],
    exports: [
        PqoInmovilizacionComponent,
        NewComponent,
        EditComponent,
        ExitComponent
    ],
    providers:[PqoInmovilizacionService]
})

export class PqoInmovilizacionModule { }

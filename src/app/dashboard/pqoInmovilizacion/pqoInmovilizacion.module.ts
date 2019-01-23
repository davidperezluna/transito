import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PqoInmovilizacionComponent } from './pqoInmovilizacion.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { PqoInmovilizacionService } from '../../services/pqoInmovilizacion.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import {SelectModule} from 'angular2-select';


@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [PqoInmovilizacionComponent,NewComponent,EditComponent],
    exports: [PqoInmovilizacionComponent, NewComponent,EditComponent],
    providers:[PqoInmovilizacionService]
})

export class PqoInmovilizacionModule { }

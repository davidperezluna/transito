import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MparqInmovilizacionComponent } from './mparqInmovilizacion.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { MparqInmovilizacionService } from '../../services/mparqInmovilizacion.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import {SelectModule} from 'angular2-select';


@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [MparqInmovilizacionComponent,NewComponent,EditComponent],
    exports: [MparqInmovilizacionComponent, NewComponent,EditComponent],
    providers:[MparqInmovilizacionService]
})

export class MparqInmovilizacionModule { }

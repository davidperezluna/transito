import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PnalAsignacionComponent } from './pnalAsignacion.component';
import { PnalAsignacionService } from '../../services/pnalAsignacion.service';
import { Ng2BootstrapModule } from 'ng2-bootstrap';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { SelectModule } from 'angular2-select';


@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [PnalAsignacionComponent,NewComponent,EditComponent],
    exports: [PnalAsignacionComponent, NewComponent,EditComponent],
    providers:[PnalAsignacionService]
})

export class PnalAsignacionModule { }

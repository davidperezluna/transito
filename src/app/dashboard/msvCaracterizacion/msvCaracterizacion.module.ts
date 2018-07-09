import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MsvCaracterizacionComponent } from './msvCaracterizacion.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { MsvCaracterizacionService } from '../../services/msvCaracterizacion.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { SelectModule } from 'angular2-select';


@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [MsvCaracterizacionComponent,NewComponent,EditComponent],
    exports: [MsvCaracterizacionComponent, NewComponent,EditComponent],
    providers:[MsvCaracterizacionService]
})

export class MsvCaracterizacionModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { msvCaracterizacionComponent } from './msvCaracterizacion.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { msvCaracterizacionService } from '../../services/msvCaracterizacion.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { SelectModule } from 'angular2-select';


@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [msvCaracterizacionComponent,NewComponent,EditComponent],
    exports: [msvCaracterizacionComponent, NewComponent,EditComponent],
    providers:[msvCaracterizacionComponent]
})

export class msvCaracterizacionModule { }

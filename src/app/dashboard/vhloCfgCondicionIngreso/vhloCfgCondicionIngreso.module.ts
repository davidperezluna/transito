import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VhloCfgCondicionIngresoComponent } from './vhloCfgCondicionIngreso.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { VhloCfgCondicionIngresoService } from '../../services/vhloCfgCondicionIngreso.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { SelectModule } from 'angular2-select';

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [VhloCfgCondicionIngresoComponent,NewComponent,EditComponent],
    exports: [VhloCfgCondicionIngresoComponent, NewComponent,EditComponent],
    providers:[VhloCfgCondicionIngresoService]
})

export class VhloCfgCondicionIngresoModule { }

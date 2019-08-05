import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectModule } from 'angular2-select';
import { Ng2BootstrapModule } from 'ng2-bootstrap';

import { VhloLimitacionComponent } from './vhloLimitacion.component';
import { NewComponent } from './new/new.component';
import { DeleteComponent } from './delete/delete.component';

import { VhloLimitacionService } from '../../services/vhloLimitacion.service';


@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [
        VhloLimitacionComponent,
        NewComponent,
        DeleteComponent
    ],
    exports: [
        VhloLimitacionComponent, 
        NewComponent,
        DeleteComponent
    ],
    providers: [VhloLimitacionService]
})

export class VhloLimitacionModule { }

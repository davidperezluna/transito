import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VhloPropietarioComponent } from './vhloPropietario.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { VhloPropietarioService } from '../../../../services/vhloPropietario.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { SelectModule } from 'angular2-select';

import { TooltipModule } from "ngx-tooltip";

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(), SelectModule, TooltipModule],
    declarations: [VhloPropietarioComponent,NewComponent,EditComponent],
    exports: [VhloPropietarioComponent, NewComponent,EditComponent],
    providers:[VhloPropietarioService]     
})

export class VhloPropietarioModule { }

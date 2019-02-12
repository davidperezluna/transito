import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FroTrtePrecioComponent } from './froTrtePrecio.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { FroTrtePrecioService } from '../../services/froTrtePrecio.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { SelectModule } from 'angular2-select';

import { TooltipModule } from "ngx-tooltip";

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(), SelectModule, TooltipModule],
    declarations: [FroTrtePrecioComponent, NewComponent, EditComponent],
    exports: [FroTrtePrecioComponent, NewComponent, EditComponent],
    providers: [FroTrtePrecioService]
})

export class FroTrtePrecioModule { }

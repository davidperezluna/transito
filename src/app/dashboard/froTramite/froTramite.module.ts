import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { SelectModule } from 'angular2-select';
import { PopoverModule } from "ngx-popover";
import { TooltipModule } from "ngx-tooltip";

import { FroTramiteService } from '../../services/froTramite.service';

import { FroTramiteComponent } from './froTramite.component';
import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(), SelectModule, PopoverModule, TooltipModule],
    declarations: [FroTramiteComponent, NewComponent, EditComponent],
    exports: [FroTramiteComponent, NewComponent, EditComponent],
    providers: [FroTramiteService]
})

export class FroTramiteModule { }

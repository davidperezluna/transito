import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FroTramiteComponent } from './froTramite.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { FroTramiteService } from '../../services/froTramite.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { SelectModule } from 'angular2-select';

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(), SelectModule],
    declarations: [FroTramiteComponent, NewComponent, EditComponent],
    exports: [FroTramiteComponent, NewComponent, EditComponent],
    providers: [FroTramiteService]
})

export class FroTramiteModule { }

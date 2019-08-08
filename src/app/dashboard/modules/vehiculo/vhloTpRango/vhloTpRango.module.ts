import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { SelectModule } from 'angular2-select';

import { UserEmpresaService } from '../../../../services/userEmpresa.service';
import { VhloTpRangoService } from '../../../../services/vhloTpRango.service';
import { NewComponent } from './new/new.component';
/* import { EditComponent } from './edit/edit.component'; */


@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(), SelectModule],
    declarations: [NewComponent],
    exports: [NewComponent],
    providers: [UserEmpresaService, VhloTpRangoService]
})

export class VhloTpRangoModule { }

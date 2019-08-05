import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VhloTpRangoComponent } from './vhloTpRango.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { UserEmpresaService } from '../../services/userEmpresa.service';
import { VhloTpRangoService } from '../../services/vhloTpRango.service';
import { NewComponent } from './new/new.component';
/* import { EditComponent } from './edit/edit.component'; */
import { SelectModule } from 'angular2-select';


@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(), SelectModule],
    declarations: [VhloTpRangoComponent, NewComponent],
    exports: [VhloTpRangoComponent, NewComponent],
    providers: [UserEmpresaService, VhloTpRangoService]
})

export class VhloTpRangoModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VhloTpAsignacionComponent } from './vhloTpAsignacion.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { UserEmpresaService } from '../../../../services/userEmpresa.service';
import { VhloTpAsignacionService } from '../../../../services/vhloTpAsignacion.service';
import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { SelectModule } from 'angular2-select';


@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(), SelectModule],
    declarations: [VhloTpAsignacionComponent, NewComponent, EditComponent],
    exports: [VhloTpAsignacionComponent, NewComponent, EditComponent],
    providers: [UserEmpresaService, VhloTpAsignacionService]
})

export class VhloTpAsignacionModule { }

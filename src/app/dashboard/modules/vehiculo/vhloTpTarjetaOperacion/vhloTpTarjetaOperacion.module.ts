import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VhloTpTarjetaOperacionComponent } from './vhloTpTarjetaOperacion.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { UserEmpresaService } from '../../../../services/userEmpresa.service';
import { VhloTpTarjetaOperacionService } from '../../../../services/vhloTpTarjetaOperacion.service';
import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { SelectModule } from 'angular2-select';


@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(), SelectModule],
    declarations: [VhloTpTarjetaOperacionComponent, NewComponent, EditComponent],
    exports: [VhloTpTarjetaOperacionComponent, NewComponent, EditComponent],
    providers: [UserEmpresaService, VhloTpTarjetaOperacionService]
})

export class VhloTpTarjetaOperacionModule { }

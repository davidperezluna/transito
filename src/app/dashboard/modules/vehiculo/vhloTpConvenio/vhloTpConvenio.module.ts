import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VhloTpConvenioComponent } from './vhloTpConvenio.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { UserEmpresaService } from '../../../../services/userEmpresa.service';
import { VhloTpConvenioService } from '../../../../services/vhloTpConvenio.service';
import { UserEmpresaTransporteService } from "../../../../services/userEmpresaTransporte.service";
import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { EnableComponent } from "./enable/enable.component";
import { ShowComponent } from './show/show.component';
import { SelectModule } from 'angular2-select';


@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [VhloTpConvenioComponent, NewComponent, EditComponent, ShowComponent, EnableComponent],
    exports: [VhloTpConvenioComponent, NewComponent, EditComponent, ShowComponent, EnableComponent],
    providers: [UserEmpresaService, VhloTpConvenioService, UserEmpresaTransporteService]
})

export class VhloTpConvenioModule { }

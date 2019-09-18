import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { SelectModule } from 'angular2-select';

import { UserEmpresaService } from '../../../../services/userEmpresa.service';
import { VhloTpConvenioService } from '../../../../services/vhloTpConvenio.service';
import { UserEmpresaTransporteService } from "../../../../services/userEmpresaTransporte.service";
import { PnalFuncionarioService } from '../../../../services/pnalFuncionario.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { EnableComponent } from "./enable/enable.component";
import { ShowComponent } from './show/show.component';


@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [NewComponent, EditComponent, ShowComponent, EnableComponent],
    exports: [NewComponent, EditComponent, ShowComponent, EnableComponent],
    providers: [
        UserEmpresaService,
        VhloTpConvenioService,
        UserEmpresaTransporteService,
        PnalFuncionarioService
    ]
})

export class VhloTpConvenioModule { }

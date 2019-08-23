import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import {SelectModule} from 'angular2-select';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';

import { ImoLoteService } from '../../../../services/imoLote.service';
import { UserEmpresaService } from '../../../../services/userEmpresa.service';
import { CfgOrganismoTransitoService } from '../../../../services/cfgOrganismoTransito.service';
import { ImoCfgTipoService } from '../../../../services/imoCfgTipo.service';

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(), SelectModule],
    declarations: [NewComponent,EditComponent],
    exports: [NewComponent,EditComponent],
    providers: [
        ImoLoteService,
        ImoCfgTipoService,
        UserEmpresaService,
        CfgOrganismoTransitoService
    ]
})

export class ImoLoteModule { }
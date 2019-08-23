import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { SelectModule } from 'angular2-select';

import { NewComponent } from './new/new.component';
import { ShowComponent } from './show/show.component';

import { ImoInsumoService } from '../../../../services/imoInsumo.service';
import { ImoAsignacionService } from '../../../../services/imoAsignacion.service';
import { ImoCfgTipoService } from '../../../../services/imoCfgTipo.service';
import { ImoTrazabilidadService } from '../../../../services/imoTrazabilidad.service';
import { PnalFuncionarioService } from '../../../../services/pnalFuncionario.service';
import { CfgOrganismoTransitoService } from '../../../../services/cfgOrganismoTransito.service';
import { ImoLoteService } from '../../../../services/imoLote.service';

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(), SelectModule],
    declarations: [NewComponent,ShowComponent],
    exports: [NewComponent,ShowComponent],
    providers:[
        ImoInsumoService,
        ImoCfgTipoService,
        ImoTrazabilidadService,
        ImoAsignacionService,
        PnalFuncionarioService,
        CfgOrganismoTransitoService,
        ImoLoteService,
    ]
})

export class ImoReasignacionModule { }
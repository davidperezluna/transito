import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { SelectModule } from 'angular2-select';

import { SvCapacitacionService } from '../../../../services/svCapacitacion.service';
import { CfgMunicipioService } from '../../../../services/cfgMunicipio.service';
import { SvCfgFuncionService } from '../../../../services/svCfgFuncion.service';
import { SvCfgFuncionCriterioService } from '../../../../services/svCfgFuncionCriterio.service';
import { SvCfgTemaCapacitacionService } from '../../../../services/svCfgTemaCapacitacion.service';
import { SvCfgClaseActorViaService } from '../../../../services/svCfgClaseActorVia.service';
import { UserCfgTipoIdentificacionService } from '../../../../services/userCfgTipoIdentificacion.service';
import { UserCfgGeneroService } from '../../../../services/userCfgGenero.service';
import { UserCfgGrupoEtnicoService } from '../../../../services/userCfgGrupoEtnico.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { ShowComponent } from './show/show.component';

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(), SelectModule],
    declarations: [NewComponent, EditComponent, ShowComponent],
    exports: [NewComponent, EditComponent, ShowComponent],
    providers: [
        SvCapacitacionService,
        SvCapacitacionService,
        CfgMunicipioService,
        SvCfgFuncionService,
        SvCfgFuncionCriterioService,
        SvCfgTemaCapacitacionService,
        SvCfgClaseActorViaService,
        UserCfgTipoIdentificacionService,
        UserCfgGeneroService,
        UserCfgGrupoEtnicoService,
    ]
})

export class SvCapacitacionModule { }

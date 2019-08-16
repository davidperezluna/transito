import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserCiudadanoService } from '../../../../services/userCiudadano.service';
import { Ng2BootstrapModule } from 'ng2-bootstrap';

import { NewCiudadanoComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { ShowComponent } from './show/show.component';
import { SelectModule } from 'angular2-select';
import { TooltipModule } from "ngx-tooltip";

import { UserCfgTipoIdentificacionService } from '../../../../services/userCfgTipoIdentificacion.service';
import { UserCfgGeneroService } from '../../../../services/userCfgGenero.service';
import { UserCfgGrupoSanguineoService } from '../../../../services/userCfgGrupoSanguineo.service';
import { CfgMunicipioService } from '../../../../services/cfgMunicipio.service';
import { CfgPaisService } from '../../../../services/cfgPais.service';
import { CfgDepartamentoService } from '../../../../services/cfgDepartamento.service';
import { UserCfgRoleService } from '../../../../services/userCfgRole.service';


@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(), SelectModule, TooltipModule],
    declarations: [
        NewCiudadanoComponent,
        EditComponent,
        ShowComponent
    ],
    exports: [
        NewCiudadanoComponent,
        EditComponent,
        ShowComponent
    ],
    providers:[
        UserCiudadanoService,
        UserCfgTipoIdentificacionService,
        UserCfgGeneroService,
        UserCfgGrupoSanguineoService,
        CfgMunicipioService,
        CfgPaisService,
        CfgDepartamentoService,
        UserCfgRoleService,
    ]
})

export class UserCiudadanoModule { }
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserLicenciaConduccionComponent } from './userLicenciaConduccion.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { CfgOrganismoTransitoService } from '../../../../services/cfgOrganismoTransito.service';
import { UserLcCfgCategoriaService } from '../../../../services/userLcCfgCategoria.service';
import { VhloCfgClaseService } from '../../../../services/vhloCfgClase.service';
import { VhloCfgServicioService } from '../../../../services/vhloCfgServicio.service';
import { UserCiudadanoService } from '../../../../services/userCiudadano.service';
import { CfgPaisService } from '../../../../services/cfgPais.service';

import { CfgEntidadJudicialService } from '../../../../services/cfgEntidadJudicial.service';
import { UserLcProhibicionService } from '../../../../services/userLcProhibicion.service';

import { UserLicenciaConduccionService } from '../../../../services/userLicenciaConduccion.service';
import { UserLicenciaConduccionRestriccionService } from '../../../../services/userLicenciaConduccionRestriccion.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { SelectModule } from 'angular2-select';

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(), SelectModule],
    declarations: [UserLicenciaConduccionComponent, NewComponent, EditComponent],
    exports: [UserLicenciaConduccionComponent, NewComponent, EditComponent],
    providers: [
        CfgOrganismoTransitoService,
        UserLcCfgCategoriaService,
        VhloCfgClaseService,
        VhloCfgServicioService,
        UserCiudadanoService,
        CfgPaisService,
        UserLicenciaConduccionService,
        UserLicenciaConduccionRestriccionService,
        CfgEntidadJudicialService,
        UserLcProhibicionService
    ]
})

export class UserLicenciaConduccionModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { SelectModule } from 'angular2-select';

import { UserEmpresaService } from '../../../../services/userEmpresa.service';
import { UserEmpresaSucursalService } from '../../../../services/userEmpresaSucursal.service';
import { UserCfgEmpresaTipoService } from '../../../../services/userCfgEmpresaTipo.service';
import { UserCfgEmpresaTipoSociedadService } from '../../../../services/userCfgEmpresaTipoSociedad.service';
import { UserEmpresaRepresentanteService } from '../../../../services/userEmpresaRepresentante.service';

import { NewEmpresaComponent } from './new/new.component';
import { ShowComponent } from './show/show.component';
import { EditComponent } from './edit/edit.component';
import { NewRepresentanteComponent } from './representante/new/new.component';
import { EditRepresentanteComponent } from './representante/edit/edit.component';
import { NewSucursalComponent } from './sucursal/new/new.component';
import { EditSucursalComponent } from './sucursal/edit/edit.component';

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [
        NewEmpresaComponent,
        EditComponent,
        ShowComponent,
        NewRepresentanteComponent,
        EditRepresentanteComponent,
        NewSucursalComponent,
        EditSucursalComponent
    ],
    exports: [
        NewEmpresaComponent,
        EditComponent,
        ShowComponent,
        NewRepresentanteComponent,
        EditRepresentanteComponent,
        NewSucursalComponent,
        EditSucursalComponent
    ],
    providers: [
        UserEmpresaService,
        UserCfgEmpresaTipoService,
        UserCfgEmpresaTipoSociedadService,
        UserEmpresaSucursalService,
        UserEmpresaRepresentanteService
    ]
})

export class UserEmpresaModule { }

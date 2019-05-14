import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserEmpresaComponent } from './userEmpresa.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { UserEmpresaService } from '../../services/userEmpresa.service';
import { UserEmpresaSucursalService } from '../../services/userEmpresaSucursal.service';
import { UserCfgEmpresaTipoService } from '../../services/userCfgEmpresaTipo.service';
import { UserCfgEmpresaTipoSociedadService } from '../../services/userCfgEmpresaTipoSociedad.service';
import { NewSucursalComponent } from './sucursal/new/new.component';
import { NewEmpresaComponent } from './new/new.component';
import { ShowComponent } from './show/show.component';
import { EditComponent } from './edit/edit.component';
import { SelectModule } from 'angular2-select';
import { UserEmpresaRepresentanteService } from '../../services/userEmpresaRepresentante.service';


@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [UserEmpresaComponent,NewEmpresaComponent,EditComponent,NewSucursalComponent,ShowComponent],
    exports: [UserEmpresaComponent, NewEmpresaComponent,EditComponent,NewSucursalComponent,ShowComponent],
    providers: [UserEmpresaService, UserCfgEmpresaTipoService, UserCfgEmpresaTipoSociedadService, UserEmpresaSucursalService, UserEmpresaRepresentanteService]
})

export class UserEmpresaModule { }

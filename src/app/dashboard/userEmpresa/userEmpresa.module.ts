import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserEmpresaComponent } from './userEmpresa.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { UserEmpresaService } from '../../services/userEmpresa.service';
import { SucursalService } from '../../services/sucursal.service';
import { TipoUserEmpresaService } from '../../services/tipoEmpresa.service';
import { TipoSociedadService } from '../../services/tipoSociedad.service';
import { NewSucursalComponent } from './sucursal/new/newSucursal.component';
import { NewEmpresaComponent } from './new/new.component';
import { ShowComponent } from './show/show.component';
import { EditComponent } from './edit/edit.component';
import { SelectModule } from 'angular2-select';
import { RepresentanteUserEmpresaService } from '../../services/representanteEmpresa.service';


@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [UserEmpresaComponent,NewEmpresaComponent,EditComponent,NewSucursalComponent,ShowComponent],
    exports: [UserEmpresaComponent, NewEmpresaComponent,EditComponent,NewSucursalComponent,ShowComponent],
    providers:[UserEmpresaService,TipoUserEmpresaService,TipoSociedadService, SucursalService,RepresentanteUserEmpresaService]
})

export class UserEmpresaModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmpresaComponent } from './empresa.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import {EmpresaService} from '../../services/empresa.service';
import {SucursalService} from '../../services/sucursal.service';
import {TipoEmpresaService} from '../../services/tipoEmpresa.service';
import {TipoSociedadService} from '../../services/tipoSociedad.service';
import { NewSucursalComponent } from './sucursal/new/newSucursal.component';
import {MunicipioService} from '../../services/municipio.service';
import { NewEmpresaComponent } from './new/new.component';
import { ShowComponent } from './show/show.component';
import { EditComponent } from './edit/edit.component';
import {SelectModule} from 'angular2-select';
import { RepresentanteEmpresaService } from '../../services/representanteEmpresa.service';


@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [EmpresaComponent,NewEmpresaComponent,EditComponent,NewSucursalComponent,ShowComponent],
    exports: [EmpresaComponent, NewEmpresaComponent,EditComponent,NewSucursalComponent,ShowComponent],
    providers:[EmpresaService,TipoEmpresaService,TipoSociedadService, SucursalService,RepresentanteEmpresaService]
})

export class EmpresaModule { }

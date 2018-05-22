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
import { EditComponent } from './edit/edit.component';
import {SelectModule} from 'angular2-select';


@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [EmpresaComponent,NewEmpresaComponent,EditComponent,NewSucursalComponent],
    exports: [EmpresaComponent, NewEmpresaComponent,EditComponent,NewSucursalComponent],
    providers:[EmpresaService,TipoEmpresaService,TipoSociedadService, SucursalService]
})

export class EmpresaModule { }

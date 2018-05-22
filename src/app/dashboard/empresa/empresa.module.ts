import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmpresaComponent } from './empresa.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import {EmpresaService} from '../../services/empresa.service';

import {TipoEmpresaService} from '../../services/tipoEmpresa.service';
import {TipoSociedadService} from '../../services/tipoSociedad.service';
import {MunicipioService} from '../../services/municipio.service';
import { NewEmpresaComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import {SelectModule} from 'angular2-select';


@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [EmpresaComponent,NewEmpresaComponent,EditComponent],
    exports: [EmpresaComponent, NewEmpresaComponent,EditComponent],
    providers:[EmpresaService,TipoEmpresaService,TipoSociedadService]
})

export class EmpresaModule { }

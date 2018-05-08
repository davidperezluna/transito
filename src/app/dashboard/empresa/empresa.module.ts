import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmpresaComponent } from './empresa.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import {EmpresaService} from '../../services/empresa.service';
import {TipoIdentificacionService} from '../../services/tipoIdentificacion.service';

import { NewEmpresaComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import {SelectModule} from 'angular2-select';


@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [EmpresaComponent,NewEmpresaComponent,EditComponent],
    exports: [EmpresaComponent, NewEmpresaComponent,EditComponent],
    providers:[EmpresaService,TipoIdentificacionService]
})

export class EmpresaModule { }

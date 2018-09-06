import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CfgEmpresaServicioComponent } from './cfgEmpresaServicio.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { CfgEmpresaServicioService } from '../../services/cfgEmpresaServicio.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { SelectModule } from 'angular2-select';

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [CfgEmpresaServicioComponent,NewComponent,EditComponent],
    exports: [CfgEmpresaServicioComponent, NewComponent,EditComponent],
    providers:[CfgEmpresaServicioService]
})

export class CfgEmpresaServicioModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CfgLicenciaConduccionCategoriaComponent } from './cfgLicenciaConduccionCategoria.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { CfgLicenciaConduccionCategoriaService } from '../../services/cfgLicenciaConduccionCategoria.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { SelectModule } from 'angular2-select';


@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [CfgLicenciaConduccionCategoriaComponent,NewComponent,EditComponent],
    exports: [CfgLicenciaConduccionCategoriaComponent, NewComponent,EditComponent],
    providers:[CfgLicenciaConduccionCategoriaService]
})

export class CfgLicenciaConduccionCategoriaModule { }

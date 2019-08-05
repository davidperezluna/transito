import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SvCfgNacionalidadComponent } from './svCfgNacionalidad.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { SvCfgNacionalidadService } from '../../services/svCfgNacionalidad.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { SelectModule } from 'angular2-select';

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(), SelectModule],
    declarations: [SvCfgNacionalidadComponent, NewComponent, EditComponent],
    exports: [SvCfgNacionalidadComponent, NewComponent, EditComponent],
    providers: [SvCfgNacionalidadService]
})

export class SvCfgNacionalidadModule { }

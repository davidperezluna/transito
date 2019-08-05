import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SvCfgCardinalidadComponent } from './svCfgCardinalidad.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { SvCfgCardinalidadService } from '../../../../services/svCfgCardinalidad.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { SelectModule } from 'angular2-select';

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(), SelectModule],
    declarations: [SvCfgCardinalidadComponent, NewComponent, EditComponent],
    exports: [SvCfgCardinalidadComponent, NewComponent, EditComponent],
    providers: [SvCfgCardinalidadService]
})

export class SvCfgCardinalidadModule { }

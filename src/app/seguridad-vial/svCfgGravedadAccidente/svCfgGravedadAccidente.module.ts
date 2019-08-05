import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SvCfgGravedadAccidenteComponent } from './svCfgGravedadAccidente.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { SvCfgGravedadAccidenteService } from '../../services/svCfgGravedadAccidente.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import {SelectModule} from 'angular2-select';
// import {SelectModule} from 'angular2-select';


@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [SvCfgGravedadAccidenteComponent,NewComponent,EditComponent],
    exports: [SvCfgGravedadAccidenteComponent, NewComponent,EditComponent],
    providers:[SvCfgGravedadAccidenteService]
})

export class SvCfgGravedadAccidenteModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SvCfgObjetoFijoComponent } from './svCfgObjetoFijo.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { SvCfgObjetoFijoService } from '../../services/svCfgObjetoFijo.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import {SelectModule} from 'angular2-select';
// import {SelectModule} from 'angular2-select';


@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [SvCfgObjetoFijoComponent,NewComponent,EditComponent],
    exports: [SvCfgObjetoFijoComponent, NewComponent,EditComponent],
    providers:[SvCfgObjetoFijoService]
})

export class SvCfgObjetoFijoModule { }

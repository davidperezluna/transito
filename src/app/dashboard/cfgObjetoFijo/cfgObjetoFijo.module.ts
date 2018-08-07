import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CfgObjetoFijoComponent } from './cfgObjetoFijo.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { CfgObjetoFijoService } from '../../services/cfgObjetoFijo.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import {SelectModule} from 'angular2-select';
// import {SelectModule} from 'angular2-select';


@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [CfgObjetoFijoComponent,NewComponent,EditComponent],
    exports: [CfgObjetoFijoComponent, NewComponent,EditComponent],
    providers:[CfgObjetoFijoService]
})

export class CfgObjetoFijoModule { }

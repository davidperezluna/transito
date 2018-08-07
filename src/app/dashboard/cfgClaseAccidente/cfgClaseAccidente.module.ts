import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CfgClaseAccidenteComponent } from './cfgClaseAccidente.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { CfgClaseAccidenteService } from '../../services/cfgClaseAccidente.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import {SelectModule} from 'angular2-select';
// import {SelectModule} from 'angular2-select';


@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [CfgClaseAccidenteComponent,NewComponent,EditComponent],
    exports: [CfgClaseAccidenteComponent, NewComponent,EditComponent],
    providers:[CfgClaseAccidenteService]
})

export class CfgClaseAccidenteModule { }

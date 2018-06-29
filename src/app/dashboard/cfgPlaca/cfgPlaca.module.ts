import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CfgPlacaComponent } from './cfgPlaca.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { CfgPlacaService } from '../../services/cfgPlaca.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import {SelectModule} from 'angular2-select';
// import {SelectModule} from 'angular2-select';


@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [CfgPlacaComponent,NewComponent,EditComponent],
    exports: [CfgPlacaComponent, NewComponent,EditComponent],
    providers:[CfgPlacaService]
})

export class CfgPlacaModule { }

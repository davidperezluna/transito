import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CfgMunicipioComponent } from './cfgMunicipio.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { CfgMunicipioService } from '../../services/cfgMunicipio.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { SelectModule } from 'angular2-select';


@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [CfgMunicipioComponent,NewComponent,EditComponent],
    exports: [CfgMunicipioComponent, NewComponent,EditComponent], 
    providers:[CfgMunicipioService]
})

export class CfgMunicipioModule { }

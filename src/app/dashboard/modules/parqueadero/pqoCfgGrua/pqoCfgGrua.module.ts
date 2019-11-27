import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import {SelectModule} from 'angular2-select';

import { PqoCfgGruaService } from '../../../../services/pqoCfgGrua.service';
import { PqoGruaCiudadanoService } from '../../../../services/pqoGruaCiudadano.service';
import { UserCiudadanoService } from '../../../../services/userCiudadano.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { ShowComponent } from './show/show.component';

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [NewComponent,EditComponent,ShowComponent],
    exports: [NewComponent,EditComponent,ShowComponent],
    providers:[
        PqoCfgGruaService,
        PqoGruaCiudadanoService,
        UserCiudadanoService,
    ]
})

export class PqoCfgGruaModule { }

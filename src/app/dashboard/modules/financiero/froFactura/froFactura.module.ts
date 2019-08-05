import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { SelectModule } from 'angular2-select';

import { FroFacturaService } from '../../../../services/froFactura.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';

import { UserCiudadanoModule } from '../../usuario/userCiudadano/userCiudadano.module';

@NgModule({
    imports: [
        CommonModule, 
        Ng2BootstrapModule.forRoot(),
        SelectModule,
        UserCiudadanoModule
    ],
    declarations: [
        NewComponent,
        EditComponent,
    ],
    exports: [ 
        NewComponent,
        EditComponent,
    ],
    providers:[FroFacturaService]
})

export class FroFacturaModule { }

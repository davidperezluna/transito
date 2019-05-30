import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectModule } from 'angular2-select';
import { Ng2BootstrapModule } from 'ng2-bootstrap';

import { UserMedidaCautelarComponent } from './userMedidaCautelar.component';
import { NewComponent } from './new/new.component';
import { DeleteComponent } from './delete/delete.component';

import { UserMedidaCautelarService } from '../../services/userMedidaCautelar.service';

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [
        UserMedidaCautelarComponent,
        NewComponent,
        DeleteComponent
    ],
    exports: [
        UserMedidaCautelarComponent, 
        NewComponent,
        DeleteComponent
    ],
    providers: [UserMedidaCautelarService]
})

export class UserMedidaCautelarModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserCfgTipoMedidaCautelarComponent } from './userCfgTipoMedidaCautelar.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { UserCfgTipoMedidaCautelarService } from '../../../../services/userCfgTipoMedidaCautelar.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { SelectModule } from 'angular2-select';

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [UserCfgTipoMedidaCautelarComponent, NewComponent, EditComponent],
    exports: [UserCfgTipoMedidaCautelarComponent, NewComponent, EditComponent],
    providers:[UserCfgTipoMedidaCautelarService]
})

export class UserCfgTipoMedidaCautelarModule { }

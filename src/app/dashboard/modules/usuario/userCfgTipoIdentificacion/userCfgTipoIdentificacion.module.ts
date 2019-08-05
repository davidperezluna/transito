import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserCfgTipoIdentificacionComponent } from './userCfgTipoIdentificacion.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { UserCfgTipoIdentificacionService } from '../../../../services/userCfgTipoIdentificacion.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { SelectModule } from 'angular2-select';


@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [UserCfgTipoIdentificacionComponent,NewComponent,EditComponent],
    exports: [UserCfgTipoIdentificacionComponent, NewComponent,EditComponent],
    providers: [UserCfgTipoIdentificacionService]
})

export class UserCfgTipoIdentificacionModule { }

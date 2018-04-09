import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TipoIdentificacionComponent } from './tipoIdentificacion.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { TipoIdentificacionService } from '../../services/tipoIdentificacion.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import {SelectModule} from 'angular2-select';


@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [TipoIdentificacionComponent,NewComponent,EditComponent],
    exports: [TipoIdentificacionComponent, NewComponent,EditComponent],
    providers:[TipoIdentificacionService]
})

export class TipoIdentificacionModule { }

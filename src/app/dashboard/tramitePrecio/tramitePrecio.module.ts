import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TramitePrecioComponent } from './tramitePrecio.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import {TramitePrecioService} from '../../services/tramitePrecio.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import {SelectModule} from 'angular2-select';


@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [TramitePrecioComponent,NewComponent,EditComponent],
    exports: [TramitePrecioComponent, NewComponent,EditComponent],
    providers:[TramitePrecioService]
})

export class TramitePrecioModule { }

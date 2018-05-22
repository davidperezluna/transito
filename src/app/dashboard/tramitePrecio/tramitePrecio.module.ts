import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TramitePrecioComponent } from './tramitePrecio.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import {TramitePrecioService} from '../../services/tramitePrecio.service';
import {TipoVehiculoService} from '../../services/tipoVehiculo.service';
import {ParametroService} from '../../services/parametro.service';

import { NewComponent } from './new/new.component';
import { NewSmlmvComponent } from './smlmv/smlmv.component';
import { EditComponent } from './edit/edit.component';
import {SelectModule} from 'angular2-select';


@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [TramitePrecioComponent,NewComponent,EditComponent,NewSmlmvComponent],
    exports: [TramitePrecioComponent, NewComponent,EditComponent,NewSmlmvComponent],
    providers:[TramitePrecioService,TipoVehiculoService,ParametroService]
})

export class TramitePrecioModule { }

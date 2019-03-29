import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuscarAutomotorComponent } from './buscarAutomotor.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { VehiculoService } from '../../services/vehiculo.service';
import { SelectModule } from 'angular2-select';
import { ShowComponent } from './show/show.component';


@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [BuscarAutomotorComponent,ShowComponent],
    exports: [BuscarAutomotorComponent,ShowComponent],
    providers:[VehiculoService]
})

export class BuscarAutomotorModule { }

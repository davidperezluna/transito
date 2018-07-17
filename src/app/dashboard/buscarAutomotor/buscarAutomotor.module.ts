import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { buscarAutomotorComponent } from './buscarAutomotor.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { VehiculoService } from '../../services/vehiculo.service';
import { SelectModule } from 'angular2-select';
import { ShowAutomotorComponent } from './show/showAutomotor.component';


@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [buscarAutomotorComponent,ShowAutomotorComponent],
    exports: [buscarAutomotorComponent,ShowAutomotorComponent],
    providers:[VehiculoService]
})

export class buscarAutomotorModule { }

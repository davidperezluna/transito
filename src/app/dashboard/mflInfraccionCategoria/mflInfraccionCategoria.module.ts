import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MflInfraccionCategoriaComponent } from './mflInfraccionCategoria.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { MflInfraccionCategoriaService } from '../../services/mflInfraccionCategoria.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { SelectModule } from 'angular2-select';

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [MflInfraccionCategoriaComponent,NewComponent,EditComponent],
    exports: [MflInfraccionCategoriaComponent, NewComponent,EditComponent],
    providers:[MflInfraccionCategoriaService]
})

export class MflInfraccionCategoriaModule { }

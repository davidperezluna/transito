import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FroInfrCfgCategoriaComponent } from './froInfrCfgCategoria.component';
import { FroInfrCfgCategoriaService } from '../../services/froInfrCfgCategoria.service';
import { Ng2BootstrapModule } from 'ng2-bootstrap';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { SelectModule } from 'angular2-select';

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [FroInfrCfgCategoriaComponent,NewComponent,EditComponent],
    exports: [FroInfrCfgCategoriaComponent, NewComponent,EditComponent],
    providers:[FroInfrCfgCategoriaService]
})

export class FroInfrCfgCategoriaModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VhloCfgClaseMaquinariaComponent } from './vhloCfgClaseMaquinaria.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { VhloCfgClaseMaquinariaService } from '../../../../services/vhloCfgClaseMaquinaria.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { SelectModule } from 'angular2-select';

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [VhloCfgClaseMaquinariaComponent,NewComponent,EditComponent],
    exports: [VhloCfgClaseMaquinariaComponent, NewComponent,EditComponent],
    providers: [VhloCfgClaseMaquinariaService]
})

export class VhloCfgClaseMaquinariaModule { }

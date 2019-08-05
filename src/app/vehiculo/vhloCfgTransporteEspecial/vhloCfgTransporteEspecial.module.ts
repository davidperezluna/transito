import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VhloCfgTransporteEspecialComponent } from './vhloCfgTransporteEspecial.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { VhloCfgTransporteEspecialService } from '../../services/vhloCfgTransporteEspecial.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { SelectModule } from 'angular2-select';

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [VhloCfgTransporteEspecialComponent,NewComponent,EditComponent],
    exports: [VhloCfgTransporteEspecialComponent, NewComponent,EditComponent],
    providers:[VhloCfgTransporteEspecialService]     
})

export class VhloCfgTransporteEspecialModule { }

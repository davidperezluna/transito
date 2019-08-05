import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CvCdoCfgDescuentoComponent } from './cvCdoCfgDescuento.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { CvCdoCfgDescuentoService } from '../../../../services/cvCdoCfgDescuento.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { SelectModule } from 'angular2-select';

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [CvCdoCfgDescuentoComponent,NewComponent,EditComponent],
    exports: [CvCdoCfgDescuentoComponent, NewComponent,EditComponent],
    providers:[CvCdoCfgDescuentoService]
})

export class CvCdoCfgDescuentoModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CvCfgTipoMedidaCautelarComponent } from './cvCfgTipoMedidaCautelar.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { CvCfgTipoMedidaCautelarService } from '../../services/cvCfgTipoMedidaCautelar.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { SelectModule } from 'angular2-select';

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [CvCfgTipoMedidaCautelarComponent,NewComponent,EditComponent],
    exports: [CvCfgTipoMedidaCautelarComponent, NewComponent,EditComponent],
    providers:[CvCfgTipoMedidaCautelarService]
})

export class CvCfgTipoMedidaCautelarModule { }

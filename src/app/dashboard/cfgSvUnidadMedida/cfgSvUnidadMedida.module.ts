import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CfgSvUnidadMedidaComponent } from './cfgSvUnidadMedida.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { CfgSvUnidadMedidaService } from '../../services/cfgSvUnidadMedida.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { SelectModule } from 'angular2-select';

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [CfgSvUnidadMedidaComponent,NewComponent,EditComponent],
    exports: [CfgSvUnidadMedidaComponent, NewComponent,EditComponent],
    providers:[CfgSvUnidadMedidaService]
})

export class CfgSvUnidadMedidaModule { }

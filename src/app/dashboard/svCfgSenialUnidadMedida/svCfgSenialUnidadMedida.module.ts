import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SvCfgSenialUnidadMedidaComponent } from './svCfgSenialUnidadMedida.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { SvCfgSenialUnidadMedidaService } from '../../services/svCfgSenialUnidadMedida.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { SelectModule } from 'angular2-select';

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [SvCfgSenialUnidadMedidaComponent,NewComponent,EditComponent],
    exports: [SvCfgSenialUnidadMedidaComponent, NewComponent,EditComponent],
    providers:[SvCfgSenialUnidadMedidaService]
})

export class SvCfgSenialUnidadMedidaModule { }

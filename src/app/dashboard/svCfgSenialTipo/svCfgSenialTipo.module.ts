import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SvCfgSenialTipoComponent } from './svCfgSenialTipo.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { SvCfgSenialTipoService } from '../../services/svCfgSenialTipo.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { SelectModule } from 'angular2-select';

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [SvCfgSenialTipoComponent,NewComponent,EditComponent],
    exports: [SvCfgSenialTipoComponent, NewComponent,EditComponent],
    providers:[SvCfgSenialTipoService]     
})

export class SvCfgSenialTipoModule { }

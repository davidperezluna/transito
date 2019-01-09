import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SvCfgSenialLineaComponent } from './svCfgSenialLinea.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { SvCfgSenialLineaService } from '../../services/svCfgSenialLinea.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { SelectModule } from 'angular2-select';

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [SvCfgSenialLineaComponent,NewComponent,EditComponent],
    exports: [SvCfgSenialLineaComponent, NewComponent,EditComponent],
    providers:[SvCfgSenialLineaService]
})

export class SvCfgSenialLineaModule { }

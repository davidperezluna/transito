import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SvCfgAseguradoraComponent } from './svCfgAseguradora.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { SvCfgAseguradoraService } from '../../../../services/svCfgAseguradora.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { SelectModule } from 'angular2-select';

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(), SelectModule],
    declarations: [SvCfgAseguradoraComponent, NewComponent, EditComponent],
    exports: [SvCfgAseguradoraComponent, NewComponent, EditComponent],
    providers: [SvCfgAseguradoraService]
})

export class SvCfgAseguradoraModule { }

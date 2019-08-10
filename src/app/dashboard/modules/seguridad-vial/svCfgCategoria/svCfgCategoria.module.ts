import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SvCfgCategoriaService } from '../../../../services/svCfgCategoria.service';
import { SvRevisionService } from '../../../../services/svRevision.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';

import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { SelectModule } from 'angular2-select';


@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [NewComponent,EditComponent],
    exports: [NewComponent,EditComponent],
    providers:[SvRevisionService,SvCfgCategoriaService]
})

export class SvCfgCategoriaModule { }

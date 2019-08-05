import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VhloCfgEmpresaGpsComponent } from './vhloCfgEmpresaGps.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { VhloCfgEmpresaGpsService } from '../../../../services/vhloCfgEmpresaGps.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { SelectModule } from 'angular2-select';

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [VhloCfgEmpresaGpsComponent,NewComponent,EditComponent],
    exports: [VhloCfgEmpresaGpsComponent, NewComponent,EditComponent],
    providers: [VhloCfgEmpresaGpsService]
})

export class VhloCfgEmpresaGpsModule { }

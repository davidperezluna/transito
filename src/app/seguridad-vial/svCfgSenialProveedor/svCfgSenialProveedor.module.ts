import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SvCfgSenialProveedorComponent } from './svCfgSenialProveedor.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { SvCfgSenialProveedorService } from '../../services/svCfgSenialProveedor.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { SelectModule } from 'angular2-select';

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [SvCfgSenialProveedorComponent,NewComponent,EditComponent],
    exports: [SvCfgSenialProveedorComponent, NewComponent,EditComponent],
    providers:[SvCfgSenialProveedorService]
})

export class SvCfgSenialProveedorModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CfgModuloComponent } from './cfgModulo.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { CfgModuloService } from '../../../../services/cfgModulo.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot()],
    declarations: [CfgModuloComponent,NewComponent,EditComponent],
    exports: [CfgModuloComponent, NewComponent,EditComponent],
    providers:[CfgModuloService]
})

export class CfgModuloModule { }

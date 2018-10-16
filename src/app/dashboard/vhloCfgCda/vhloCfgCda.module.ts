import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VhloCfgCdaComponent } from './vhloCfgCda.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { VhloCfgCdaService } from '../../services/vhloCfgCda.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { SelectModule } from 'angular2-select';

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [VhloCfgCdaComponent,NewComponent,EditComponent],
    exports: [VhloCfgCdaComponent, NewComponent,EditComponent],
    providers:[VhloCfgCdaService]
})

export class VhloCfgCdaModule { }

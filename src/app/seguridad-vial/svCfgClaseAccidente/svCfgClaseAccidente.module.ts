import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SvCfgClaseAccidenteComponent } from './svCfgClaseAccidente.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { SvCfgClaseAccidenteService } from '../../services/svCfgClaseAccidente.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { SelectModule } from 'angular2-select';

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [SvCfgClaseAccidenteComponent,NewComponent,EditComponent],
    exports: [SvCfgClaseAccidenteComponent, NewComponent,EditComponent],
    providers:[SvCfgClaseAccidenteService]
})

export class SvCfgClaseAccidenteModule { }

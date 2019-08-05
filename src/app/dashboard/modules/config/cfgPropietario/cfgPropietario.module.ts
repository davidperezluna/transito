import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectModule } from 'angular2-select';
import { Ng2BootstrapModule } from 'ng2-bootstrap';

import { CfgPropietarioService } from '../../../../services/cfgPropietario.service';

import { CfgPropietarioComponent } from './cfgPropietario.component';
import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';


@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [CfgPropietarioComponent,NewComponent,EditComponent],
    exports: [CfgPropietarioComponent, NewComponent,EditComponent],
    providers:[CfgPropietarioService]
})

export class CfgPropietarioModule { }

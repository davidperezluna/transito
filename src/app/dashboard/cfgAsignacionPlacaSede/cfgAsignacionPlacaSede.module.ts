import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CfgAsignacionPlacaSedeComponent } from './cfgAsignacionPlacaSede.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { CfgAsignacionPlacaSedeService } from '../../services/cfgAsignacionPlacaSede.service';

import { NewCfgAsignacionPlacaSedeComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { SelectModule } from 'angular2-select';

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(), SelectModule],
    declarations: [CfgAsignacionPlacaSedeComponent, NewCfgAsignacionPlacaSedeComponent, EditComponent],
    exports: [CfgAsignacionPlacaSedeComponent, NewCfgAsignacionPlacaSedeComponent, EditComponent],
    providers: [CfgAsignacionPlacaSedeService]
})

export class CfgAsignacionPlacaSedeModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SvCfgGravedadVictimaComponent } from './svCfgGravedadVictima.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { SvCfgGravedadVictimaService } from '../../services/svCfgGravedadVictima.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { SelectModule } from 'angular2-select';

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(), SelectModule],
    declarations: [SvCfgGravedadVictimaComponent, NewComponent, EditComponent],
    exports: [SvCfgGravedadVictimaComponent, NewComponent, EditComponent],
    providers: [SvCfgGravedadVictimaService]
})

export class SvCfgGravedadVictimaModule { }

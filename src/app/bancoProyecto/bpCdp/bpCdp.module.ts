import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BpCdpComponent } from './bpCdp.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { BpCdpService } from '../../services/bpCdp.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { RequestComponent } from './request/request.component';
import { SelectModule } from 'angular2-select';

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [BpCdpComponent, NewComponent, EditComponent, RequestComponent],
    exports: [BpCdpComponent, NewComponent, EditComponent, RequestComponent],
    providers:[BpCdpService]
})

export class BpCdpModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SvCfgClaseChoqueComponent } from './svCfgClaseChoque.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { SvCfgClaseChoqueService } from '../../services/svCfgClaseChoque.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { SelectModule } from 'angular2-select';

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(), SelectModule],
    declarations: [SvCfgClaseChoqueComponent, NewComponent, EditComponent],
    exports: [SvCfgClaseChoqueComponent, NewComponent, EditComponent],
    providers: [SvCfgClaseChoqueService]
})

export class SvCfgClaseChoqueModule { }

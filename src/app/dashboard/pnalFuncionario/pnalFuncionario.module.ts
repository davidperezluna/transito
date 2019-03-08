import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PnalFuncionarioComponent } from './pnalFuncionario.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { PnalFuncionarioService } from '../../services/pnalFuncionario.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { SelectModule } from 'angular2-select';

import { TooltipModule } from "ngx-tooltip";

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(), SelectModule, TooltipModule],
    declarations: [PnalFuncionarioComponent,NewComponent,EditComponent],
    exports: [PnalFuncionarioComponent, NewComponent,EditComponent],
    providers:[PnalFuncionarioService]     
})

export class PnalFuncionarioModule { }

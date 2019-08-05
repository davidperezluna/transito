import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PnalTalonarioComponent } from './pnalTalonario.component';
import { PnalTalonarioService } from '../../../../services/pnalTalonario.service';
import { Ng2BootstrapModule } from 'ng2-bootstrap';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { SelectModule } from 'angular2-select';


@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [PnalTalonarioComponent,NewComponent,EditComponent],
    exports: [PnalTalonarioComponent, NewComponent,EditComponent],
    providers:[PnalTalonarioService]
})

export class PnalTalonarioModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FroCfgTipoRecaudoComponent } from './froCfgTipoRecaudo.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { FroCfgTipoRecaudoService } from '../../services/froCfgTipoRecaudo.service';

/* import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component'; */
import { SelectModule } from 'angular2-select';

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(), SelectModule],
    declarations: [FroCfgTipoRecaudoComponent],
    exports: [FroCfgTipoRecaudoComponent],
    providers: [FroCfgTipoRecaudoService]
})
 
export class FroCfgTipoRecaudoModule { }

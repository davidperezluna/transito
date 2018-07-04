import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RnaPreasignacionPlacaComponent } from './rnaPreasignacionPlaca.component';
// import { RnaPreasignacionPlacaService } from '../../services/rnaPreasignacionPlaca.service';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import {ColorService} from '../../services/color.service';

// import { NewComponent } from './new/new.component';
// import { EditComponent } from './edit/edit.component';
import {SelectModule} from 'angular2-select';


@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [RnaPreasignacionPlacaComponent],
    exports: [RnaPreasignacionPlacaComponent],
    providers:[ColorService]
})

export class RnaPreasignacionPlacaModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { rnaRegistroInsumosComponent } from './rnaRegistroInsumos.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import {ColorService} from '../../services/color.service';



@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot()],
    declarations: [rnaRegistroInsumosComponent],
    exports: [rnaRegistroInsumosComponent],
    providers:[ColorService]
})

export class rnaRegistroInsumosModule { }

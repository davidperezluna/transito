import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImoLoteComponent } from './imoLote.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import {SelectModule} from 'angular2-select';
import { NewComponent } from './new/new.component';
import {ImoLoteService} from '../../services/imoLote.service';
import { ImoCfgTipoService } from '../../services/imoCfgTipo.service';
import { EditComponent } from './edit/edit.component';

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(), SelectModule],
    declarations: [ImoLoteComponent,NewComponent,EditComponent],
    exports: [ImoLoteComponent,NewComponent,EditComponent],
    providers: [ImoLoteService,ImoCfgTipoService]
})

export class ImoLoteModule { }
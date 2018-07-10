import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MsvCategoriaComponent } from './msvCategoria.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { MsvRevisionService } from '../../services/msvRevision.service';
import { MsvCategoriaService } from '../../services/msvCategoria.service';
import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { SelectModule } from 'angular2-select';


@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [MsvCategoriaComponent,NewComponent,EditComponent],
    exports: [MsvCategoriaComponent, NewComponent,EditComponent],
    providers:[MsvRevisionService,MsvCategoriaService]
})

export class MsvCategoriaModule { }

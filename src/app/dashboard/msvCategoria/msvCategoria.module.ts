import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { msvCategoriaComponent } from './msvCategoria.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { msvRevisionService } from '../../services/msvRevision.service';
import { msvCategoriaService } from '../../services/msvCategoria.service';
import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { SelectModule } from 'angular2-select';


@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [msvCategoriaComponent,NewComponent,EditComponent],
    exports: [msvCategoriaComponent, NewComponent,EditComponent],
    providers:[msvCategoriaComponent,msvRevisionService,msvCategoriaService]
})

export class msvCategoriaModule { }

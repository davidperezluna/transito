import { NgModule } from '@angular/core';
import { SortableModule } from 'ngx-bootstrap/sortable';
import { FormsModule } from '@angular/forms';
import { DragableComponent } from './dragable.component';

@NgModule({
    imports: [SortableModule.forRoot(), FormsModule],
    declarations: [DragableComponent],
    exports: [DragableComponent]
})

export class DragableModule { }

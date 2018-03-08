import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoComponent } from './todo.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot()],
    declarations: [TodoComponent],
    exports: [TodoComponent]
})

export class TodoModule { }

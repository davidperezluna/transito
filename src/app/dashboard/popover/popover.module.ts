import { NgModule } from '@angular/core';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { PopoverComponent } from './popover.component';

@NgModule({
    imports: [PopoverModule.forRoot()],
    declarations: [PopoverComponent],
    exports: [PopoverComponent]
})

export class PopoverpageModule { }

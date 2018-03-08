import { NgModule } from '@angular/core';
import { AccordionModule } from 'ngx-bootstrap/accordion';

import { AccordionComponent } from './accordion.component';

@NgModule({
    imports: [AccordionModule.forRoot()],
    declarations: [AccordionComponent],
    exports: [AccordionComponent]
})

export class AccordionpageModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SocialComponent } from './social.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';



@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot()],
    declarations: [SocialComponent],
    exports: [SocialComponent]
})

export class SocialModule { }

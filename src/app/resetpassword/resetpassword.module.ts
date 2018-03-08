import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ResetpasswordComponent } from './resetpassword.component';

@NgModule({
    imports: [CommonModule, RouterModule],
    declarations: [ResetpasswordComponent],
    exports: [ResetpasswordComponent]
})

export class ResetpasswordModule { }

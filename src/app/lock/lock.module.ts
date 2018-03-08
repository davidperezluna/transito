import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { LockComponent } from './lock.component';

@NgModule({
    imports: [CommonModule, RouterModule],
    declarations: [LockComponent],
    exports: [LockComponent]
})

export class LockModule { }

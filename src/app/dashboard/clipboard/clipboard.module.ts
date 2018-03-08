import { NgModule } from '@angular/core';
import { ClipboardModule } from 'ngx-clipboard';
import { FormsModule } from '@angular/forms';
import { ClipboardComponent } from './clipboard.component';

@NgModule({
    imports: [ClipboardModule, FormsModule],
    declarations: [ClipboardComponent],
    exports: [ClipboardComponent]
})

export class ClipboardpageModule { }

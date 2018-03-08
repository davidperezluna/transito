import { NgModule } from '@angular/core';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { FormsModule } from '@angular/forms';
import { AutocompleteComponent } from './autocomplete.component';

@NgModule({
    imports: [TypeaheadModule.forRoot(), FormsModule],
    declarations: [AutocompleteComponent],
    exports: [AutocompleteComponent]
})

export class AutocompleteModule { }

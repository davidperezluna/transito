import { Component } from '@angular/core';



@Component({
    selector: 'app-dropezone-page',
    templateUrl: './dropezone.component.html'
})


export class DropezoneComponent {
  config = {
    // Change this to your upload POST address:
    url: 'https://httpbin.org/post',
    maxFilesize: 50,
    acceptedFiles: 'image/*'
  };
}

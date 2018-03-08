import { Component, OnInit } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-rightsidebar-cmp',
  templateUrl: 'rightsidebar.html'
})


export class RightsidebarComponent implements OnInit {

  showMenu = '';
  showSubMenu = '';
  addExpandClass(element: any) {
    if (element === this.showMenu) {
      this.showMenu = '0';
    } else {
      this.showMenu = element;
    }
  }
  addSubExpandClass(element: any) {
    if (element === this.showSubMenu) {
      this.showSubMenu = '0';
    } else {
      this.showSubMenu = element;
    }
  }

  ngOnInit() {
     /*cicular progress sidebar home page */
     $('.progress_profile').circleProgress({
         fill: {gradient: ['#2ec7cb', '#6c8bef']},
         lineCap: 'butt'
     });
     /*cicular progress sidebar home page  ends */
  }
}

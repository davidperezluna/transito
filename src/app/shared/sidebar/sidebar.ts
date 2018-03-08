import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-sidebar-cmp',
  templateUrl: 'sidebar.html'
})

export class SidebarComponent implements OnInit {
  showMenu = '';
  showSubMenu = '';
  addActive = '';
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
  addActiveMenu(element: any) {
    if (element === this.addActive) {
      this.addActive = '0';
    } else {
      this.addActive = element;
    }
  }

  ngOnInit() {
    /* Sparklines can also take their values from the first argument   passed to the sparkline() function */
    const myvalues2 = [
           10, 8, 5, 7, 4, 2, 8, 10, 8, 5, 6, 4, 1, 7, 4, 5, 8, 10, 8, 5, 6, 4, 4, 1, 7, 4, 5, 8, 10, 8, 5, 6, 4, 4
         ];
        $('.dynamicsparkline2').sparkline(
            myvalues2,
            { type: 'bar', width: '200px', height: '60', barColor: '#cccccc', barWidth: '3', barSpacing: 3}
      );
    /* Sparklines chart js  ends */
  }
}

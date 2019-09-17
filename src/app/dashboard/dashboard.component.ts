import { Component, AfterContentInit } from '@angular/core';
import swal from 'sweetalert2';

/**
*  This class represents the lazy loaded DashboardComponent.
*/

@Component({
  selector: 'app-dashboard-cmp',
  templateUrl: 'dashboard.component.html'
})

export class DashboardComponent implements AfterContentInit {
  ngAfterContentInit() {
    swal.close();
  }
}

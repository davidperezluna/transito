import { Component, OnInit } from '@angular/core';
import { UserCfgMenuService } from '../../services/userCfgMenu.service';
import { LoginService } from '../../services/login.service';
declare var $: any;

//Metadata
export interface RouteInfo {
  path: string;
  title: string;
  type: string;
  icontype: string;
  collapse?: string;
  children?: ChildrenItems[];
}

export interface ChildrenItems {
  path: string;
  title: string;
  ab: string;
  type?: string;
  valor?: number;
}



//Menu Items
export const ROUTES: RouteInfo[] = [

];

@Component({
  selector: 'app-sidebar-cmp',
  templateUrl: 'sidebar.html'
})

export class SidebarComponent implements OnInit {
  showMenu = '';
  showSubMenu = '';
  addActive = '';
  nombreUsuario: string;

  constructor(private _LoginService: LoginService) {
    let identity = this._LoginService.getIdentity();
    this.nombreUsuario = identity.primerNombre + " " + identity.primerApellido;
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
}

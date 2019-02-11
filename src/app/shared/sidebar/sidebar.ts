import { Component, OnInit } from '@angular/core';
import { UserCfgMenuService } from '../../services/userCfgMenu.service';
import { LoginService } from '../../services/login.service';
declare var $: any;
import swal from 'sweetalert2';

@Component({
  selector: 'app-sidebar-cmp',
  templateUrl: 'sidebar.html'
})

export class SidebarComponent implements OnInit {
  showMenu = '';
  showSubMenu = '';
  addActive = '';
  public errorMessage;
  public nombreUsuario: string;
  public identificacionUsuario: string;
  public idUsuario: number;

  public menus: any = null;

  constructor(
    private _LoginService: LoginService,
    private _UserCfgMenuService: UserCfgMenuService,
  ) {
    
    this._UserCfgMenuService.cartData.subscribe(
      (data: any) => {
        console.log('**********');
        this.ngOnInit();
      });
    
    let identity = this._LoginService.getIdentity();
    this.nombreUsuario = identity.primerNombre + " " + identity.primerApellido;
    this.identificacionUsuario = identity.identificacion;
    this.idUsuario = identity.sub;
  }

  ngOnInit() {
    swal({
      title: 'Cargando modulos!',
      text: 'Solo tardara unos segundos por favor espere.',
      onOpen: () => {
        swal.showLoading();
      }
    });

    /* Sparklines can also take their values from the first argument   passed to the sparkline() function */
    const myvalues2 = [
           10, 8, 5, 7, 4, 2, 8, 10, 8, 5, 6, 4, 1, 7, 4, 5, 8, 10, 8, 5, 6, 4, 4, 1, 7, 4, 5, 8, 10, 8, 5, 6, 4, 4
         ];
        $('.dynamicsparkline2').sparkline(
            myvalues2,
            { type: 'bar', width: '200px', height: '60', barColor: '#cccccc', barWidth: '3', barSpacing: 3}
      );
    /* Sparklines chart js  ends */

    let token = this._LoginService.getToken();

    this._UserCfgMenuService.generateByUsuario({ 'idUsuario': this.idUsuario }, token).subscribe(
      response => {
        this.menus = response.data;
        swal.close();
      },
      error => {
        this.errorMessage = <any>error;

        if (this.errorMessage != null) {
          console.log(this.errorMessage);
          alert("Error en la petición");
        }
      }
    );
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

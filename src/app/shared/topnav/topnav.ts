import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {LoginService} from '../../services/login.service';
import swal from 'sweetalert2';
declare var $: any;

@Component({
    selector: 'app-top-nav',
    templateUrl: 'topnav.html',
})

export class TopNavComponent {
  public user;
	public errorMessage;
  public identity;
  
  constructor(
		private _LoginService: LoginService,
		private _router: Router
  ){}

  isActive = false;
  eventCalled() {
    $('body').toggleClass('menuclose');
  }

  event2Called() {
    $('body').toggleClass('menuclose-right');
  }
  changeTheme(color: string): void {
    let link: any = $('<link>');
    link
      .appendTo('head')
      .attr({type : 'text/css', rel : 'stylesheet'})
      .attr('href', 'themes/app-' + color + '.css');
  }

  rtl(): void {
    let body: any = $('body');
    body.toggleClass('rtl');
  }

  sidebarToggler(): void  {
    let sidebar: any = $('#sidebar');
    let mainContainer: any = $('.main-container');
    sidebar.toggleClass('sidebar-left-zero');
    mainContainer.toggleClass('main-container-ml-zero');
  }

  onLogout(){
		swal({
			title: 'Cerrando sesión!',
			text: 'Tardará solo unos segundos por favor espere.',
			onOpen: () => {
				swal.showLoading()
			}
    });
    
    let identity = this._LoginService.getIdentity();
    let token = this._LoginService.getToken();

		this._LoginService.signout({ 'id':identity.sub }, token).subscribe(
			response =>{
				if (response.code == 200) {
          swal.close();

					this._router.navigate(["/"]);
				}else{
					swal({
						title: response.title,
						text: response.message,
						type: response.status,
						confirmButtonText: 'Aceptar'
					});
				}			
			},
			error => {
				this.errorMessage = <any>error;
				if(this.errorMessage != null){
					console.log(this.errorMessage);
					alert("Error en la peticion");
				} 
			}

		);
	}
}

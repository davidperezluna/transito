import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import { UserCfgMenu } from '../userCfgMenu.modelo';
import { UserCfgMenuService } from '../../../../../services/userCfgMenu.service';
import { LoginService } from '../../../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-new-usercfgmenu',
  templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
@Output() ready = new EventEmitter<any>();
public menu: UserCfgMenu;
public errorMessage;
public menus: any = null;

constructor(
  private _MenuService: UserCfgMenuService,
  private _LoginService: LoginService,
  ){}

  ngOnInit() {
    this.menu = new UserCfgMenu(null, null, null, null, null);

    this._MenuService.select().subscribe(
      response => {
        this.menus = response;
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
  
  onCancelar(){
    this.ready.emit(true);
  }
  
  onEnviar(){
    let token = this._LoginService.getToken();
    
		this._MenuService.register(this.menu,token).subscribe(
			response => {
        if(response.code == 200){
          this.ready.emit(true);

          //this._MenuService.cartData.emit(this.menus);
          
          swal({
            title: 'Perfecto!',
            text: response.message,
            type: 'success',
            confirmButtonText: 'Aceptar'
          })
        }else{
          swal({
            title: 'Error!',
            text: response.message,
            type: 'error',
            confirmButtonText: 'Aceptar'
          })
        }
			error => {
					this.errorMessage = <any>error;
					if(this.errorMessage != null){
						console.log(this.errorMessage);
						alert("Error en la petición");
					}
				}

		}); 
  }

}
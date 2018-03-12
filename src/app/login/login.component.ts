import { Component,OnInit } from '@angular/core';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import {LoginService} from '../services/login.service';
/**
*  This class represents the lazy loaded LoginComponent.
*/

@Component({
  selector: 'app-login-cmp',
  templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit { 
  public user;
	public errorMessage;
	public login = false;
	public identity;
    public token;
    
    constructor(
		private _loginService: LoginService,
		private _route: ActivatedRoute,
		private _router: Router
        ){}

    ngOnInit(){        
        this.user ={
			"correo":"",
			"password":"",
			"gethash":"true"
		};
    }
    onDesaparece(){
      this.login = false;
    }
    onSubmit(){
		console.log(this.user);
		this._loginService.signup(this.user).subscribe(
				response =>{

					let identity = response;
					this.identity = identity;
					if(this.identity.length <= 1){
						alert("Error en el servidor");
					}else{
						if(!this.identity.status){
							localStorage.setItem('identity', JSON.stringify(identity));

							this.user.gethash = "false";
							this._loginService.signup(this.user).subscribe(
									response => { 
										let token = response;
										this.token = token;

										if(this.token.length <= 0){
											alert("Error en el servidor");
										}else{
											if(!this.token.status){
												localStorage.setItem('token', token);
												//console.log(localStorage.getItem('token'));
                        // REDIRECCION
                        this._router.navigate(["dashboard/home"]);
											}
										}
									},
									error => {
									this.errorMessage = <any>error;

									if(this.errorMessage != null){
										console.log(this.errorMessage);
                    alert("Error en la petición");
									}
								}

							);

						}else{
              this.login = true;
              this.user.password ='';
              }
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

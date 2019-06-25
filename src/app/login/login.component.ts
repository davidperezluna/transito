import { Component,OnInit } from '@angular/core';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import {LoginService} from '../services/login.service';
import swal from 'sweetalert2';
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
		private _LoginService: LoginService,
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
		swal({
			title: 'Comprobando Datos!',
			text: 'Tardará solo unos segundos por favor espere.',
			onOpen: () => {
				swal.showLoading()
			}
		});

		this._LoginService.signup(this.user).subscribe(
			response =>{
				if (response.code == 200) {
					let identity = response.data;
					this.identity = identity;
	
					if(this.identity.length <= 1){
						alert("Error en el servidor");
					}else{
						if(response.code == 200){
							localStorage.setItem('identity', JSON.stringify(identity));
	
							this.user.gethash = "false";
							this._LoginService.signup(this.user).subscribe(
								response => { 
									let token = response.data;
									this.token = token;
									swal.close();
	
									if(this.token.length <= 0){
										alert("Error en el servidor");
									}else{
										if(response.code == 200){
											swal.close();
	
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
							
							swal({
								title: response.title,
								text: response.message,
								type: response.status,
								confirmButtonText: 'Aceptar'
							});
						}
					}
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

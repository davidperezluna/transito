import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserLcCfgCategoria } from '../userLcCfgCategoria.modelo';
import { UserLcCfgCategoriaService } from '../../../../../services/userLcCfgCategoria.service';
import { LoginService } from '../../../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-new-userlccfgcategoria',
  templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
@Output() ready = new EventEmitter<any>();
public categoria: UserLcCfgCategoria;
public errorMessage;

constructor(
  private _CategoriaService: UserLcCfgCategoriaService,
  private _loginService: LoginService,
  ){}

  ngOnInit() {
    this.categoria = new UserLcCfgCategoria(null, null, null);
  }
  onCancelar(){
    this.ready.emit(true);
  }
  
  onEnviar(){
    let token = this._loginService.getToken();
    
		this._CategoriaService.register(this.categoria,token).subscribe(
			response => {
        if(response.code == 200){
          this.ready.emit(true);
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
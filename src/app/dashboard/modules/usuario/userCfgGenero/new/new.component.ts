import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import { UserCfgGenero } from '../userCfgGenero.modelo';
import { UserCfgGeneroService } from '../../../../../services/userCfgGenero.service';
import { LoginService } from '../../../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
@Output() ready = new EventEmitter<any>();
public genero: UserCfgGenero;
public errorMessage;
public respuesta;

constructor(
  private _GeneroService: UserCfgGeneroService,
  private _loginService: LoginService,
  ){}

  ngOnInit() {
    this.genero = new UserCfgGenero(null,null,null);
  }

  onCancelar(){
    this.ready.emit(true);
  }

  onEnviar(){
    let token = this._loginService.getToken();

		this._GeneroService.register(this.genero,token).subscribe(
			response => {
        this.respuesta = response;
        console.log(this.respuesta);
        if(this.respuesta.status == 'success'){
          this.ready.emit(true);
          swal({
            title: 'Perfecto!',
            text: 'Registro exitoso!',
            type: 'success',
            confirmButtonText: 'Aceptar'
          });
        }else{
          swal({
            title: 'Error!',
            text: 'El genero '+  +' ya se encuentra registrado',
            type: 'error',
            confirmButtonText: 'Aceptar'
          });
        }
			error => {
					this.errorMessage = <any>error;
					if(this.errorMessage != null){
						console.log(this.errorMessage);
						alert("Error en la petición");
					}
				}
      }
    ); 
  }

}
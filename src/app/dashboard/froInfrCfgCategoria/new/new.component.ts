import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FroInfraccionCategoria } from '../froInfrCfgCategoria.modelo';
import { FroInfrCfgCategoriaService } from '../../../services/froInfrCfgCategoria.service';
import { LoginService } from '../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
@Output() ready = new EventEmitter<any>();
public infraccionCategoria: FroInfraccionCategoria;
public errorMessage;
public respuesta;

constructor(
  private _InfraccionCategoriaService: FroInfrCfgCategoriaService,
  private _loginService: LoginService,
  ){}

  ngOnInit() {
    this.infraccionCategoria = new FroInfraccionCategoria(null, null, null, null);
  }
  onCancelar(){
    this.ready.emit(true);
  }
  
  onEnviar(){
    let token = this._loginService.getToken();
    
    console.log(this.infraccionCategoria);
		this._InfraccionCategoriaService.register(this.infraccionCategoria,token).subscribe(
			response => {
        this.respuesta = response;
        if(this.respuesta.status == 'success'){
          this.ready.emit(true);
          swal({
            title: 'Perfecto!',
            text: 'Registro exitoso!',
            type: 'success',
            confirmButtonText: 'Aceptar'
          })
        }else{
          swal({
            title: 'Error!',
            text: 'El infraccionCategoria '+  +' ya se encuentra registrado',
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
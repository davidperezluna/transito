import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import { Infraccion } from '../infraccion.modelo';
import { InfraccionService } from '../../../services/infraccion.service';
import { LoginService } from '../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
@Output() ready = new EventEmitter<any>();
public infraccion: Infraccion;
public errorMessage;
public respuesta;

constructor(
  private _InfraccionService: InfraccionService,
  private _loginService: LoginService,
  ){}

  ngOnInit() {
    this.infraccion = new Infraccion(null,null,null,null,null,null);
  }
  onCancelar(){
    this.ready.emit(true);
  }
  onEnviar(){
    let token = this._loginService.getToken();
    console.log(this.infraccion);
		this._InfraccionService.register(this.infraccion,token).subscribe(
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
          })
        }else{
          swal({
            title: 'Error!',
            text: 'El infraccion '+  +' ya se encuentra registrada',
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
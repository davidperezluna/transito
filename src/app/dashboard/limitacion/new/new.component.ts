import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import {Limitacion} from '../limitacion.modelo';
import {LimitacionService} from '../../../services/cfgLimitacion.service';
import {LoginService} from '../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
@Output() ready = new EventEmitter<any>();
public limitacion: Limitacion;
public errorMessage;
public respuesta;

constructor(
  private _LimitacionService: LimitacionService,
  private _loginService: LoginService,
  ){}

  ngOnInit() {
    this.limitacion = new Limitacion(null,null);


  }
  onCancelar(){
    this.ready.emit(true);
  }
  onEnviar(){
    let token = this._loginService.getToken();

		this._LimitacionService.register(this.limitacion,token).subscribe(
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
            text: 'El limitacion '+ this.limitacion.nombre +' ya se encuentra registrado',
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
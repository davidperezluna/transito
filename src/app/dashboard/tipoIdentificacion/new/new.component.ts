import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import { TipoIdentificacion } from '../tipoIdentificacion.modelo';
import { TipoIdentificacionService } from '../../../services/tipoIdentificacion.service';
import { LoginService } from '../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
@Output() ready = new EventEmitter<any>();
public tipoIdentificacion: TipoIdentificacion;
public errorMessage;
public respuesta;

constructor(
  private _TipoIdentificacionService: TipoIdentificacionService,
  private _loginService: LoginService,
  ){}

  ngOnInit() {
    this.tipoIdentificacion = new TipoIdentificacion(null,null,null);
  }
  onCancelar(){
    this.ready.emit(true);
  }
  onEnviar(){
    let token = this._loginService.getToken();
    
    console.log(this.tipoIdentificacion);
		this._TipoIdentificacionService.register(this.tipoIdentificacion,token).subscribe(
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
            text: 'El tipoIdentificacion '+  +' ya se encuentra registrado',
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
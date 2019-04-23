import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { SvIpatImpresoAsignacion } from '../svIpatImpresoAsignacion.modelo';
import { SvIpatImpresoAsignacionService } from '../../../services/svIpatImpresoAsignacion.service';
import { LoginService } from '../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
  @Output() ready = new EventEmitter<any>();
  public asignacion: SvIpatImpresoAsignacion;
  public errorMessage;

constructor(
  private _ImpresoAsignacionService: SvIpatImpresoAsignacionService,
  private _loginService: LoginService,
  ){}

  ngOnInit() {
    this.asignacion = new SvIpatImpresoAsignacion(null, null, null, null);
  }

  onCancelar(){
    this.ready.emit(true);
  }
  
  onEnviar(){
    let token = this._loginService.getToken();
    
		this._ImpresoAsignacionService.register(this.asignacion, token).subscribe(
			response => {
        if(response.status == 'success'){
          swal({
            title: 'Perfecto!',
            text: response.message,
            type: 'success',
            confirmButtonText: 'Aceptar'
          });
          
          this.ready.emit(true);
        }else{
          swal({
            title: 'Error!',
            text: response.message,
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

		}); 
  }

}
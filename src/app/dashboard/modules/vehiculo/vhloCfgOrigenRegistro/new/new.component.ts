import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { VhloCfgOrigenRegistro } from '../vhloCfgOrigenRegistro.modelo';
import { VhloCfgOrigenRegistroService } from '../../../../../services/vhloCfgOrigenRegistro.service';
import { LoginService } from '../../../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-new-vhlocfgorigenregistro',
  templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
  @Output() ready = new EventEmitter<any>();
  public origenRegistro: VhloCfgOrigenRegistro;
  public errorMessage;
  public respuesta;

constructor(
  private _OrigenRegistroService: VhloCfgOrigenRegistroService,
  private _loginService: LoginService,
  ){}

  ngOnInit() {
    this.origenRegistro = new VhloCfgOrigenRegistro(null, null);
  }

  onCancelar(){
    this.ready.emit(true);
  }
  
  onEnviar(){
    let token = this._loginService.getToken();
    
		this._OrigenRegistroService.register(this.origenRegistro,token).subscribe(
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
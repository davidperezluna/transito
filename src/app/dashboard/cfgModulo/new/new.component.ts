import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import { CfgModulo } from '../cfgModulo.modelo';
import { ModuloService } from '../../../services/modulo.service';
import { LoginService } from '../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
@Output() ready = new EventEmitter<any>();
public modulo: CfgModulo;
public errorMessage;

constructor(
  private _ModuloService: ModuloService,
  private _loginService: LoginService,
  ){}

  ngOnInit() {
    this.modulo = new CfgModulo(null, null, null, null, null, null);
  }

  onCancelar(){
    this.ready.emit(true);
  }

  onEnviar(){
    let token = this._loginService.getToken();

		this._ModuloService.register(this.modulo,token).subscribe(
			response => {

        if(response.status == 'success'){
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
            text: 'El modulo '+ this.modulo.nombre +' ya se encuentra registrado',
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
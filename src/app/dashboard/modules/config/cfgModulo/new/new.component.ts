import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import { CfgModulo } from '../cfgModulo.modelo';
import { CfgModuloService } from '../../../../../services/cfgModulo.service';
import { LoginService } from '../../../../../services/login.service';
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
  private _CfgModuloService: CfgModuloService,
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

		this._CfgModuloService.register(this.modulo,token).subscribe(
			response => {

        if(response.code == 200){
          this.ready.emit(true);
          swal({
            title: response.title,
            text: response.message,
            type: response.status,
            confirmButtonText: 'Aceptar'
          })
        }else{
          swal({
            title: response.title,
            text: response.message,
            type: response.status,
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
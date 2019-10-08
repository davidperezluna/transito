import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import { CfgClave } from '../cfgClave.modelo';
import { CfgClaveService } from '../../../../../services/cfgClave.service';
import { LoginService } from '../../../../../services/login.service';
import { PnalFuncionarioService } from '../../../../../services/pnalFuncionario.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
@Output() ready = new EventEmitter<any>();
public clave: CfgClave;
public errorMessage;
public respuesta;

constructor(
  private _CfgClaveService: CfgClaveService,
  private _loginService: LoginService,
  private _FuncionarioService: PnalFuncionarioService,
  ){}

  ngOnInit() {
    this.clave = new CfgClave(null,null,null,null,null,null,null,null);
    let identity = this._loginService.getIdentity();
    let token = this._loginService.getToken();

    this._FuncionarioService.searchLogin({ 'identificacion': identity.identificacion }, token).subscribe(
      response => {
        if (response.code == 200) {
          this.clave.idFuncionario = response.data.id; 
          
          swal.close();
        } else {
          this.clave.idFuncionario = null;

          swal({
              title: 'Error!',
              text: 'Usted no tiene permisos para realizar tramites',
              type: 'error',
              confirmButtonText: 'Aceptar'
          });
        }
        error => {
            this.errorMessage = <any>error;
            if (this.errorMessage != null) {
                console.log(this.errorMessage);
                alert('Error en la petición');
            }
        }
      }
    );
  }
  onCancelar(){
    this.ready.emit(true);
  }
  
  onEnviar(){
    let token = this._loginService.getToken();
    
		this._CfgClaveService.register(this.clave,token).subscribe(
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
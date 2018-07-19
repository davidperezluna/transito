import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import { CfgLicenciaConduccionCategoria } from '../cfgLicenciaConduccionCategoria.modelo';
import { CfgLicenciaConduccionCategoriaService } from '../../../services/cfgLicenciaConduccionCategoria.service';
import { LoginService } from '../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
@Output() ready = new EventEmitter<any>();
public categoria: CfgLicenciaConduccionCategoria;
public errorMessage;
public respuesta;

constructor(
  private _TipoContratoService: CfgLicenciaConduccionCategoriaService,
  private _loginService: LoginService,
  ){}

  ngOnInit() {
    this.categoria = new CfgLicenciaConduccionCategoria(null, null, null);
  }
  onCancelar(){
    this.ready.emit(true);
  }
  
  onEnviar(){
    let token = this._loginService.getToken();
    
		this._TipoContratoService.register(this.categoria,token).subscribe(
			response => {
        this.respuesta = response;

        if(this.respuesta.status == 'success'){
          this.ready.emit(true);
          swal({
            title: 'Perfecto!',
            text: response.msj,
            type: 'success',
            confirmButtonText: 'Aceptar'
          })
        }else{
          swal({
            title: 'Error!',
            text: 'El categoria '+  +' ya se encuentra registrado',
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
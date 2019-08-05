import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import { CfgDepartamento } from '../cfgDepartamento.modelo';
import { CfgDepartamentoService } from '../../../../../services/cfgDepartamento.service';
import { LoginService } from '../../../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
@Output() ready = new EventEmitter<any>();
public departamento: CfgDepartamento;
public errorMessage;

constructor(
  private _CfgDepartamentoService: CfgDepartamentoService,
  private _loginService: LoginService,
  ){}

  ngOnInit() {
    this.departamento = new CfgDepartamento(null,null,null);
  }
  
  onCancelar(){
    this.ready.emit(true);
  }

  onEnviar(){
    let token = this._loginService.getToken();

		this._CfgDepartamentoService.register(this.departamento,token).subscribe(
			response => {
        if(response.status == 'success'){
          this.ready.emit(true);
          swal({
            title: 'Perfecto!',
            text: 'Registro exitoso!',
            type: 'success',
            confirmButtonText: 'Aceptar'
          });
        }else{
          swal({
            title: 'Error!',
            text: 'El departamento '+ this.departamento.nombre +' ya se encuentra registrado',
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
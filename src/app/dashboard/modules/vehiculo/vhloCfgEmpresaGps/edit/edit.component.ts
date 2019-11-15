import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { VhloCfgEmpresaGpsService } from '../../../../../services/vhloCfgEmpresaGps.service';
import { LoginService } from '../../../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-edit-vhlocfgempresagps',
  templateUrl: './edit.component.html'
})
export class EditComponent implements OnInit{
@Output() ready = new EventEmitter<any>();
@Input() empresaGps:any = null;
public errorMessage;
public formReady = false;

constructor(
  private _EmpresaGpsService: VhloCfgEmpresaGpsService,
  private _loginService: LoginService,
  ){}

  ngOnInit(){ }

  onCancelar(){ this.ready.emit(true); }

  onEnviar(){
    let token = this._loginService.getToken();
		this._EmpresaGpsService.edit(this.empresaGps,token).subscribe(
			response => {
        if(response.code == 200){
          this.ready.emit(true);
          
          swal({
            title: response.title,
            text: response.message,
            type: response.status,
            confirmButtonText: 'Aceptar'
          });
        } else{
          swal({
            title: response.title,
            text: response.message,
            type: response.status,
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
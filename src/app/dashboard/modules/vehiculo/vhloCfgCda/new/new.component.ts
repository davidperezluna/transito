import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { VhloCfgCda } from '../vhloCfgCda.modelo';
import { VhloCfgCdaService } from '../../../../../services/vhloCfgCda.service';
import { LoginService } from '../../../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-new-vhlocfgcda',
  templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
@Output() ready = new EventEmitter<any>();
public cda: VhloCfgCda;
public errorMessage;
public respuesta;

constructor(
  private _CdaService: VhloCfgCdaService,
  private _loginService: LoginService,
  ){}

  ngOnInit() {
    this.cda = new VhloCfgCda(null, null, null);
  }
  onCancelar(){
    this.ready.emit(true);
  }
  
  onEnviar(){
    let token = this._loginService.getToken();
    
		this._CdaService.register(this.cda,token).subscribe(
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
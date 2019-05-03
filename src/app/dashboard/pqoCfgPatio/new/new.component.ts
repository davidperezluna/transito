import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import { PqoCfgPatio } from '../pqoCfgPatio.modelo';
import { PqoCfgPatioService } from '../../../services/pqoCfgPatio.service';
import { LoginService } from '../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
@Output() ready = new EventEmitter<any>();
public patio: PqoCfgPatio;
public errorMessage;
public respuesta;

constructor(
  private _PatioService: PqoCfgPatioService,
  private _loginService: LoginService,
  ){}

  ngOnInit() {
    this.patio = new PqoCfgPatio(null, null, null, null, null, null, null);
  }
  onCancelar(){
    this.ready.emit(true);
  }
  
  onEnviar(){
    let token = this._loginService.getToken();
    
		this._PatioService.register(this.patio,token).subscribe(
			response => {
        if(response.status == 'success'){
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
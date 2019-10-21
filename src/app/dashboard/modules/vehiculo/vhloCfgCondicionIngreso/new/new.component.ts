import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { VhloCfgCondicionIngreso } from '../vhloCfgCondicionIngreso.modelo';
import { VhloCfgCondicionIngresoService } from '../../../../../services/vhloCfgCondicionIngreso.service';
import { LoginService } from '../../../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-new-vhlocfgcondicioningreso',
  templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
@Output() ready = new EventEmitter<any>();
public condicionIngreso: VhloCfgCondicionIngreso;
public errorMessage;

constructor(
  private _CondicionIngresoService: VhloCfgCondicionIngresoService,
  private _loginService: LoginService,
  ){}

  ngOnInit() {
    this.condicionIngreso = new VhloCfgCondicionIngreso(null, null);
  }

  onCancelar(){
    this.ready.emit(true);
  }
  
  onEnviar(){
    let token = this._loginService.getToken();
    
		this._CondicionIngresoService.register(this.condicionIngreso,token).subscribe(
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
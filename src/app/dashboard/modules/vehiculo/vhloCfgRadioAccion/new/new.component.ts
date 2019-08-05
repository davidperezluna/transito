import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import { VhloCfgRadioAccion } from '../vhloCfgRadioAccion.modelo';
import { VhloCfgRadioAccionService } from '../../../../../services/vhloCfgRadioAccion.service';
import { LoginService } from '../../../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
@Output() ready = new EventEmitter<any>();
public radioAccion: VhloCfgRadioAccion;
public errorMessage;
public respuesta;

constructor(
  private _RadioAccionService: VhloCfgRadioAccionService,
  private _loginService: LoginService,
  ){}

  ngOnInit() {
    this.radioAccion = new VhloCfgRadioAccion(null, null);
  }
  
  onCancelar(){
    this.ready.emit(true);
  }
  
  onEnviar(){
    let token = this._loginService.getToken();
    
		this._RadioAccionService.register(this.radioAccion,token).subscribe(
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
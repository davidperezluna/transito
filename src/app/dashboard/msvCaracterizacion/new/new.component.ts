import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import { msvCaracterizacion } from '../msvCaracterizacion.modelo';
import { MsvCaracterizacionService } from '../../../services/msvCaracterizacion.service';
import { LoginService } from '../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
@Output() ready = new EventEmitter<any>();
public msvCaracterizacion: msvCaracterizacion;
public errorMessage;

constructor(
  private _MsvCaracterizacionService: MsvCaracterizacionService,
  private _loginService: LoginService,
  ){}

  ngOnInit() {
    this.msvCaracterizacion = new msvCaracterizacion(null, null, null, null, null, null, null, null, null, null, null);
  }
  onCancelar(){
    this.ready.emit(true);
  }
  
  onEnviar(){
    let token = this._loginService.getToken();
    
		this._MsvCaracterizacionService.register(this.msvCaracterizacion,token).subscribe(
			response => {
        if(response.status == 'success'){
          this.ready.emit(true);
          swal({
            title: 'Perfecto!',
            text: 'Se ha registrado con éxito',
            type: 'success',
            confirmButtonText: 'Aceptar'
          });
        }else {
          swal({
            title: 'Error!',
            text: 'La caracterización ya se encuentra registrada',
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
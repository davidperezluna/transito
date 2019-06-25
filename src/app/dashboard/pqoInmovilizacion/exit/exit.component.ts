import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import { PqoInmovilizacionService } from '../../../services/pqoInmovilizacion.service';
import { LoginService } from '../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-exit',
  templateUrl: './exit.component.html'
})
export class ExitComponent implements OnInit{
@Output() ready = new EventEmitter<any>();
@Input() inmovilizacion:any = null;
public errorMessage;
public formReady = false;

constructor(
  private _InmovilizacionService: PqoInmovilizacionService,
  private _loginService: LoginService,
  ){}

  ngOnInit(){ console.log(this.inmovilizacion);  }

  onCancelar(){ this.ready.emit(true); }

  onEnviar(){
    let token = this._loginService.getToken();

		this._InmovilizacionService.edit(this.inmovilizacion,token).subscribe(
			response => {
        if(response.status == 'success'){
          this.ready.emit(true);

          swal({
            title: 'Perfecto!',
            text: 'El registro se ha modificado con exito',
            type: 'success',
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
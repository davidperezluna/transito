import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TecnoMecanicaService } from '../../../services/vehiculoTecnoMecanica.service';
import { LoginService } from '../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html'
})
export class EditComponent implements OnInit{
@Output() ready = new EventEmitter<any>();
@Input() tecnoMecanica:any = null;
public errorMessage;
public respuesta;
public formReady = false;

constructor(
  private _EstadoService: TecnoMecanicaService,
  private _loginService: LoginService,
  ){}

  ngOnInit(){ console.log(this.tecnoMecanica);
   }

  onCancelar(){ this.ready.emit(true); }

  onEnviar(){
    let token = this._loginService.getToken();
		this._EstadoService.edit(this.tecnoMecanica,token).subscribe(
			response => {
        if(response.status == 'success'){
          this.ready.emit(true);
          swal({
            title: 'Perfecto!',
            text: response.message,
            type: 'success',
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
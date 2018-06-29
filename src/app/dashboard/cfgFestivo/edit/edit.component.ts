import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import { cfgFestivo } from '../cfgFestivo.modelo';
import { cfgFestivoService } from '../../../services/cfgFestivo.service';
import {LoginService} from '../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html'
})
export class EditComponent implements OnInit{
@Output() ready = new EventEmitter<any>();
@Input() cfgFestivo:any = null;
public errorMessage;
public respuesta;
public formReady = false;

constructor(
  private _festivoService: cfgFestivoService,
  private _loginService: LoginService,
  ){}

  ngOnInit(){ console.log(this.cfgFestivo);  }

  onCancelar(){ this.ready.emit(true); }

  onEnviar(){
    let token = this._loginService.getToken();
		this._festivoService.editFestivo(this.cfgFestivo,token).subscribe(
			response => {
        this.respuesta = response;
        console.log(this.respuesta);
        if(this.respuesta.status == 'success'){
          this.ready.emit(true);
          swal({
            title: 'Perfecto!',
            text: 'El registro se ha modificado con éxito.',
            type: 'success',
            confirmButtonText: 'Aceptar'
          })
        }
			error => {
					this.errorMessage = <any>error;

					if(this.errorMessage != null){
						console.log(this.errorMessage);
						alert("Error en la petición.");
					}
				}

		}); 
  }

}
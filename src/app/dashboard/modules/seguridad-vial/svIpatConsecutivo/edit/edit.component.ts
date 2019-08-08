import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import { PnalTalonarioService } from '../../../../../services/pnalTalonario.service';
import { LoginService } from '../../../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-edit-svipatconsecutivo',
  templateUrl: './edit.component.html'
})
export class EditComponent implements OnInit{
@Output() ready = new EventEmitter<any>();
@Input() talonario:any = null;
public errorMessage;
public respuesta; 
public formReady = false;

constructor(
  private _talonarioService: PnalTalonarioService,
  private _loginService: LoginService,
  ){}

  ngOnInit(){ console.log(this.talonario);  }

  onCancelar(){ this.ready.emit(true); }

  onEnviar(){
    let token = this._loginService.getToken();
		this._talonarioService.edit(this.talonario,token).subscribe(
			response => {
        this.respuesta = response;
        console.log(this.respuesta);
        if(this.respuesta.status == 'success'){
          this.ready.emit(true);
          swal({
            title: 'Perfecto!',
            text: 'El registro se ha modificado con exito',
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
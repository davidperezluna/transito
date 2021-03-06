import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import { UserCfgGeneroService } from '../../../../../services/userCfgGenero.service';
import { LoginService } from '../../../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-edit-usercfggenero',
  templateUrl: './edit.component.html'
})
export class EditComponent implements OnInit{
@Output() ready = new EventEmitter<any>();
@Input() genero:any = null;
public errorMessage;
public respuesta;
public formReady = false;

constructor(
  private _GeneroService: UserCfgGeneroService,
  private _loginService: LoginService,
  ){}

  ngOnInit(){ console.log(this.genero);  }

  onCancelar(){ this.ready.emit(true); }

  onEnviar(){
    let token = this._loginService.getToken();
    
		this._GeneroService.edit(this.genero,token).subscribe(
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
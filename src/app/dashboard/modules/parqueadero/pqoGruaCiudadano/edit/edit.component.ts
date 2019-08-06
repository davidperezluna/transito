import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';
import { PqoCfgGruaService } from '../../../../../services/pqoCfgGrua.service';
import {LoginService} from '../../../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-edit-pqogruaciudadano',
  templateUrl: './edit.component.html'
})
export class EditComponent implements OnInit{
@Output() ready = new EventEmitter<any>();
@Input() gruaCiudadano:any = null;
public errorMessage;
public respuesta;
public formReady = false;

constructor(
  private _GruaService: PqoCfgGruaService,
  private _loginService: LoginService,
  ){}

  ngOnInit(){  }

  onCancelar(){ 
    this.ready.emit(true); 
  }

  onEnviar(){
    let token = this._loginService.getToken();
		this._GruaService.edit(this.gruaCiudadano,token).subscribe(
			response => {
        this.respuesta = response;
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
import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import {Clase} from '../clase.modelo';
import {ClaseService} from '../../../services/clase.service';
import {LoginService} from '../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html'
})
export class EditComponent {
@Output() ready = new EventEmitter<any>();
@Input() clase:any = null;
public errorMessage;
public respuesta;
// public tipoIdentificacion: Array<any>

constructor(
  private _ClaseService: ClaseService,
  private _loginService: LoginService,
  ){
  //   this.tipoIdentificacion = [
  //     {value: 'CC', label: 'Cédula de ciudadanía'},
  //     {value: 'TE', label: 'Tarjeta de extranjería'},
  //     {value: 'CE', label: 'Cédula de extranjería'},
  //     {value: 'P', label: 'Pasaporte'},
  // ];
  }

  onCancelar(){
    this.ready.emit(true);
  }
  onEnviar(){
    let token = this._loginService.getToken();

		this._ClaseService.editClase(this.clase,token).subscribe(
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
import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import {Combustible} from '../combustible.modelo';
import {CombustibleService} from '../../../services/combustible.service';
import {LoginService} from '../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html'
})
export class EditComponent {
@Output() ready = new EventEmitter<any>();
@Input() combustible:any = null;
public errorMessage;
public respuesta;


constructor(
  private _CombustibleService: CombustibleService,
  private _loginService: LoginService,
  ){

  }

  onCancelar(){
    this.ready.emit(true);
  }
  onEnviar(){
    let token = this._loginService.getToken();

		this._CombustibleService.editCombustible(this.combustible,token).subscribe(
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
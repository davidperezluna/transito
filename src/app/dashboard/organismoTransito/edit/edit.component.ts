import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import {OrganismoTransito} from '../organismoTransito.modelo';
import {OrganismoTransitoService} from '../../../services/organismoTransito.service';
import {LoginService} from '../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html'
})
export class EditComponent {
@Output() ready = new EventEmitter<any>();
@Input() organismoTransito:any = null;
public errorMessage;
public respuesta;
// public tipoIdentificacion: Array<any>

constructor(
  private _OrganismoTransitoService: OrganismoTransitoService,
  private _loginService: LoginService,
  ){

  }

  onCancelar(){
    this.ready.emit(true);
  }
  onEnviar(){
    let token = this._loginService.getToken();

		this._OrganismoTransitoService.editOrganismoTransito(this.organismoTransito,token).subscribe(
			response => {
        this.respuesta = response;
        console.log(this.respuesta);
        if(this.respuesta.status == 'success'){
          this.ready.emit(true);
          swal({
            title: 'Pefecto!',
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
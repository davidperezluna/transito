import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import {OrganismoTransito} from '../organismoTransito.modelo';
import {OrganismoTransitoService} from '../../../services/organismoTransito.service';
import {LoginService} from '../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
@Output() ready = new EventEmitter<any>();
public organismoTransito: OrganismoTransito;
public errorMessage;
public respuesta;

constructor(
  private _OrganismoTransitoService: OrganismoTransitoService,
  private _loginService: LoginService,
  ){}

  ngOnInit() {
    this.organismoTransito = new OrganismoTransito(null,null);
  }
  onCancelar(){
    this.ready.emit(true);
  }
  onEnviar(){
    let token = this._loginService.getToken();

		this._OrganismoTransitoService.register(this.organismoTransito,token).subscribe(
			response => {
        this.respuesta = response;
        console.log(this.respuesta);
        if(this.respuesta.status == 'success'){
          this.ready.emit(true);
          swal({
            title: 'Echo!',
            text: 'El registro se ha registrado con exito',
            type: 'success',
            confirmButtonText: 'Aceptar'
          })
        }else{
          swal({
            title: 'Error!',
            text: 'El organismoTransito '+ this.organismoTransito.nombre +' ya se encuentra registrado',
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
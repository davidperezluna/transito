import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import {Banco} from '../banco.modelo';
import {BancoService} from '../../../services/banco.service';
import {LoginService} from '../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html'
})
export class EditComponent {
@Output() ready = new EventEmitter<any>();
@Input() banco:any = null;
public errorMessage;
public respuesta;
// public tipoIdentificacion: Array<any>

constructor(
  private _BancoService: BancoService,
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

		this._BancoService.editBanco(this.banco,token).subscribe(
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
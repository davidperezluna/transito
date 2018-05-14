import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import {Modulo} from '../modulo.modelo';
import {ModuloService} from '../../../services/modulo.service';
import {LoginService} from '../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
@Output() ready = new EventEmitter<any>();
public modulo: Modulo;
public errorMessage;
public respuesta;

constructor(
  private _ModuloService: ModuloService,
  private _loginService: LoginService,
  ){}

  ngOnInit() {
    this.modulo = new Modulo(null, null, null, null, null);
  }
  onCancelar(){
    this.ready.emit(true);
  }
  onEnviar(){
    let token = this._loginService.getToken();

		this._ModuloService.register(this.modulo,token).subscribe(
			response => {
        this.respuesta = response;
        console.log(this.respuesta);
        if(this.respuesta.status == 'success'){
          this.ready.emit(true);
          swal({
            title: 'Pefecto!',
            text: 'El registro se ha registrado con exito',
            type: 'success',
            confirmButtonText: 'Aceptar'
          })
        }else{
          swal({
            title: 'Error!',
            text: 'El modulo '+ this.modulo.nombre +' ya se encuentra registrado',
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
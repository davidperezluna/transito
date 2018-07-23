import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import {Limitacion} from '../limitacion.modelo';
import {LimitacionService} from '../../../services/cfgLimitacion.service';
import {LoginService} from '../../../services/login.service';
import swal from 'sweetalert2';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html'
})
export class EditComponent {
@Output() ready = new EventEmitter<any>();
@Input() limitacion:any = null;
public errorMessage;
public respuesta;

constructor(
  private _LimitacionService: LimitacionService,
  private _loginService: LoginService,
  ){
  }

  ngOnInit() {



  }


  onCancelar(){
    this.ready.emit(true);
  }
  onEnviar(){
    let token = this._loginService.getToken();
		this._LimitacionService.editLimitacion(this.limitacion,token).subscribe(
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
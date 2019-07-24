import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CvCfgModuloService } from '../../../services/cvCfgModulo.service';
import { LoginService } from '../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html'
})
export class EditComponent implements OnInit{
@Output() ready = new EventEmitter<any>();
@Input() modulo:any = null;
public errorMessage;
public respuesta;
public formReady = false;

constructor(
  private _ModuloService: CvCfgModuloService,
  private _LoginService: LoginService,
  ){}

  ngOnInit(){ console.log(this.modulo);  }

  onCancelar(){ this.ready.emit(true); }

  onEnviar(){
    let token = this._LoginService.getToken();

		this._ModuloService.edit(this.modulo,token).subscribe(
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
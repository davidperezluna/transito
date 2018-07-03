import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import { msvEvaluacion } from '../msvEvaluacion.modelo';
import { msvEvaluacionService } from '../../../services/msvEvaluacion.service';
import { LoginService } from '../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
@Output() ready = new EventEmitter<any>();
public msvEvaluacion: msvEvaluacion;
public errorMessage;
public respuesta;

constructor(
  private _msvEvaluacionService: msvEvaluacionService,
  private _loginService: LoginService,
  ){}

  ngOnInit() {
    this.msvEvaluacion = new msvEvaluacion(null, null, null, null, null, null, null, null, null, null, null);
  }
  onCancelar(){
    this.ready.emit(true);
  }
  
  onEnviar(){
    let token = this._loginService.getToken();
    
    console.log(this.msvEvaluacion);
		this._msvEvaluacionService.register(this.msvEvaluacion,token).subscribe(
			response => {
        this.respuesta = response;
        console.log(this.respuesta);
        if(this.respuesta.status == 'success'){
          this.ready.emit(true);
          swal({
            title: 'Perfecto!',
            text: 'Se ha registrado con éxito',
            type: 'success',
            confirmButtonText: 'Aceptar'
          })
        }else{
          swal({
            title: 'Error!',
            text: 'La evaluación ya se encuentra registrada',
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
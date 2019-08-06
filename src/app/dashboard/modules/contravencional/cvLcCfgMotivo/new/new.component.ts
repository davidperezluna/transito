import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CvLcCfgMotivo } from '../cvLcCfgMotivo.modelo';
import { CvLcCfgMotivoService } from '../../../../../services/cvLcCfgMotivo.service';
import { LoginService } from '../../../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-new-cvlccfgmotivo',
  templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
@Output() ready = new EventEmitter<any>();
public motivo: CvLcCfgMotivo;
public errorMessage;
public respuesta;

constructor(
  private _CvLcCfgMotivoService: CvLcCfgMotivoService,
  private _loginService: LoginService,
  ){}

  ngOnInit() {
    this.motivo = new CvLcCfgMotivo(null, null);
  }
  
  onCancelar(){
    this.ready.emit(true);
  }
  
  onEnviar(){
    let token = this._loginService.getToken();
    
		this._CvLcCfgMotivoService.register(this.motivo,token).subscribe(
			response => {
        if(response.status == 'success'){
          this.ready.emit(true);
          swal({
            title: 'Perfecto!',
            text: response.message,
            type: 'success',
            confirmButtonText: 'Aceptar'
          })
        }else{
          swal({
            title: 'Error!',
            text: response.message,
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
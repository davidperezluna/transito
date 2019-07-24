import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { CvCfgModulo } from '../cvCfgModulo.modelo';
import { CvCfgModuloService } from '../../../services/cvCfgModulo.service';
import { LoginService } from '../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
  @Output() ready = new EventEmitter<any>();
  public modulo: CvCfgModulo;
  public errorMessage;

constructor(
  private _ModuloService: CvCfgModuloService,
  private _LoginService: LoginService,
  ){}

  ngOnInit() {
    this.modulo = new CvCfgModulo(null, null);
  }

  onCancelar(){
    this.ready.emit(true);
  }
  
  onEnviar(){
    let token = this._LoginService.getToken();
    
		this._ModuloService.register(this.modulo, token).subscribe(
			response => {
        if(response.status == 'success'){
          swal({
            title: response.title,
            text: response.message,
            type: response.status,
            confirmButtonText: 'Aceptar'
          });

          this.ready.emit(true);
        }else{
          swal({
            title: response.title,
            text: response.message,
            type: response.status,
            confirmButtonText: 'Aceptar'
          });
        }
			error => {
					this.errorMessage = <any>error;
					if(this.errorMessage != null){
						console.log(this.errorMessage);
						alert("Error en la petición");
					}
				}
      }
    );
  }

}
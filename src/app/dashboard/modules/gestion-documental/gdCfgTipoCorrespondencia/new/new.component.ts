import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import { GdCfgTipoCorrespondencia } from '../gdCfgTipoCorrespondencia.modelo';
import { GdCfgTipoCorrespondenciaService } from '../../../../../services/gdCfgTipoCorrespondencia.service';
import { LoginService } from '../../../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-new-gdcfgtipocorrespondencia',
  templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
@Output() ready = new EventEmitter<any>();
public gdCfgTipoCorrespondencia: GdCfgTipoCorrespondencia;
public errorMessage;
public respuesta;

constructor(
  private _GdCfgTipoCorrespondenciaService: GdCfgTipoCorrespondenciaService,
  private _loginService: LoginService,
  ){}

  ngOnInit() {
    this.gdCfgTipoCorrespondencia = new GdCfgTipoCorrespondencia(null, null, false, null);
  }
  
  onCancelar(){
    this.ready.emit(true);
  }
  
  onEnviar(){
    let token = this._loginService.getToken();
    
		this._GdCfgTipoCorrespondenciaService.register(this.gdCfgTipoCorrespondencia,token).subscribe(
			response => {
        if(response.code == 200){
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
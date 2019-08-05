import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { CvAuCfgAtencion } from '../cvAuCfgAtencion.modelo';
import { CvAuCfgAtencionService } from '../../../../../services/cvAuCfgAtencion.service';
import { LoginService } from '../../../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
  @Output() ready = new EventEmitter<any>();
  public atencion: CvAuCfgAtencion;
  public errorMessage;

  public dias = [
    { 'value': '1', 'label': 'Lunes' },
    { 'value': '2', 'label': 'Martes' },
    { 'value': '3', 'label': 'Miercoles' },
    { 'value': '4', 'label': 'Jueves' },
    { 'value': '5', 'label': 'Viernes' },
  ];

constructor(
  private _AtencionService: CvAuCfgAtencionService,
  private _loginService: LoginService,
  ){}

  ngOnInit() {
    this.atencion = new CvAuCfgAtencion(null, null, null, null, null, null);
  }

  onCancelar(){
    this.ready.emit(true);
  }
  
  onEnviar(){
    let token = this._loginService.getToken();
    
		this._AtencionService.register(this.atencion, token).subscribe(
			response => {
        if(response.status == 'success'){
          this.ready.emit(true);

          swal({
            title: 'Perfecto!',
            text: response.message,
            type: 'success',
            confirmButtonText: 'Aceptar'
          });
        }else{
          swal({
            title: 'Error!',
            text: response.message,
            type: 'error',
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

		}); 
  }

}
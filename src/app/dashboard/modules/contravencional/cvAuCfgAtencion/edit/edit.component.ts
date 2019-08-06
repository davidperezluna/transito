import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CvAuCfgAtencionService } from '../../../../../services/cvAuCfgAtencion.service';
import { LoginService } from '../../../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-edit-cvaucfgatencion',
  templateUrl: './edit.component.html'
})
export class EditComponent implements OnInit{
  @Output() ready = new EventEmitter<any>();
  @Input() atencion:any = null;
  public errorMessage;

  public dias = [
    { 'value': '1', 'label': 'Lunes' },
    { 'value': '2', 'label': 'Martes' },
    { 'value': '3', 'label': 'Miercoles' },
    { 'value': '4', 'label': 'Jueves' },
    { 'value': '5', 'label': 'Viernes' },
  ];

public formReady = false;

constructor(
  private _AtencionService: CvAuCfgAtencionService,
  private _loginService: LoginService,
  ){}

  ngOnInit(){ }

  onCancelar(){ this.ready.emit(true); }

  onEnviar(){
    let token = this._loginService.getToken();
		this._AtencionService.edit(this.atencion,token).subscribe(
			response => {
        if(response.status == 'success'){
          this.ready.emit(true);
          swal({
            title: 'Perfecto!',
            text: response.message,
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
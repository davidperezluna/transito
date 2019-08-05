import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CvCfgInteresService } from '../../../../../services/cvCfgInteres.service';
import { LoginService } from '../../../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html'
})
export class EditComponent implements OnInit{
  @Output() ready = new EventEmitter<any>();
  @Input() interes:any = null;
  public errorMessage;
  public formReady = false;
  public meses = [
    { 'value': 1, 'label': 'Enero' },
    { 'value': 2, 'label': 'Febrero' },
    { 'value': 3, 'label': 'Marzo' },
    { 'value': 4, 'label': 'Abril' },
    { 'value': 5, 'label': 'Mayo' },
    { 'value': 6, 'label': 'Junio' },
    { 'value': 7, 'label': 'Julio' },
    { 'value': 8, 'label': 'Agosto' },
    { 'value': 9, 'label': 'Septiembre' },
    { 'value': 10, 'label': 'Octubre' },
    { 'value': 11, 'label': 'Noviembre' },
    { 'value': 12, 'label': 'Diciembre' }
  ];

constructor(
  private _InteresService: CvCfgInteresService,
  private _loginService: LoginService,
  ){}

  ngOnInit(){ console.log(this.interes); }

  onCancelar(){ this.ready.emit(true); }

  onEnviar(){
    let token = this._loginService.getToken();
		this._InteresService.edit(this.interes,token).subscribe(
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
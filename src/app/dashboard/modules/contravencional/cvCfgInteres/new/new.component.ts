import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { CvCfgInteres } from '../cvCfgInteres.modelo';
import { CvCfgInteresService } from '../../../../../services/cvCfgInteres.service';
import { LoginService } from '../../../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-new-cvcfginteres',
  templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
@Output() ready = new EventEmitter<any>();
public interes: CvCfgInteres;
public errorMessage;
public meses = [
  { 'value':1, 'label':'Enero' },
  { 'value':2, 'label':'Febrero' },
  { 'value':3, 'label':'Marzo' },
  { 'value':4, 'label':'Abril' },
  { 'value':5, 'label':'Mayo' },
  { 'value':6, 'label':'Junio' },
  { 'value':7, 'label':'Julio' },
  { 'value':8, 'label':'Agosto' },
  { 'value':9, 'label':'Septiembre' },
  { 'value':10, 'label':'Octubre' },
  { 'value':11, 'label':'Noviembre' },
  { 'value':12, 'label':'Diciembre' }
];

constructor(
  private _InteresService: CvCfgInteresService,
  private _loginService: LoginService,
  ){}

  ngOnInit() {
    this.interes = new CvCfgInteres(null, null, null, null);
  }

  onCancelar(){
    this.ready.emit(true);
  }
  
  onEnviar(){
    let token = this._loginService.getToken();
    
		this._InteresService.register(this.interes,token).subscribe(
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
      }
    );
  }

}
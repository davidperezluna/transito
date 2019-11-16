import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DatePipe } from '@angular/common';
import { CvCfgPorcentajeInicialService } from '../../../../../services/cvCfgPorcentajeInicial.service';
import { LoginService } from '../../../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-edit-cvcfgporcentajeinicial',
  templateUrl: './edit.component.html',
  providers: [DatePipe]
})
export class EditComponent implements OnInit{
@Output() ready = new EventEmitter<any>();
@Input() porcentaje:any = null;
public errorMessage;
public formReady = false;

constructor(
  private _PorcentajeService: CvCfgPorcentajeInicialService,
  private _loginService: LoginService,
  ){}

  ngOnInit(){ 
    console.log(this.porcentaje);
    var datePiper = new DatePipe('en-US');

    var date = new Date();
    date.setTime(this.porcentaje.anio.timestamp * 1000);
    this.porcentaje.anio = datePiper.transform(
      date, 'yyyy-MM-dd'
    );

  }

  onCancelar(){ this.ready.emit(true); }

  onEnviar(){
    let token = this._loginService.getToken();
		this._PorcentajeService.edit(this.porcentaje,token).subscribe(
			response => {
        if(response.code == 200){
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
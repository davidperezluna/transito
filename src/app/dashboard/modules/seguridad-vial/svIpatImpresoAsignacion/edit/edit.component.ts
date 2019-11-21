import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SvIpatImpresoAsignacionService } from '../../../../../services/svIpatImpresoAsignacion.service';
import { LoginService } from '../../../../../services/login.service';
import { DatePipe, CurrencyPipe } from '@angular/common';
import swal from 'sweetalert2';

@Component({
  selector: 'app-edit-svipatimpresoasignacion',
  templateUrl: './edit.component.html',
  providers: [DatePipe]
})
export class EditComponent implements OnInit{
  @Output() ready = new EventEmitter<any>();
  @Input() asignacion:any = null;
  public errorMessage;
  public cantidad: any;

constructor(
  private _ImpresoAsignacionService: SvIpatImpresoAsignacionService,
  private _LoginService: LoginService,
  ){}

  ngOnInit(){ 
    console.log(this.asignacion);
    var datePiper = new DatePipe('en-US');
    var date = new Date();

    date.setTime(this.asignacion.fecha.timestamp * 1000);

    this.asignacion.fecha = datePiper.transform(
      date, 'yyyy/MM/dd'
    );

    this.cantidad = this.asignacion.cantidadDisponible;
  }

  onCancelar(){ this.ready.emit(true); }

  onEnviar(){
    let token = this._LoginService.getToken();

    this.asignacion.cantidadDisponible = this.cantidad;

		this._ImpresoAsignacionService.edit(this.asignacion, token).subscribe(
			response => {
        if(response.code == 200){
          this.ready.emit(true);
          swal({
            title: response.title,
            text: response.message,
            type: response.status,
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
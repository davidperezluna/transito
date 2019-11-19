import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SvIpatImpresoBodegaService } from '../../../../../services/svIpatImpresoBodega.service';
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

constructor(
  private _ImpresoBodegaService: SvIpatImpresoBodegaService,
  private _LoginService: LoginService,
  ){}

  ngOnInit(){ 
    console.log(this.asignacion);

    var datePiper = new DatePipe('en-US');
    var date = new Date();

    date.setTime(this.asignacion.fecha.timestamp * 1000);

    this.asignacion.fecha = datePiper.transform(
      date, 'yyyy-MM-dd'
    );
  }

  onCancelar(){ this.ready.emit(true); }

  onEnviar(){
    let token = this._LoginService.getToken();

		this._ImpresoBodegaService.edit(this.asignacion, token).subscribe(
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
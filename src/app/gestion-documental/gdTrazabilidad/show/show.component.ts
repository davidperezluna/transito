import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import { GdTrazabilidadService } from '../../../services/gdTrazabilidad.service';
import { LoginService } from '../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
})
export class ShowComponent implements OnInit {
@Output() ready = new EventEmitter<any>();
@Output() onNew = new EventEmitter<any>();
@Input() trazabilidad: any = null;
public errorMessage;

public date: any;
public observaciones: any;
public aceptada: any;
public datos = {
  'observaciones': null,
  'aceptada': null,
  'idTrazabilidad': null,
};

constructor(
  private _TrazabilidadService: GdTrazabilidadService,
  private _loginService: LoginService,
  ){}

  ngOnInit() {
    this.date = new Date();

    this.datos.aceptada = 'true';
  }

  onCancelar(){
    this.ready.emit(true);
  }

  onRegister(){
    this.datos.idTrazabilidad = this.trazabilidad.id;

    let token = this._loginService.getToken();

		this._TrazabilidadService.process(this.datos, token).subscribe(
			response => {
        if(response.status == 'success'){
          if(response.data.aceptada){
            this.onNew.emit(response.data);
          }else{
            this.ready.emit(response.data);
          }
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
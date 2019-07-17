import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import {VhloCfgNivelServicio} from '../vhloCfgNivelServicio.modelo';
import {VhloCfgNivelServicioService} from '../../../services/vhloCfgNivelServicio.service';
import { VhloCfgServicioService } from '../../../services/vhloCfgServicio.service';
import {LoginService} from '../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html'
})
export class EditComponent {
@Output() ready = new EventEmitter<any>();
@Input() nivelServicio:any = null;
public servicios;
public servicioSelected;
public errorMessage;

constructor(
  private _NivelServicioService: VhloCfgNivelServicioService,
  private _ServicioService: VhloCfgServicioService,
  private _LoginService: LoginService,
  ){

  }

  ngOnInit() {
    this._ServicioService.select().subscribe(
      response => {
        this.servicios = response;
        setTimeout(() => {
          this.servicioSelected = [this.nivelServicio.servicio.id];
        });
      },
      error => {
        this.errorMessage = <any>error;

        if (this.errorMessage != null) {
          console.log(this.errorMessage);
          alert("Error en la petición");
        }
      }
    );
  }
  onCancelar(){
    this.ready.emit(true);
  }

  onEnviar(){
    let token = this._LoginService.getToken();

    this.nivelServicio.idServicio = this.servicioSelected;

		this._NivelServicioService.edit(this.nivelServicio,token).subscribe(
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
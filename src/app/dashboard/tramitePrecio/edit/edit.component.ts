import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import {TramitePrecio} from '../tramitePrecio.modelo';
import {TramitePrecioService} from '../../../services/tramitePrecio.service';
import {TramiteService} from '../../../services/tramite.service';
import {LoginService} from '../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html'
})
export class EditComponent implements OnInit{
@Output() ready = new EventEmitter<any>();
@Input() tramitePrecio:any = null;
public errorMessage;
public respuesta;
public formReady = false;
public tramites: Array<any>
public tramiteSelected: Array<any>; // ng-select [(ngModel)]

constructor(
  private _tramitePrecioService: TramitePrecioService,
  private _loginService: LoginService,
  private _tramiteService: TramiteService,
  ){}

  ngOnInit(){
    

    console.log(this.tramiteSelected);
    this._tramiteService.getTramiteSelect().subscribe(
        response => {
          this.tramites = response;
          setTimeout(() => {
            this.tramiteSelected = [this.tramitePrecio.tramite.id];
            this.formReady = true;
          });
        }, 
        error => {
          this.errorMessage = <any>error;

          if(this.errorMessage != null){
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
    let token = this._loginService.getToken();
    this.tramitePrecio.tramiteId = this.tramiteSelected;
		this._tramitePrecioService.editTramitePrecio(this.tramitePrecio,token).subscribe(
			response => {
        this.respuesta = response;
        console.log(this.respuesta);
        if(this.respuesta.status == 'success'){
          this.ready.emit(true);
          swal({
            title: 'Perfecto!',
            text: 'El registro se ha modificado con exito',
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
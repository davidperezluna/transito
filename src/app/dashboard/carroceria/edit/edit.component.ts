import { Component, OnInit,Input, AfterViewInit,Output,EventEmitter } from '@angular/core';
import {Carroceria} from '../carroceria.modelo';
import {CarroceriaService} from '../../../services/carroceria.service';
import {ClaseService} from '../../../services/clase.service';
import {LoginService} from '../../../services/login.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html'
})
export class EditComponent implements OnInit{
@Output() ready = new EventEmitter<any>();
@Input() carroceria:any = null;
public errorMessage;
public respuesta;
public formReady = false;
public clases: Array<any>
public claseSelected:any; // ng-select [(ngModel)]

constructor(
  private _carroceriaService: CarroceriaService,
  private _loginService: LoginService,
  private _claseService: ClaseService,
  ){}

  ngOnInit(){
    

    console.log(this.claseSelected);
    this._claseService.getClaseSelect().subscribe(
        response => {
          this.clases = response;
          setTimeout(() => {
            this.claseSelected = [this.carroceria.clase.id];
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
    this.carroceria.claseId = this.claseSelected;
		this._carroceriaService.editCarroceria(this.carroceria,token).subscribe(
			response => {
        this.respuesta = response;
        console.log(this.respuesta);
        if(this.respuesta.status == 'success'){
          this.ready.emit(true);
          swal({
            title: 'Pefecto!',
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